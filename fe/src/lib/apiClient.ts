/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/apiClient.ts
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function apiClient<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: Record<string, any>,
): Promise<ApiResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (error: any) {
    console.error("Error in API call:", error.message);
    return { error: error.message };
  }
}
