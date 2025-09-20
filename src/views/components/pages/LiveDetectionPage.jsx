import React from 'react';
import { StopCircle, Loader2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { FileUpload } from '../common/FileUpload';

export const LiveDetectionPage = ({ viewModel, uploadedModel }) => {
  const {
    uploadedVideo,
    processedVideo,
    isProcessingVideo,
    detectionStopped,
    error,
    handleVideoUpload,
    processVideo,
    stopDetection
  } = viewModel;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📹 Live Detection</h2>
        <p className="text-gray-600">Real-time object detection and video processing</p>
      </div>

      <div className="flex justify-between items-center">
        <Button 
          variant="danger" 
          onClick={stopDetection}
        >
          <StopCircle className="w-5 h-5" />
          Stop Detection
        </Button>
        
        {detectionStopped && (
          <Alert type="success">
            Detection stopped successfully ✅
          </Alert>
        )}
      </div>

      <Card 
        title="📹 Upload Video for Detection"
        description="Upload your video files for object detection processing"
      >
        <div className="space-y-6">
          <FileUpload
            onUpload={handleVideoUpload}
            accept="video/*"
            label="Choose a video..."
            description="MP4, AVI, MOV files"
          />
          
          {uploadedVideo && (
            <div>
              <Alert type="success" className="mb-4">
                Video uploaded successfully: {uploadedVideo.file.name}
              </Alert>
              
              {!uploadedModel ? (
                <Alert type="warning">
                  ⛓️‍💥 Need a valid Model for detection!!
                </Alert>
              ) : (
                <div className="space-y-4">
                  <Button
                    variant="danger"
                    size="lg" 
                    onClick={processVideo}
                    disabled={isProcessingVideo}
                  >
                    {isProcessingVideo ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Video...
                      </>
                    ) : (
                      'Process Video'
                    )}
                  </Button>
                  
                  {!isProcessingVideo && processedVideo && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Original Video</h4>
                        <div className="bg-gray-100 rounded-lg p-4">
                          <video 
                            controls 
                            className="w-full rounded-lg"
                            src={uploadedVideo.preview}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Detected Video</h4>
                        <div className="bg-gray-100 rounded-lg p-4">
                          <video 
                            controls 
                            className="w-full rounded-lg"
                          >
                            <source src={processedVideo} type="video/mp4"/>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {!uploadedVideo && (
            <Alert type="info">
              ⬆️ Please upload a video file to begin detection
            </Alert>
          )}

          {error && (
            <Alert type="error">
              {error}
            </Alert>
          )}
        </div>
      </Card>
    </div>
  );
};
