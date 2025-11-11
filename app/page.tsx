import FAQ from "@/components/faq";
import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import Heading from "@/components/header";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import Info from "@/components/info";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <HeroSection />
      <Heading />

      <HowItWorks />

      <Feedback />
      <FAQ />
      <Info />
      <Footer />
    </div>
  );
}
