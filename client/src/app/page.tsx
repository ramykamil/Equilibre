"use client";

import { Header } from "@/features/landing/header";
import { Hero } from "@/features/landing/hero";
import { Features } from "@/features/landing/features";
import { Pricing } from "@/features/landing/pricing";
import { Footer } from "@/features/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/10">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
