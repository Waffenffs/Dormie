import Hero from "../components/hero";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <main className="w-full h-full flex flex-col gap-5 flex-grow bg-background text-foreground">
      <section className="flex-grow my-12 md:my-24">
        <Hero />
      </section>
      <Footer />
    </main>
  );
}