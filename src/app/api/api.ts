import type { CountryApiResponse } from '@/app/model/main-type';
import { HttpError } from '@/app/model/error';

const BASE_URL = 'https://countries.dev';
const REQUEST_TIMEOUT = 10_000;

export async function searchCountries(query: string, signal?: AbortSignal): Promise<CountryApiResponse[]> {
  const url = `${BASE_URL}/name/${encodeURIComponent(query)}`;

  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT);

  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  const response = await fetch(url, {
    method: 'GET',
    signal: combinedSignal,
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid API response structure');
  }

  return data as CountryApiResponse[];
}
