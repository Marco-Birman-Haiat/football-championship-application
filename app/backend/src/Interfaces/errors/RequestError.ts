import { ResponseErrorType } from '../responses/response';

export type IRequestError = {
  name: ResponseErrorType,
  message: string;
};

export default class RequestError extends Error {
  public name: ResponseErrorType;
  public message: string;

  constructor(errorData: IRequestError) {
    super();
    this.name = errorData.name;
    this.message = errorData.message;
  }
}
