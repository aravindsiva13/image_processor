export class FileModel {
  constructor(file, preview = null) {
    this.file = file;
    this.preview = preview;
    this.name = file?.name || '';
    this.size = file?.size || 0;
    this.type = file?.type || '';
  }

  static isValidImage(file) {
    return file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
  }

  static isValidModel(file) {
    return file && file.name.endsWith('.pt');
  }

  static isValidVideo(file) {
    return file && (file.type.startsWith('video/') || 
      ['.mp4', '.avi', '.mov'].some(ext => file.name.endsWith(ext)));
  }
}