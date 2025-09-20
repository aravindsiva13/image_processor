import React from 'react';
import { Zap } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';

export const DatasetPage = ({ viewModel }) => {
  const { isLabelStudioRunning, isLoading, error, startLabelStudio } = viewModel;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={startLabelStudio}
              disabled={isLoading}
              className="w-full"
            >
              <Zap className="w-5 h-5" />
              Launch Label Studio
            </Button>

            {/* Success Alert */}
            {isLabelStudioRunning && (
              <Alert type="success" className="mt-3">
                <div>
                  <strong>Label Studio is now running!</strong>
                  <br />
                  Access your annotation workspace at{" "}
                  <a
                    href="http://localhost:8080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    http://localhost:8080
                  </a>
                </div>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert type="error" className="mt-3">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
