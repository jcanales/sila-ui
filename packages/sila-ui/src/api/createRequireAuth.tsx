import * as React from "react";
import { Navigate } from "react-router-dom";
import type { StoreApi, UseBoundStore } from "zustand";
import type { AuthState } from "../stores/createAuthStore";

export function createRequireAuth(
  useAuthStore: UseBoundStore<StoreApi<AuthState>>,
  loginPath = "/login"
) {
  return function RequireAuth({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    if (!isAuthenticated) return <Navigate to={loginPath} replace />;
    return <>{children}</>;
  };
}
