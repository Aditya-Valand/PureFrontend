import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { X, Upload, AlertCircle, Camera, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ImageCapture = ({ isOpen, onClose, mode, onAnalysisComplete }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const Auth = useAuth();
  // console.log(Auth.user.email);
  
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: mode === 'scan' ? 'environment' : 'user',
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const video = webcamRef.current.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageSrc = canvas.toDataURL('image/jpeg', 1);
      setImagePreview(imageSrc);
      setShowConfirmation(true);
      setError(null);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setShowConfirmation(true);
        setError(null);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    
    setIsAnalyzing(true);
    setError(null);
    const formData = new FormData();  
    formData.append('email', Auth.user?.email || '');
    const TIMEOUT_DURATION = 30000;
    const MAX_RETRIES = 3;
    
    const fetchWithTimeout = async (formData) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/process/analysis`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${Auth.user.token}`
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    };
  
    const analyzeWithRetry = async () => {
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const formData = new FormData();
          formData.append('email', Auth.user?.email || '');
          
          // Remove the data:image/jpeg;base64, prefix if it exists
          const base64Data = imagePreview.replace(/^data:image\/\w+;base64,/, '');
          
          // Convert base64 to Blob
          const byteCharacters = atob(base64Data);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          
          const blob = new Blob(byteArrays, { type: 'image/jpeg' });
          
          formData.append('images', blob, 'image.jpg');
          
          const data = await fetchWithTimeout(formData);
          return data;
        } catch (error) {
          console.error(`Attempt ${attempt} failed:`, error);
          
          if (error.name === 'AbortError') {
            setError(`Request timeout (Attempt ${attempt}/${MAX_RETRIES})`);
          } else {
            setError(`Analysis failed (Attempt ${attempt}/${MAX_RETRIES}): ${error.message}`);
          }
          
          if (attempt === MAX_RETRIES) throw error;
          
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    };
  
    try {
      const result = await analyzeWithRetry();
      if (result) {
        onAnalysisComplete?.(result);
        handleClose();
      }
    } catch (error) {
      console.error('Final error:', error);
      setError(`Analysis failed after ${MAX_RETRIES} attempts: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setImagePreview(null);
    setShowConfirmation(false);
    setError(null);
    setAnalysisResult(null);
    onClose();
  };

  const handleRetake = () => {
    setImagePreview(null);
    setShowConfirmation(false);
    setError(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center bg-white shadow-sm">
          <button onClick={handleClose} className="text-gray-700 p-2">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-gray-800 font-medium text-lg ml-4">
            {mode === 'scan' ? 'Scanner food' : 'Upload food'}
          </h2>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 relative">
          {!imagePreview ? (
            mode === 'scan' ? (
              <div className="relative h-full flex flex-col items-center justify-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="h-full w-full object-cover"
                />
                
                {/* Scan overlay with corners */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-11/12 h-5/6 relative">
                    {/* Top-left corner */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500"></div>
                    {/* Top-right corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-green-500"></div>
                    {/* Bottom-left corner */}
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-green-500"></div>
                    {/* Bottom-right corner */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500"></div>
                  </div>
                </div>
                
                {/* Capture button */}
                <div className="absolute bottom-8 flex justify-center w-full">
                  <button
                    onClick={handleCapture}
                    className="bg-white rounded-full p-2 shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-green-500 text-white p-4 rounded-full shadow-md"
                >
                  <Upload className="w-6 h-6" />
                </button>
                <p className="mt-4 text-gray-600 text-center">
                  Click to upload a food image
                </p>
              </div>
            )
          ) : (
            <div className="h-full relative">
              <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
              
              {showConfirmation && (
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center">
                  <button
                    onClick={handleRetake}
                    className="p-3"
                  >
                    <Image className="w-6 h-6 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-md"
                  >
                    {isAnalyzing ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                        <Camera className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                  
                  <button className="p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageCapture;
