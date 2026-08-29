import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  Wine,
  ShieldCheck,
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description:
      "A stunning infinity-edge pool overlooking the coastline, with a heated section and dedicated poolside cocktail service.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description:
      "Three world-class restaurants featuring award-winning chefs, from Japanese omakase to Mediterranean coastal cuisine.",
  },
  {
    icon: Dumbbell,
    title: "Wellness Center",
    description:
      "A state-of-the-art fitness center and full-service spa offering holistic treatments inspired by ancient healing traditions.",
  },
  {
    icon: Sparkles,
    title: "Luxury Spa",
    description:
      "An indulgent 10,000 sq ft spa with private treatment rooms, hydrotherapy circuit, and couples' wellness suites.",
  },
  {
    icon: Wine,
    title: "Wine Cellar",
    description:
      "An exclusive underground wine cellar housing over 2,000 labels from world-renowned vineyards with private tasting events.",
  },
  {
    icon: ShieldCheck,
    title: "Concierge 24/7",
    description:
      "Round-the-clock personal concierge service to arrange everything from yacht charters to private island excursions.",
  },
];

export default function Amenities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="amenities" className="relative py-28 px-6 lg:px-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dmc-cream via-white to-dmc-cream" />

      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-dmc-gold text-sm font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-dmc-gold" />
            World-Class
            <span className="h-px w-8 bg-dmc-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold text-dmc-navy tracking-tight"
          >
            Hotel Amenities
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 text-dmc-slate max-w-xl mx-auto leading-relaxed"
          >
            Every detail has been curated to elevate your stay. From our
            award-winning dining to our serene wellness spaces.
          </motion.p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-3xl glass border border-white/30 shadow-lg shadow-black/[0.03] hover:shadow-xl hover:shadow-dmc-gold/8 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-dmc-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-dmc-gold/15 to-dmc-gold/5 border border-dmc-gold/10 group-hover:from-dmc-gold/25 group-hover:to-dmc-gold/10 transition-all duration-300">
                  <amenity.icon className="h-6 w-6 text-dmc-gold" />
                </div>

                <h3 className="text-lg font-bold text-dmc-navy group-hover:text-dmc-gold transition-colors duration-300">
                  {amenity.title}
                </h3>

                <p className="mt-3 text-sm text-dmc-slate/80 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
