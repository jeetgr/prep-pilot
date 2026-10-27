"use client";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  MailCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
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
import { signupSchema } from "@/lib/schemas/auth";

import { GoogleButton } from "./google-button";

export function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: { onSubmit: signupSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const { error } = await authClient.signUp.email({
        ...value,
        callbackURL: "/dashboard",
      });

      if (error) {
        // Generic message: don't reveal whether the email is registered
        setServerError(
          "Couldn't create the account. Try again, or log in if you already have one."
        );
        return;
      }
      setSentTo(value.email);
    },
  });

  if (sentTo) {
    return (
      <Card className="items-center gap-4 py-10 text-center [--card-spacing:--spacing(6)]">
        <span className="grid size-12 place-items-center rounded-full bg-marker">
          <MailCheck className="size-5" aria-hidden />
        </span>
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Check your inbox
          </CardTitle>
          <CardDescription>
            We sent a verification link to{" "}
            <span className="font-medium text-foreground">{sentTo}</span>. Open
            it to finish setting up your account.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="gap-6 py-6 [--card-spacing:--spacing(6)]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription>
          Your first scored interview is a few minutes away.
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
            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Name"
                  icon={UserRound}
                  autoComplete="name"
                />
              )}
            </form.AppField>
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
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
              )}
            </form.AppField>
            {serverError && <FieldError>{serverError}</FieldError>}
            <form.AppForm>
              <form.SubmitButton pendingLabel="Creating account…">
                Create account
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
        Already have an account?&nbsp;
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
