import { ApiResponse } from '../models/ApiModel';
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:5000';
  }

  async startLabelStudio() {
    try {
      const response = await fetch(`${this.baseURL}/startLabelStudio`, {
        method: 'POST',
      });
      const data = await response.json();
      return new ApiResponse(response.ok, data, null, data.message || '');
    } catch (error) {
      return new ApiResponse(false, null, error, 'Failed to start Label Studio');
    }
  }

  async stopLabelStudio() {
    try {
      const response = await fetch(`${this.baseURL}/stopLabelStudio`, {
        method: 'POST',
      });
      const data = await response.json();
      return new ApiResponse(response.ok, data, null, data.message || '');
    } catch (error) {
      return new ApiResponse(false, null, error, 'Failed to stop Label Studio');
    }
  }

  async uploadFiles(image, model) {
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('model', model);

      const response = await fetch(`${this.baseURL}/uploadImageStorage`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return new ApiResponse(response.ok, data, null, data.message || '');
    } catch (error) {
      return new ApiResponse(false, null, error, 'Failed to upload files');
    }
  }

  async processImage(modelPath, imagePath) {
    try {
      const urlParams = new URLSearchParams({
        'model_path': modelPath,
        'image_path': imagePath
      });

      const response = await fetch(`${this.baseURL}/image`, {
        method: 'POST',
        body: urlParams,
      });
      const data = await response.json();
      return new ApiResponse(response.ok, data, null, data.message || '');
    } catch (error) {
      return new ApiResponse(false, null, error, 'Failed to process image');
    }
  }

  async processVideo(videoFile) {
    try {
      const formData = new FormData();
      formData.append('video_path', videoFile);

      const response = await fetch(`${this.baseURL}/video`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return new ApiResponse(response.ok, data, null, data.message || '');
    } catch (error) {
      return new ApiResponse(false, null, error, 'Failed to process video');
    }
  }

  getProcessedImageUrl() {
    return `${this.baseURL}/returnImage`;
  }

  getProcessedVideoUrl() {
    return `${this.baseURL}/returnVideo`;
  }
}

export const apiService = new ApiService();
