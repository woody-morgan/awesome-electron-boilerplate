export interface IBaseException {
  errorCode: string;
  statusCode: number;
  message: string;
  timestamp?: string;
  path?: string;
}
