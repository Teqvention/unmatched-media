"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <PageWrapper className="flex min-h-[calc(100vh-2rem)] p-20">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-12 place-items-center rounded-xl border bg-muted">
            <Search className="size-5 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-muted-foreground text-sm">404</div>
            <h1 className="mt-1 font-semibold text-xl tracking-tight">
              Page not found
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              The page you&rsquo;re looking for doesn&apos;t exist, or it may
              have been moved.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 size-4" />
                  Go home
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/" onClick={() => history.back()}>
                  <ArrowLeft className="mr-2 size-4" />
                  Go back
                </Link>
              </Button>
            </div>

            <div className="mt-6 rounded-lg border bg-muted/40 p-3 text-muted-foreground text-xs">
              Tip: check the URL for typos, or use your sidebar/navigation to
              find what you need.
            </div>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
