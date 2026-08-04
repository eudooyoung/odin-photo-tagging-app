import CustomError from "./customError.js";

class RecordNotFoundError extends CustomError {
  constructor(message = "Record not found") {
    super({ message, statusCode: 404 });
  }
}

export default RecordNotFoundError;
