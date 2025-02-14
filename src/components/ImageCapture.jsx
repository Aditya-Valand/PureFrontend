import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { X, Upload, AlertCircle } from 'lucide-react';

const ImageCapture = ({ isOpen, onClose, mode, onAnalysisComplete }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  
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
  
    const TIMEOUT_DURATION = 30000;
    const MAX_RETRIES = 3;
    
    const fetchWithTimeout = async (formData) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
      
      try {
        // Log the form data for debugging
        console.log('FormData contents:', Array.from(formData.entries()));
        
        const response = await fetch('http://localhost:3000/process/analysis', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk3ODY1YTYwNmViNjE1MTdkNWVhMTUiLCJuYW1lIjoiQW5pcnVkaCBTaW5naCIsImVtYWlsIjoidmlvbGVudGFuaXJ1ZGhAZ21haWwuY29tIiwic3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJjb2lucyI6MTAwLCJzb3VyY2UiOiJzZWxmIiwidG9rZW4iOiIiLCJ2ZXJzaW9uIjo0OSwiYXR0ZW1wdCI6MCwicHJvZmlsZSI6ZmFsc2UsImlhdCI6MTczOTU0MDMwOSwiZXhwIjoxNzQwMTQ1MTA5fQ.lpNWDLS_kUI9vXDNdqZc6NwDA0DwR_ek3Bqs2HRkPfo'
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
          
          // Append the blob with the correct field name
          formData.append('images', blob, 'image.jpg');  // Changed from 'images' to 'image'
          
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
    <div className="fixed inset-0 z-50 bg-black text-white">
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-black/80">
          <button onClick={handleClose} className="text-white p-2">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-white font-medium">
            {mode === 'scan' ? 'Scan Product' : 'Upload Product'}
          </h2>
          <div className="w-10" />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/90 p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 relative">
          {!imagePreview ? (
            mode === 'scan' ? (
              <div className="relative h-full">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={handleCapture}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-4"
                >
                  <div className="w-12 h-12 rounded-full border-4 border-green-500" />
                </button>
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
                  className="bg-green-500 p-6 rounded-full mb-4"
                >
                  <Upload className="w-8 h-8" />
                </button>
                <p className="text-center text-gray-300">
                  Click to upload your product image
                  <br />
                  <span className="text-sm text-gray-400">
                    Supported formats: JPG, PNG (max 5MB)
                  </span>
                </p>
              </div>
            )
          ) : (
            <div className="h-full">
              <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
              
              {showConfirmation && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                  <div className="flex justify-between gap-4">
                    <button
                      onClick={handleRetake}
                      className="flex-1 bg-red-500 text-white py-3 rounded-full"
                    >
                      Retake
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className={`flex-1 py-3 rounded-full ${
                        isAnalyzing ? 'bg-gray-500' : 'bg-green-500'
                      } text-white`}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </div>
                </div>
              )}

              {/* Analysis Result Display */}
              {/* {analysisResult && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Analysis Result</h3>
                    <pre className="text-sm overflow-auto">
                      {JSON.stringify(analysisResult, null, 2)}
                    </pre>
                  </div>
                  <button
                    onClick={handleRetake}
                    className="w-full bg-green-500 text-white py-3 rounded-full"
                  >
                    Analyze Another Image
                  </button>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageCapture;
