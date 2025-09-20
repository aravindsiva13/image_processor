export class DetectionModel {
  constructor(inputPath, outputPath, confidence = 0, detections = []) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.confidence = confidence;
    this.detections = detections;
    this.timestamp = new Date().toISOString();
  }
}