import { create, type StoreApi, type UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  username: string;
  name: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface CreateAuthStoreOptions {
  apiUrl: string;
  storageKey: string;
  tokenKey: string;
  transformUsername?: (username: string) => string;
  demoUser?: AuthUser;
  demoCredentials?: { username: string; password: string };
}

export function createAuthStore({
  apiUrl,
  storageKey,
  tokenKey,
  transformUsername = (u) => u,
  demoUser,
  demoCredentials,
}: CreateAuthStoreOptions): UseBoundStore<StoreApi<AuthState>> {
  return create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        login: async (username, password) => {
          if (!username.trim() || !password.trim()) return false;

          try {
            const identifier = transformUsername(username);
            const res = await fetch(`${apiUrl}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: identifier, password }),
            });

            if (res.ok) {
              const data = (await res.json()) as {
                token: string;
                user: { name: string; role: string };
              };
              localStorage.setItem(tokenKey, data.token);
              set({
                user: {
                  username,
                  name: data.user.name,
                  role: data.user.role,
                },
                isAuthenticated: true,
              });
              return true;
            }

            if (!res.ok) return false;
          } catch {
            // backend unreachable — fall through to demo mode
          }

          if (
            demoCredentials &&
            demoUser &&
            username === demoCredentials.username &&
            password === demoCredentials.password
          ) {
            set({ user: demoUser, isAuthenticated: true });
            return true;
          }

          return false;
        },

        logout: () => {
          localStorage.removeItem(tokenKey);
          set({ user: null, isAuthenticated: false });
        },
      }),
      { name: storageKey }
    )
  );
}
