import * as React from "react";
import { Lock, User as UserIcon, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import { Label } from "../primitives/Label";

export interface LoginShellStrings {
  formTitle: string;
  formSubtitle?: string;
  usernameLabel: string;
  usernamePlaceholder?: string;
  passwordLabel: string;
  passwordPlaceholder?: string;
  signIn: string;
  signingIn: string;
  invalidCredentials: string;
  demoNote?: string;
}

export interface LoginShellProps {
  brandPanel?: React.ReactNode;
  mobileHeader?: React.ReactNode;
  strings: LoginShellStrings;
  onSubmit: (username: string, password: string) => Promise<boolean>;
  onSuccess: () => void;
  initialUsername?: string;
  initialPassword?: string;
}

export function LoginShell({
  brandPanel,
  mobileHeader,
  strings,
  onSubmit,
  onSuccess,
  initialUsername = "",
  initialPassword = "",
}: LoginShellProps) {
  const [username, setUsername] = React.useState(initialUsername);
  const [password, setPassword] = React.useState(initialPassword);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await onSubmit(username, password);
    setLoading(false);
    if (ok) {
      onSuccess();
    } else {
      setError(strings.invalidCredentials);
    }
  };

  return (
    <div className="min-h-screen flex">
      {brandPanel && (
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white bg-teal-800">
          {brandPanel}
        </div>
      )}

      <div className="flex flex-1 items-center justify-center bg-slate-50 p-4 sm:p-8">
        <div className="w-full max-w-sm">
          {mobileHeader && (
            <div className="lg:hidden text-center mb-8">{mobileHeader}</div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              {strings.formTitle}
            </h2>
            {strings.formSubtitle && (
              <p className="text-xs text-slate-500 mb-6">{strings.formSubtitle}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label
                  htmlFor="username"
                  className="text-xs font-medium text-slate-700"
                >
                  {strings.usernameLabel}
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={strings.usernamePlaceholder}
                    className="pl-9"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-700"
                >
                  {strings.passwordLabel}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={strings.passwordPlaceholder}
                    className="pl-9 pr-9"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {strings.signingIn}
                  </span>
                ) : (
                  strings.signIn
                )}
              </Button>
            </form>

            {strings.demoNote && (
              <p className="mt-4 text-center text-[10px] text-slate-400">
                {strings.demoNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
