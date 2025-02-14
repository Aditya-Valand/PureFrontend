import React, { useState } from 'react';
import { X } from 'lucide-react';

const UploadImage = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // To handle loading state
  const [output, setOutput] = useState(null); // To display API response

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the uploaded image as preview
    };
    reader.readAsDataURL(file); // Convert file to base64 string
  };

  // Handle Analyze Button Click
  const handleAnalyze = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true); // Set loading state

    try {
      // Create a FormData object for uploading an image file
      const formData = new FormData();

      // Convert base64 image to Blob
      const base64Image = imagePreview.split(',')[1]; // Get base64 part of data URL
      const binaryImage = atob(base64Image); // Decode base64 to binary
      const arrayBuffer = new Uint8Array(binaryImage.length);
      for (let i = 0; i < binaryImage.length; i++) {
        arrayBuffer[i] = binaryImage.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

      formData.append('image', blob, 'uploaded-image.jpg');

      // Send POST request with FormData
      const response = await fetch('https://pureinsight-v2.vercel.app/process/analysis', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json(); // Parse JSON response
      console.log('Uploaded Image Analysis Result:', data); // Log result for uploaded image
      setOutput(data); // Set output to display it in UI
    } catch (error) {
      console.error('Error analyzing uploaded image:', error);
    } finally {
      setIsAnalyzing(false); // Reset loading state
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-black/80 text-white flex justify-center items-center">
      <div className="bg-white text-black w-11/12 md:w-1/2 rounded-lg overflow-hidden shadow-lg">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-gray-800 text-white">
          <h2 className="font-medium">Upload Image</h2>
          <button onClick={onClose} className="text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-4">
          {!imagePreview ? (
            <div className="flex flex-col items-center gap-4">
              {/* Upload Button */}
              <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">
                Upload Image
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              {isAnalyzing && <p className="text-gray-500">Analyzing uploaded image...</p>}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {/* Image Preview */}
              <img src={imagePreview} alt="Preview" className="w-full max-w-xs rounded-lg shadow-md" />
              {/* Buttons */}
              <div className="flex gap-4 w-full justify-center">
                {/* Reupload Button */}
                <button
                  onClick={() => setImagePreview(null)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                >
                  Reupload
                </button>
                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing} // Disable button while analyzing
                  className={`flex-1 py-2 rounded-lg ${
                    isAnalyzing ? 'bg-gray-400' : 'bg-green-500'
                  } text-white`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </div>
          )}
          {/* Output Display */}
          {output && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold">Analysis Output:</h3>
              <pre className="text-sm">{JSON.stringify(output, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default UploadImage;
