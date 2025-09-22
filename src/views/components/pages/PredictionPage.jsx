import React from 'react';
import { Target, Loader2, RefreshCw, Download } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { FileUpload } from '../common/FileUpload';

export const PredictionPage = ({ viewModel }) => {
  const {
    uploadedImage,
    uploadedModel,
    processedImage,
    isProcessing,
    error,
    canProcessImage,
    handleImageUpload,
    handleModelUpload,
    processImage,
    resetState
  } = viewModel;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Test with Custom Image</h2>
        <p className="text-gray-600">Upload your images and model files to test object detection capabilities</p>
      </div>

      {/* Global Error Alert */}
      {error && (
        <Alert type="error" onClose={() => {}}>
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {/* File Upload Section */}
      <Card 
        title="📤 Upload Files"
        description="Select your image and YOLO model for inference testing"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">📸 Upload Image</h4>
            <FileUpload
              onUpload={handleImageUpload}
              accept="image/*"
              label="Choose an image..."
              description="JPG, JPEG, PNG files"
              disabled={isProcessing}
            />
            {uploadedImage && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Image uploaded: <strong>{uploadedImage.name || uploadedImage.file?.name}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Size: {((uploadedImage.size || uploadedImage.file?.size) / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
          </div>
          
          {/* Model Upload */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">🤖 Upload Model</h4>
            <FileUpload
              onUpload={handleModelUpload}
              accept=".pt"
              label="Choose a model..."
              description="PyTorch model files (.pt)"
              disabled={isProcessing}
            />
            {uploadedModel && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Model uploaded: <strong>{uploadedModel.name}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Size: {(uploadedModel.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons - Updated to match your working UI */}
        {uploadedImage && uploadedModel && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button 
              variant="primary" 
              size="lg"
              onClick={processImage}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Image...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5" />
                  Process Image
                </>
              )}
            </Button>
          </div>
        )}
        
        {/* Validation Messages */}
        {!uploadedModel && uploadedImage && (
          <Alert type="warning" className="mt-4">
            <strong>Model Required:</strong> Please upload a YOLO model (.pt file) to proceed with detection.
          </Alert>
        )}
        
        {!uploadedImage && uploadedModel && (
          <Alert type="warning" className="mt-4">
            <strong>Image Required:</strong> Please upload an image file to proceed with detection.
          </Alert>
        )}
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
          <h4 className="font-semibold text-blue-600 mb-2">Processing Image</h4>
          <p className="text-gray-600">Running inference with your YOLO model...</p>
          <div className="mt-4 text-sm text-gray-500">
            This may take a few moments depending on image size and model complexity.
          </div>
        </div>
      )}

      {/* Results Section - Updated to match your working UI */}
      {processedImage && !isProcessing && uploadedImage && (
        <div className="space-y-4">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Detection Results</h3>
            <p className="text-gray-600">Compare input and processed images side by side</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-800">📤 Uploaded Image</h4>
              </div>
              <div className="p-4">
                <img 
                  src={uploadedImage.preview} 
                  alt="Original uploaded image" 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
            
            {/* Processed Image */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">🎯 Processed Image</h4>
                  <p className="text-sm text-gray-600">With object detections</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = processedImage;
                    link.download = `processed_${uploadedImage.file?.name || 'image'}`;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
              <div className="p-4">
                <img 
                  src={processedImage} 
                  alt="Processed image with detections" 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
          
          <Alert type="success">
            <strong>Processing Complete!</strong> Image processing completed successfully! ✅
          </Alert>
        </div>
      )}
    </div>
  );
};