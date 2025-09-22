import React from 'react';
import { Zap, StopCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';

export const DatasetPage = ({ viewModel }) => {
  const { isLabelStudioRunning, isLoading, error, startLabelStudio, stopLabelStudio } = viewModel;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎯 YOLO Custom Model for Vending Machine Object Detection
        </h2>
        <p className="text-gray-600">Automate YOLO Training</p>
      </div>

      {/* Card */}
      <Card
        title="🖌️ Label Studio Control Center"
        description="Manage your annotation workspace and dataset labeling environment"
      >
        <div className="space-y-4">
          {/* Button Row - Two buttons side by side */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={startLabelStudio}
              disabled={isLoading || isLabelStudioRunning}
              className="flex-1"
            >
              <Zap className="w-5 h-5" />
              Launch Label Studio
            </Button>
            
            <Button
              variant="danger"
              size="lg"
              onClick={stopLabelStudio}
              disabled={!isLabelStudioRunning || isLoading}
              className="flex-1"
            >
              <StopCircle className="w-5 h-5" />
              Stop Label Studio
            </Button>
          </div>

          {/* Status Alerts */}
          <div className="space-y-3">
            {/* Success Alert */}
            {isLabelStudioRunning && (
              <Alert type="success">
                <div>
                  <strong>Label Studio is now running!</strong>
                  <br />
                  Access your annotation workspace at{" "}
                  <a
                    href="http://localhost:8080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    http://localhost:8080
                  </a>
                </div>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert type="error">
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {isLoading && (
              <Alert type="info">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Processing request...
                </div>
              </Alert>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};