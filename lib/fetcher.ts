const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function fetcher<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;
  
  // 1. Build URL with query params if they exist
  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  // 2. Setup standard headers
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const config: RequestInit = {
    method: customConfig.method || 'GET',
    headers: defaultHeaders,
    ...customConfig,
  };

  const response = await fetch(url, config);

  // 3. Handle errors clean and globally
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  // Handle empty responses (like 204 No Content for Logout) safely
  if (response.status === 204) return {} as T;

  return response.json();
}