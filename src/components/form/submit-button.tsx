"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useFormContext } from "./form-context";

export function SubmitButton({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel: string;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          size="lg"
          className="h-10 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                className="animate-spin"
                data-icon="inline-start"
                aria-hidden
              />
              {pendingLabel}
            </>
          ) : (
            children
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}
