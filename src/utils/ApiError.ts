class ApiError extends Error {
  constructor(
    statusCode: number,
    message: string = "something went wrong",
    data?: any,
    stack?: string,
    errors: Error[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.stack = stack;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  statusCode: number;
  data: any;
  success: boolean;
  errors: Error[];
}
