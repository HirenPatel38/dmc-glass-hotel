import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Star, Award, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dmc-surface/90 via-dmc-surface/60 to-dmc-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-dmc-surface/40" />
      </motion.div>

      {/* Decorative glowing orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-dmc-cyan/8 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-10 w-56 h-56 bg-dmc-gold/5 rounded-full blur-2xl animate-float-delayed" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full text-sm font-medium text-dmc-text-dim mb-6">
              <Sparkles className="h-4 w-4 text-dmc-cyan" />
              Award-Winning Luxury Since 1987
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Where Luxury
            <br />
            Meets{" "}
            <span className="text-gradient-cyan">Precision</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 text-lg text-dmc-text-dim max-w-lg leading-relaxed"
          >
            DMC Glass Hotel redefines hospitality with meticulous craft and
            cutting-edge comfort. Every detail is engineered for an
            experience you will not forget.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 flex items-center gap-8"
          >
            {[
              { icon: Star, label: "Rating", value: "4.9" },
              { icon: Award, label: "Awards", value: "23+" },
              { icon: MapPin, label: "Locations", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-dmc-cyan" />
                <div>
                  <span className="text-white font-semibold">{stat.value}</span>
                  <span className="text-dmc-text-muted text-sm ml-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface px-8 py-6 rounded-full text-base font-semibold shadow-xl shadow-dmc-cyan/30 transition-all duration-300 hover:shadow-2xl hover:shadow-dmc-cyan/40 hover:-translate-y-0.5"
              onClick={() => {
                document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Rooms
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-white/15 text-white hover:bg-white/10 px-8 py-6 rounded-full text-base font-semibold backdrop-blur-sm"
              onClick={() => {
                document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Virtual Tour
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-dmc-text-muted tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-dmc-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
