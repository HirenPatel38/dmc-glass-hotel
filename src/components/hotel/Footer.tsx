import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowUp,
  Terminal,
} from "lucide-react";

const footerLinks = {
  Hotel: [
    { label: "About Us", href: "#" },
    { label: "Our Rooms", href: "#rooms" },
    { label: "Dining", href: "#" },
    { label: "Spa & Wellness", href: "#" },
    { label: "Gallery", href: "#gallery" },
  ],
  Services: [
    { label: "Concierge", href: "#" },
    { label: "Airport Transfer", href: "#" },
    { label: "Event Planning", href: "#" },
    { label: "Private Dining", href: "#" },
    { label: "Yacht Charter", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-8 px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120] to-[#070d19]" />

      <div className="mx-auto max-w-7xl relative">
        <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10 shadow-lg shadow-black/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
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
              </div>

              <p className="text-sm text-dmc-text-dim leading-relaxed max-w-xs">
                A world-renowned luxury destination where timeless elegance meets
                modern precision. Creating unforgettable memories since 1987.
              </p>

              <div className="mt-6 space-y-3">
                <a href="#" className="flex items-center gap-3 text-sm text-dmc-text-dim hover:text-dmc-cyan transition-colors">
                  <MapPin className="h-4 w-4 text-dmc-cyan shrink-0" />
                  123 Ocean Drive, Malibu, CA 90265
                </a>
                <a href="tel:+18885555632" className="flex items-center gap-3 text-sm text-dmc-text-dim hover:text-dmc-cyan transition-colors">
                  <Phone className="h-4 w-4 text-dmc-cyan shrink-0" />
                  +1 (888) 555-DMC
                </a>
                <a href="mailto:reservations@dmc.glass" className="flex items-center gap-3 text-sm text-dmc-text-dim hover:text-dmc-cyan transition-colors">
                  <Mail className="h-4 w-4 text-dmc-cyan shrink-0" />
                  reservations@dmc.glass
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-dmc-text mb-4 text-sm tracking-wide">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-dmc-text-muted hover:text-dmc-cyan transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dmc-text-muted">
            © {new Date().getFullYear()} DMC Glass Hotel. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -2 }}
                className="glass-subtle h-9 w-9 rounded-full flex items-center justify-center text-dmc-text-muted hover:text-dmc-cyan transition-colors"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={scrollToTop}
            className="glass-subtle h-9 w-9 rounded-full flex items-center justify-center text-dmc-text-muted hover:text-dmc-cyan transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
