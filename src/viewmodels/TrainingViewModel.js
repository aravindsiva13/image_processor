import { useState } from 'react';

export const useTrainingViewModel = () => {
  const [isTraining, setIsTraining] = useState(false);

  const startTraining = () => {
    setIsTraining(true);
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  return {
    isTraining,
    startTraining,
    stopTraining
  };
};
