import { useState } from 'react';
import { FileModel } from '../models/FileModel';
import { FileService } from '../services/FileService';
import { apiService } from '../services/ApiService';

export const usePredictionViewModel = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedModel, setUploadedModel] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!FileModel.isValidImage(file)) {
      setError('Please select a valid image file (JPG, JPEG, PNG)');
      return;
    }

    try {
      const fileModel = await FileService.createFileModel(file);
      setUploadedImage(fileModel);
      setError(null);
    } catch (err) {
      setError('Failed to process image file');
    }
  };

  const handleModelUpload = (event) => {
    const file = event.target.files[0];
    if (!FileModel.isValidModel(file)) {
      setError('Please select a valid model file (.pt)');
      return;
    }

    setUploadedModel(file);
    setError(null);
  };

  const processImage = async () => {
    if (!uploadedImage || !uploadedModel) return;

    setIsProcessing(true);
    setError(null);

    try {
      const uploadResponse = await apiService.uploadFiles(uploadedImage, uploadedModel);
      if (!uploadResponse.success) {
        throw new Error(uploadResponse.message);
      }

      const processResponse = await apiService.processImage(
        `uploads/${uploadedModel.name}`,
        `uploads/${uploadedImage.file.name}`
      );

      if (processResponse.success) {
        setProcessedImage(apiService.getProcessedImageUrl());
      } else {
        throw new Error(processResponse.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const canProcessImage = uploadedImage && uploadedModel && !isProcessing;

  return {
    uploadedImage,
    uploadedModel,
    processedImage,
    isProcessing,
    error,
    canProcessImage,
    handleImageUpload,
    handleModelUpload,
    processImage
  };
};