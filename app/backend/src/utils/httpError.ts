import { ResponseErrorType } from '../Interfaces/responses/response';

const mapHttpStatus: Record<ResponseErrorType, number> = {
  invalidData: 400,
  notFound: 404,
  unauthorized: 401,
  conflict: 409,
  uprocessableData: 422,
};

const getErrorCode = (type: ResponseErrorType): number => mapHttpStatus[type];

export default getErrorCode;
