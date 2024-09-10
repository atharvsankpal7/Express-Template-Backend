interface ApiResponseData {
  statusCode: number;
  message: string;
  data: unknown;
  success: boolean;
}

class ApiResponse implements ApiResponseData {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: unknown;
  public readonly success: boolean;

  constructor(statusCode: number, message: string, data: unknown) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}
