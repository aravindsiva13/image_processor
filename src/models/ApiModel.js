export class ApiResponse {
  constructor(success = false, data = null, error = null, message = '') {
    this.success = success;
    this.data = data;
    this.error = error;
    this.message = message;
  }
}