import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Gauge,
  ListChecks,
  Mic,
} from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

// The three steps of a session, in order. Numbered because the order is real.
const steps = [
  {
    icon: ListChecks,
    title: "Set up",
    body: "Choose the role, seniority and topics you're interviewing for.",
  },
  {
    icon: Mic,
    title: "Answer",
    body: "Type your answer or say it out loud, one question at a time.",
  },
  {
    icon: Gauge,
    title: "Review",
    body: "Get a score, what worked, what to fix and an ideal answer.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Log in
          </Button>
          <Button nativeButton={false} render={<Link href="/signup" />}>
            Sign up
          </Button>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <section>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Interview practice, scored
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl">
            Walk in having{" "}
            <span className="marker marker-draw">already answered</span> the
            hard questions.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-pretty text-muted-foreground">
            Practice with questions written for your role and level. Every
            answer comes back with a score, specific feedback and a stronger
            version to learn from.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-11 px-5 text-base"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Start practicing
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 bg-card px-5 text-base"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              I have an account
            </Button>
          </div>
        </section>

        <ScoredAnswer />
      </main>

      <section className="border-t bg-card">
        <ol className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-heading text-lg font-semibold">
                  <span className="mr-2 font-mono text-sm text-muted-foreground">
                    {index + 1}
                  </span>
                  {title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

// Signature element: what PrepPilot feedback looks like on a real answer
function ScoredAnswer() {
  return (
    <figure
      aria-label="Example of scored feedback"
      className="relative rounded-2xl border bg-card p-6 shadow-[0_1px_0_#dcded5,0_24px_48px_-24px_rgb(21_23_28/0.25)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4 font-mono text-xs text-muted-foreground">
        <span>Q3 · System design · Mid-level</span>
        <span className="text-right">
          <span className="block font-heading text-4xl leading-none font-semibold text-foreground">
            7<span className="text-xl text-muted-foreground">/10</span>
          </span>
          score
        </span>
      </div>

      <p className="mt-4 font-heading text-xl leading-snug font-semibold">
        How would you rate-limit a public API?
      </p>

      <blockquote className="mt-5 border-l-2 pl-4 text-[0.95rem] leading-relaxed text-foreground/85">
        I&apos;d keep a <span className="marker">token bucket per API key</span>{" "}
        in Redis, so short bursts are fine but the average rate stays capped.{" "}
        <span className="underline decoration-destructive/60 decoration-wavy underline-offset-4">
          Not sure what happens if Redis goes down.
        </span>
      </blockquote>

      <figcaption className="mt-6 space-y-3 border-t pt-5 text-sm">
        <p className="flex gap-2.5">
          <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <span className="font-medium">Strength:</span> picked a fitting
            algorithm and explained the burst trade-off.
          </span>
        </p>
        <p className="flex gap-2.5">
          <CircleAlert
            className="mt-0.5 size-4 shrink-0 text-destructive"
            aria-hidden
          />
          <span>
            <span className="font-medium">To fix:</span> decide whether to fail
            open or closed when the store is unavailable, and say why.
          </span>
        </p>
      </figcaption>
    </figure>
  );
}
