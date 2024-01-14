export default class RequestError extends Error{
          constructor(message){
                    super(message);
                    this.isOperational=true;
                    Error.captureStackTrace(this, this.constructor);
          }
}