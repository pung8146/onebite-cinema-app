"use client";

import { useRouter } from "next/router";
import { startTransition } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div>
      <h3>Error</h3>
      <p>{error.message}</p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        Try again
      </button>
    </div>
  );
}
