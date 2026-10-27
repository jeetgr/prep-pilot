import { ClipboardList } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Logo } from "@/components/brand/logo";
import { requireSession } from "@/server/session";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <SignOutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-10 sm:px-6">
        <div>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Dashboard
          </p>
          <Suspense
            fallback={
              <div className="mt-2 h-10 w-72 animate-pulse rounded-md bg-muted" />
            }
          >
            <Greeting />
          </Suspense>
        </div>

        <section className="flex flex-col items-center rounded-2xl border border-dashed border-input bg-card px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-marker">
            <ClipboardList className="size-5" aria-hidden />
          </span>
          <h2 className="mt-4 font-heading text-xl font-semibold">
            No interviews yet
          </h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Finished interviews show up here with their score and feedback, so
            you can see what&apos;s improving.
          </p>
        </section>
      </main>
    </div>
  );
}

async function Greeting() {
  // Real auth gate: validates the session against the DB (proxy only checks the cookie)
  const { user } = await requireSession();
  const firstName = user.name.split(" ")[0] ?? user.name;

  return (
    <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">
      Welcome back, {firstName}
    </h1>
  );
}
