import { HttpStatus } from '@nestjs/common';
import { httpError } from 'src/enums/errors/httpError.enum';

export class customError extends Error {
  constructor(
    public readonly type: keyof typeof HttpStatus,
    public readonly message: string,
  ) {
    super(message);
  }

  public static badRequest(message: string): customError {
    return new customError(httpError.BAD_REQUEST, message);
  }

  public static unauthorize(message: string): customError {
    return new customError(httpError.UNAUTHORIZED, message);
  }

  public static forbidden(message: string): customError {
    return new customError(httpError.FORBIDDEN, message);
  }

  public static notFound(message: string): customError {
    return new customError(httpError.NOT_FOUND, message);
  }

  public static internalServer(message: string): customError {
    return new customError(httpError.INTERNAL_SERVER_ERROR, message);
  }
}
