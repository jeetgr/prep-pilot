"use client";

import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppForm } from "@/components/form/use-app-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/schemas/auth";

import { GoogleButton } from "./google-button";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const { error } = await authClient.signIn.email(value);

      if (error) {
        // Generic message: don't reveal whether the email is registered
        setServerError(
          error.status === 403
            ? "Verify your email first. The link is in your inbox."
            : "Email or password is incorrect."
        );
        return;
      }
      router.push("/dashboard");
    },
  });

  return (
    <Card className="gap-6 py-6 [--card-spacing:--spacing(6)]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Log in
        </CardTitle>
        <CardDescription>
          Pick up your practice where you left it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  label="Email"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              )}
            </form.AppField>
            <form.AppField name="password">
              {(field) => (
                <field.TextField
                  label="Password"
                  type="password"
                  icon={LockKeyhole}
                  autoComplete="current-password"
                />
              )}
            </form.AppField>
            {serverError && <FieldError>{serverError}</FieldError>}
            <form.AppForm>
              <form.SubmitButton pendingLabel="Logging in…">
                Log in
                <ArrowRight data-icon="inline-end" aria-hidden />
              </form.SubmitButton>
            </form.AppForm>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              or
            </FieldSeparator>
            <GoogleButton />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center border-t bg-muted/50 py-4 text-sm text-muted-foreground">
        New to PrepPilot?&nbsp;
        <Link
          href="/signup"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </CardFooter>
    </Card>
  );
}
