import { ResponseErrorType } from './response';

export type ValidationMessage = { message: string };

export type ValidationResponseError = {
  status: ResponseErrorType,
  data: ValidationMessage
};

export type ValidationResponseSuccess<T> = {
  status: null,
  data: T
};

export type ValidationResponse<T> = ValidationResponseError | ValidationResponseSuccess<T>;
