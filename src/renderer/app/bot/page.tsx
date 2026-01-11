import type { Metadata } from "next";
import { Content } from "./content";

export const metadata: Metadata = {
  title: "Teqvention - Bot Management",
};

interface PageProps {
  searchParams?: Promise<{ tab?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  return <Content tab={sp.tab} />;
}
