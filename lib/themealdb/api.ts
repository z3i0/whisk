const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export class TheMealDBError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "TheMealDBError";
  }
}

/**
 * Fetch wrapper for TheMealDB API with robust error handling and Next.js caching support
 */
export async function fetchFromMealDB<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new TheMealDBError(
        `TheMealDB API error: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof TheMealDBError) {
      throw error;
    }
    // Never catch Next.js internal dynamic rendering or navigation exceptions
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string"
    ) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown network error";
    throw new TheMealDBError(`Failed to fetch from TheMealDB: ${message}`);
  }
}
