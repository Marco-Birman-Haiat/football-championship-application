import { ResponseErrorType, ResponseSuccessType } from './response';

export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: ResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: ResponseSuccessType,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
