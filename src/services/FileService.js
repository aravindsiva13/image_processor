import { FileModel } from '../models/FileModel';

export class FileService {
  static readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  static async createFileModel(file, shouldCreatePreview = true) {
    if (!file) return null;
    
    let preview = null;
    if (shouldCreatePreview && (FileModel.isValidImage(file) || FileModel.isValidVideo(file))) {
      try {
        preview = await this.readFileAsDataURL(file);
      } catch (error) {
        console.warn('Failed to create preview:', error);
      }
    }
    
    return new FileModel(file, preview);
  }
}