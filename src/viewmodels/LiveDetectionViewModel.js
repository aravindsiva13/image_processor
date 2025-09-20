import { useState } from 'react';
import { FileModel } from '../models/FileModel';
import { FileService } from '../services/FileService';
import { apiService } from '../services/ApiService';

export const useLiveDetectionViewModel = () => {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [detectionStopped, setDetectionStopped] = useState(false);
  const [videoProcessed, setVideoProcessed] = useState(false);
  const [error, setError] = useState(null);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!FileModel.isValidVideo(file)) {
      setError('Please select a valid video file (MP4, AVI, MOV)');
      return;
    }

    try {
      const fileModel = await FileService.createFileModel(file);
      setUploadedVideo(fileModel);
      setError(null);
      setVideoProcessed(false);
      setProcessedVideo(null);
    } catch (err) {
      setError('Failed to process video file');
    }
  };

  const processVideo = async () => {
    if (!uploadedVideo) return;

    setIsProcessingVideo(true);
    setError(null);

    try {
      const response = await apiService.processVideo(uploadedVideo.file);
      if (response.success) {
        setProcessedVideo(apiService.getProcessedVideoUrl());
        setVideoProcessed(true);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to process video');
    } finally {
      setIsProcessingVideo(false);
    }
  };

  const stopDetection = () => {
    setDetectionStopped(true);
  };

  return {
    uploadedVideo,
    processedVideo,
    isProcessingVideo,
    detectionStopped,
    videoProcessed,
    error,
    handleVideoUpload,
    processVideo,
    stopDetection
  };
};
