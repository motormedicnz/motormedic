import Navbar from "./components/Navbar";
import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import AboutSnippet from "./components/home/about";
import Footer from "./components/footer/Footer";
import { HomePageLoader } from "./components/HomePageLoader";

const Index = () => {
  return (
    <HomePageLoader>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />

        {/* About Section (short) */}
        <AboutSnippet />
        
        <Services />
        <Footer />
      </main>
    </HomePageLoader>
  );
};

export default Index;
