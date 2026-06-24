"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/validations/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { loginAction } from "@/app/actions/auth";
import enMessages from "@/messages/en.json";
import bnMessages from "@/messages/bn.json";

type AuthMode = "login" | "register";

export default function AuthSheet() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { locale } = useLanguage();

  const messages = locale === "bn" ? bnMessages.Auth : enMessages.Auth;
  const t = (key: keyof typeof enMessages.Auth) => messages[key];

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginSubmitting },
  } = loginForm;

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: registerSubmitting },
  } = registerForm;

  const onLogin = async (data: LoginFormData) => {
    try {
      const res = await loginAction({ email: data.email, password: data.password });
      if (res.success) {
        toast.success("Logged in successfully");
        setIsOpen(false);
        router.push(`/${locale}/dashboard`);
      } else {
        toast.error(res.error || "Invalid email or password");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid email or password");
    }
  };

  const onRegister = async (_data: RegisterFormData) => {
    toast.error(t("notAvailable"));
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden shrink-0"
          aria-label="User Account"
        >
          <User className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>
            {mode === "login" ? t("loginTitle") : t("registerTitle")}
          </SheetTitle>
        </SheetHeader>

        <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg">
              {mode === "login" ? (
                <User className="h-6 w-6 text-primary-foreground" />
              ) : (
                <UserPlus className="h-6 w-6 text-primary-foreground" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {mode === "login" ? t("loginTitle") : t("registerTitle")}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {mode === "login" ? t("accountAccess") : t("createAccountDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex mx-8 mt-6 bg-muted rounded-xl p-1">
          <button
            onClick={() => switchMode("login")}
            className={cn(
              "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
              mode === "login"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("login")}
          </button>
          <button
            onClick={() => switchMode("register")}
            className={cn(
              "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
              mode === "register"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("register")}
          </button>
        </div>

        <div className="p-8 pt-6">
          {mode === "login" ? (
            <form
              onSubmit={handleLoginSubmit(onLogin)}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="login-email">{t("emailLabel")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="text"
                    placeholder={t("emailPlaceholder")}
                    className="pl-10"
                    {...loginRegister("email")}
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">{t("passwordLabel")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    className="pl-10 pr-10"
                    {...loginRegister("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-xl font-semibold"
                disabled={loginSubmitting}
              >
                {loginSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("loggingIn")}
                  </>
                ) : (
                  t("loginButton")
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {t("noAccount")}{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="text-primary font-medium hover:underline"
                >
                  {t("register")}
                </button>
              </p>
            </form>
          ) : (
            <form
              onSubmit={handleRegisterSubmit(onRegister)}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="reg-name">{t("nameLabel")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    className="pl-10"
                    {...registerRegister("name")}
                  />
                </div>
                {registerErrors.name && (
                  <p className="text-xs text-destructive mt-1">
                    {registerErrors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">{t("emailLabel")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-email"
                    type="text"
                    placeholder={t("emailPlaceholder")}
                    className="pl-10"
                    {...registerRegister("email")}
                  />
                </div>
                {registerErrors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {registerErrors.email.message}
                  </p>
                )}
                </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">{t("passwordLabel")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    className="pl-10 pr-10"
                    {...registerRegister("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {registerErrors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {registerErrors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-confirm-password">
                  {t("confirmPasswordLabel")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirmPasswordPlaceholder")}
                    className="pl-10 pr-10"
                    {...registerRegister("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">
                    {registerErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-xl font-semibold"
                disabled={registerSubmitting}
              >
                {registerSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("registering")}
                  </>
                ) : (
                  t("registerButton")
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {t("haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-primary font-medium hover:underline"
                >
                  {t("login")}
                </button>
              </p>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
