import { motion } from "framer-motion";
import Navbar from "@/components/hotel/Navbar";
import Hero from "@/components/hotel/Hero";
import RoomShowcase from "@/components/hotel/RoomShowcase";
import Amenities from "@/components/hotel/Amenities";
import Experience from "@/components/hotel/Experience";
import Gallery from "@/components/hotel/Gallery";
import Testimonials from "@/components/hotel/Testimonials";
import CTABanner from "@/components/hotel/CTABanner";
import Footer from "@/components/hotel/Footer";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Navbar />
      <Hero />
      <RoomShowcase />
      <Amenities />
      <Experience />
      <Gallery />
      <Testimonials />
      <CTABanner />
      <Footer />
    </motion.div>
  );
}
