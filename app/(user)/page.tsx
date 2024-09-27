import Hero from "../components/hero";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <main className="w-screen h-screen overflow-auto flex flex-col gap-5 flex-grow bg-background text-foreground">
      <section className="flex-grow">
        <Hero />
      </section>
      <Footer />
    </main>
  );
}