class CustomError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message); // Gọi constructor của lớp Error
      this.statusCode = statusCode;
  
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }

export default CustomError;