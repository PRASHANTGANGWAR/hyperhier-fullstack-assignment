export class BaseResponseDto<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
