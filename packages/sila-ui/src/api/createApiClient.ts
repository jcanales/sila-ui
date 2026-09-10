export interface ApiClient {
  get: <T>(path: string, options?: RequestInit) => Promise<T>;
  post: <T>(path: string, body: unknown) => Promise<T>;
  request: <T>(path: string, options?: RequestInit) => Promise<T>;
}

export interface CreateApiClientOptions {
  baseUrl: string;
  tokenKey: string;
  onUnauthorized?: () => void;
  sessionExpiredMessage?: string;
}

export function createApiClient({
  baseUrl,
  tokenKey,
  onUnauthorized,
  sessionExpiredMessage = "Session expired. Please log in again.",
}: CreateApiClientOptions): ApiClient {
  function token(): string | null {
    return localStorage.getItem(tokenKey);
  }

  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const t = token();
    if (t) headers["Authorization"] = `Bearer ${t}`;

    const res = await fetch(`${baseUrl}${path}`, { ...options, headers });

    if (res.status === 401) {
      localStorage.removeItem(tokenKey);
      onUnauthorized?.();
      throw new Error(sessionExpiredMessage);
    }

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(body.error ?? `HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  return {
    request,
    get: <T>(path: string, options?: RequestInit) =>
      request<T>(path, options),
    post: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  };
}
