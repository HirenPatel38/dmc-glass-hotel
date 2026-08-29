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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dmc-cream to-white" />

      <div className="mx-auto max-w-7xl relative">
        {/* Top section */}
        <div className="glass rounded-3xl p-8 lg:p-12 border border-white/40 shadow-lg shadow-black/[0.03]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-dmc-gold to-dmc-gold-light shadow-lg shadow-dmc-gold/20">
                  <span className="text-lg font-bold text-white tracking-tight">D</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-[0.2em] text-dmc-navy">
                    DMC
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.35em] text-dmc-slate uppercase -mt-0.5">
                    Hotel & Resort
                  </span>
                </div>
              </div>

              <p className="text-sm text-dmc-slate/80 leading-relaxed max-w-xs">
                A world-renowned luxury destination where timeless elegance meets
                modern sophistication. Creating unforgettable memories since 1987.
              </p>

              {/* Contact */}
              <div className="mt-6 space-y-3">
                <a href="#" className="flex items-center gap-3 text-sm text-dmc-slate hover:text-dmc-gold transition-colors">
                  <MapPin className="h-4 w-4 text-dmc-gold shrink-0" />
                  123 Ocean Drive, Malibu, CA 90265
                </a>
                <a href="tel:+18885555632" className="flex items-center gap-3 text-sm text-dmc-slate hover:text-dmc-gold transition-colors">
                  <Phone className="h-4 w-4 text-dmc-gold shrink-0" />
                  +1 (888) 555-DMC
                </a>
                <a href="mailto:reservations@dmc.hotel" className="flex items-center gap-3 text-sm text-dmc-slate hover:text-dmc-gold transition-colors">
                  <Mail className="h-4 w-4 text-dmc-gold shrink-0" />
                  reservations@dmc.hotel
                </a>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-dmc-navy mb-4 text-sm tracking-wide">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-dmc-slate/70 hover:text-dmc-gold transition-colors"
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

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dmc-slate/60">
            © {new Date().getFullYear()} DMC Hotel & Resort. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -2 }}
                className="glass-subtle h-9 w-9 rounded-full flex items-center justify-center text-dmc-slate hover:text-dmc-gold hover:border-dmc-gold/20 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -3 }}
            onClick={scrollToTop}
            className="glass-subtle h-9 w-9 rounded-full flex items-center justify-center text-dmc-slate hover:text-dmc-gold hover:border-dmc-gold/20 transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
