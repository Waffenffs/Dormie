"use client";

import Navigation from "./components/navigation";
import Hero from "./components/hero";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-auto flex flex-col gap-5 flex-grow bg-background text-foreground">
      <section className="flex-grow">
        <Navigation />
        <Hero />
      </section>
      <Footer />
    </main>
  );
}