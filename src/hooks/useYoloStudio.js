import { useYoloStudioViewModel } from '../viewmodels/YoloStudioViewModel';
import { useDatasetViewModel } from '../viewmodels/DatasetViewModel';
import { usePredictionViewModel } from '../viewmodels/PredictionViewModel';
import { useLiveDetectionViewModel } from '../viewmodels/LiveDetectionViewModel';
import { useTrainingViewModel } from '../viewmodels/TrainingViewModel';

export const useYoloStudio = () => {
  const mainViewModel = useYoloStudioViewModel();
  const datasetViewModel = useDatasetViewModel();
  const predictionViewModel = usePredictionViewModel();
  const liveDetectionViewModel = useLiveDetectionViewModel();
  const trainingViewModel = useTrainingViewModel();

  return {
    main: mainViewModel,
    dataset: datasetViewModel,
    prediction: predictionViewModel,
    liveDetection: liveDetectionViewModel,
    training: trainingViewModel
  };
};