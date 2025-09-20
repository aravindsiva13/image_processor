import { useState } from 'react';

export const useYoloStudioViewModel = () => {
  const [selectedPage, setSelectedPage] = useState('Dataset & Labeling');
  const [globalError, setGlobalError] = useState(null);

  const clearGlobalError = () => setGlobalError(null);

  const handlePageChange = (page) => {
    clearGlobalError();
    setSelectedPage(page);
  };

  return {
    selectedPage,
    globalError,
    handlePageChange,
    clearGlobalError,
    setGlobalError
  };
};
