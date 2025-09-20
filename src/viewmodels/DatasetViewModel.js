import { useState } from 'react';
import { apiService } from '../services/ApiService';

export const useDatasetViewModel = () => {
  const [isLabelStudioRunning, setIsLabelStudioRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startLabelStudio = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.startLabelStudio();
      if (response.success) {
        setIsLabelStudioRunning(true);
      } else {
        setError(response.message || 'Failed to start Label Studio');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const stopLabelStudio = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.stopLabelStudio();
      if (response.success) {
        setIsLabelStudioRunning(false);
      } else {
        setError(response.message || 'Failed to stop Label Studio');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLabelStudioRunning,
    isLoading,
    error,
    startLabelStudio,
    stopLabelStudio
  };
};