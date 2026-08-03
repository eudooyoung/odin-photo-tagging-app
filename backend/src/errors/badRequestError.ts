import CustomError from "./customError.js";

class BadRequestError extends CustomError {
  constructor(message = "Bad request") {
    super({ message, statusCode: 400 });
  }
}

export default BadRequestError;
