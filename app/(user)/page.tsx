"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // Import the useTheme hook
import Hero from "../components/hero";
import Footer from "../components/footer";

const images = [
  "/laya-at-diwa-scaled.jpg",
  "/office-business-affairs.jpg",
  "/outside.jpg",
  "/indang-dorm.jpg",
];

export default function HomePage() {
  const { theme } = useTheme();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const newIndex = (prevImage + 1) % images.length;
        console.log("Current Image Index:", newIndex); // Log current index
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="relative w-full h-screen flex flex-col gap-5 flex-grow bg-background text-foreground overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Gradient Overlay. WAFFEN, I FEEL LIGHTHEADED ALREADY I HAVENT EATEN YET RAGHHH!!!*/}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          theme === "light" ? "bg-gradient-to-b from-white/45 to-transparent" : "bg-gradient-to-b from-black via-transparent to-transparent"
        } z-10`}
      />

      <section className="flex-grow my-12 md:my-24 relative z-20">
        <Hero />
      </section>
      <Footer />
    </main>
  );
}
