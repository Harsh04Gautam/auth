class AppError extends Error {
  public status: string;
  public isOperational: boolean;

  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = this.statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default AppError;
