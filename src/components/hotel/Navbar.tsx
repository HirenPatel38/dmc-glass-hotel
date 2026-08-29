import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-dmc-cyan to-dmc-cyan-dim shadow-lg shadow-dmc-cyan/20">
                <Terminal className="h-5 w-5 text-dmc-surface" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-[0.2em] text-dmc-text">
                  DMC<span className="text-dmc-cyan">.</span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.35em] text-dmc-text-muted uppercase -mt-0.5">
                  Glass Hotel
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-dmc-text-dim hover:text-dmc-text transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-dmc-cyan rounded-full group-hover:w-6 transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-dmc-text-dim hover:text-dmc-text"
              >
                <Phone className="h-4 w-4" />
                +1 (888) 555-DMC
              </Button>
              <Button
                size="sm"
                className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface px-6 rounded-full text-sm font-semibold shadow-lg shadow-dmc-cyan/20 transition-all duration-300 hover:shadow-xl hover:shadow-dmc-cyan/30"
                onClick={() => navigate("/auth?returnTo=/dashboard")}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl glass-subtle"
            >
              {mobileOpen ? <X className="h-5 w-5 text-dmc-text" /> : <Menu className="h-5 w-5 text-dmc-text" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 px-6 pb-6 bg-dmc-surface/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2 mt-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-lg font-medium text-dmc-text py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-4"
              >
                <Button
                  className="w-full bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface rounded-full py-6 text-base font-semibold"
                  onClick={() => { setMobileOpen(false); navigate("/auth?returnTo=/dashboard"); }}
                >
                  Book Your Stay
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
