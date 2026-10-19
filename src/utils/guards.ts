import type { ApiResponse } from '../types/api';

export function isApiSuccess<T>(response: ApiResponse<T>): response is { ok: true; data: T } {
  return response.ok === true;
}
