import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { X, Upload, AlertCircle } from 'lucide-react';

const ImageCapture = ({ isOpen, onClose, mode }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

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

    try {
      // Simulate API call for analysis
      const simulatedResponse = {
        status: 'success',
        message: 'Analysis found.',
        data: {
          title: 'Blended Chocolate Nutritional Analysis',
          description:
            'Detailed analysis of blended chocolate product, including nutritional information, ingredients, potential benefits and harms, and a health quality score.',
          product_details: {
            ingredients:
              'Cocoa Butter (42%), Cocoa Solids (31%), Sugar, Milk solids, Nature Identical Flavouring Substances, Emulsifiers (442, 476)',
            additives: [
              {
                additive_name: 'Emulsifiers (442, 476)',
                description:
                  'These are common food additives used to stabilize the mixture.',
              },
            ],
            nutritional_information: {
              energy_kcal: 598,
              protein_g: 7.6,
              carbohydrates_g: 40.7,
              total_sugars_g: 24.4,
              added_sugars_g: 23.3,
              total_fat_g: 47.4,
              saturated_fat_g: 32.1,
              trans_fat_g: 0.1,
              cholesterol_mg: 4.4,
              sodium_mg: 18,
              fibres_g: null,
            },
            vitamins: [],
            product_category: 'chocolate',
          },
          analysis_report: {
            health_quality_score: '55',
            health_quality_rating: 'Fair',
            dietary_compatibility: [
              {
                group: 'Lactose intolerant',
                status: 'avoid',
                recommendation:
                  'Contains milk; may not be suitable for those with lactose intolerance.',
              },
              {
                group: 'Diabetics',
                status: 'caution',
                recommendation:
                  'High in sugar; consume in moderation and monitor blood sugar levels.',
              },
              {
                group: 'People with nut allergies',
                status: 'caution',
                recommendation:
                  'May contain tree nuts. Avoid if you have a severe nut allergy.',
              },
              {
                group: 'People with soy allergies',
                status: 'caution',
                recommendation:
                  'May contain soy. Avoid if you have a soy allergy.',
              },
            ],
            allergens: ['Milk', 'Tree Nuts', 'Soy'],
            potential_side_effects: [
              'May cause digestive upset in some individuals due to high fat content and added sugars.',
              'May cause weight gain if consumed regularly in excess.',
            ],
            benefits: [
              'Provides energy, cocoa flavanols may offer antioxidant benefits.',
            ],
            advices: [
              'Consume in moderation due to high sugar and fat content.',
              'Pair with a balanced meal to minimize its impact on blood sugar levels.',
              'Consider portion control.',
            ],
          },
        },
      };

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAnalysisResult(simulatedResponse.data); // Set the result
    } catch (error) {
      setError('Failed to analyze the image.');
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
              {/* Image Preview */}
              <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />

              {/* Confirmation Buttons */}
              {showConfirmation && !analysisResult && (
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
              {analysisResult && (
                <div className="absolute inset-x-0 bottom-0 bg-black/80 p-4 overflow-auto max-h-[50%]">
                  {/* Render Analysis using ScanAfter Layout */}
                  <h3 className="text-lg font-bold mb-2">Analysis Result</h3>
                  <pre className="text-sm text-gray-200 overflow-auto max-h-[200px] bg-gray-800 p-2 rounded-md">
                    {JSON.stringify(analysisResult, null, 2)}
                  </pre>
                  {/* Retake Button */}
                  <button
                    onClick={handleRetake}
                    className="w-full bg-green-500 text-white py-3 mt-4 rounded-full"
                  >
                    Analyze Another Image
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
