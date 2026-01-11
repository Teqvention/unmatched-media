"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const requestedRoute =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <PageWrapper className="relative">
      {/* subtle background */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-225 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 h-72 w-225 -translate-x-1/2 rounded-full bg-muted/60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      </div> */}

      {/* content */}
      <div className="relative mx-auto flex h-full max-w-5xl flex-1 items-center px-6 py-14">
        <div className="w-full">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* left */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1 text-muted-foreground text-xs">
                <span className="inline-block size-2 rounded-full bg-primary" />
                404 — Not found
              </div>

              <h1 className="mt-5 font-semibold text-4xl tracking-tight sm:text-5xl">
                This page doesn&apos;t exist.
              </h1>

              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                The link may be broken, or the page may have been moved. Try
                going back, or head home.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild>
                  <Link href="/">
                    <Home className="mr-2 size-4" />
                    Go home
                  </Link>
                </Button>

                <Button onClick={() => history.back()} variant="outline">
                  <ArrowLeft className="mr-2 size-4" />
                  Go back
                </Button>
              </div>

              <div className="mt-10 text-muted-foreground text-sm">
                Tip: check the URL for typos, or use your navigation/sidebar to
                find what you need.
              </div>
            </div>

            {/* right "illustration" */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />
              <div className="relative rounded-3xl border bg-card/60 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl border bg-muted/60">
                    <Search className="size-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">
                      We couldn&apos;t find it
                    </div>
                    <div className="truncate text-muted-foreground text-sm">
                      {requestedRoute}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-10 rounded-xl border bg-muted/30" />
                  <div className="h-10 rounded-xl border bg-muted/30" />
                  <div className="h-10 rounded-xl border bg-muted/30" />
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border bg-muted/30 p-4">
                  <div className="text-muted-foreground text-sm">Status</div>
                  <div className="rounded-full bg-destructive/15 px-3 py-1 font-medium text-destructive text-xs">
                    Missing
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="mt-14 border-t pt-6 text-muted-foreground text-xs">
            If you believe this is a mistake, contact an administrator or report
            the broken link.
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
