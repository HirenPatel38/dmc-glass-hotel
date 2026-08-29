import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Victoria Ashford",
    role: "Travel Editor, Condé Nast",
    text: "DMC Glass Hotel redefines what luxury hospitality means. The attention to detail is extraordinary — from the personalized welcome amenities to the hand-stitched linens. Simply flawless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "James Wellington III",
    role: "CEO, Wellington Capital",
    text: "I have stayed at the finest hotels across five continents. DMC stands alone. The Presidential Suite felt like a private residence, and the concierge team anticipated my every need before I even asked.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Sophia Chen",
    role: "Celebrity Chef & Author",
    text: "The culinary experience at DMC rivals any Michelin-starred restaurant I have visited. Their private chef's table dinner was a 12-course journey that left our entire party speechless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="relative py-28 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120] via-[#0e1525] to-[#0b1120]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-dmc-cyan/3 rounded-full blur-3xl" />

      <div className="mx-auto max-w-4xl relative" ref={ref}>
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-dmc-cyan text-sm font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-dmc-cyan" />
            Guest Voices
            <span className="h-px w-8 bg-dmc-cyan" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold text-dmc-text tracking-tight"
          >
            What Our Guests Say
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10 shadow-xl shadow-black/30">
            <Quote className="h-10 w-10 text-dmc-cyan/30 mb-6" />

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg lg:text-xl text-dmc-text-dim leading-relaxed italic">
                "{testimonials[current].text}"
              </p>

              <div className="flex gap-1 mt-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-dmc-gold fill-dmc-gold" />
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-dmc-cyan/20"
                />
                <div>
                  <p className="font-bold text-dmc-text">{testimonials[current].name}</p>
                  <p className="text-sm text-dmc-text-muted">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/10 hover:bg-white/5 hover:border-dmc-cyan/30"
              onClick={prev}
            >
              <ChevronLeft className="h-4 w-4 text-dmc-text-dim" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-dmc-cyan"
                      : "w-2 bg-white/15 hover:bg-white/25"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/10 hover:bg-white/5 hover:border-dmc-cyan/30"
              onClick={next}
            >
              <ChevronRight className="h-4 w-4 text-dmc-text-dim" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
