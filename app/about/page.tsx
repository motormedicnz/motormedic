"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import AboutHero from "../components/about/about-hero";
import AboutStory from "../components/about/about-story";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow dark bg-background text-foreground">
        <AboutHero />
        <AboutStory />
      </main>
      <Footer showBrands={true} />
    </div>
  );
}