import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative py-28 px-6 lg:px-8 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0b1120]/85 backdrop-blur-sm" />
      </motion.div>

      <div className="mx-auto max-w-4xl relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full text-sm font-medium text-dmc-text-dim mb-6 border border-white/10">
            <Sparkles className="h-4 w-4 text-dmc-cyan" />
            Limited Availability
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Your Dream Stay
            <br />
            <span className="text-gradient-cyan">Awaits</span>
          </h2>

          <p className="mt-6 text-lg text-dmc-text-dim max-w-lg mx-auto leading-relaxed">
            Book now and receive complimentary airport transfers, a welcome
            champagne experience, and priority access to all resort amenities.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface px-10 py-6 rounded-full text-base font-semibold shadow-xl shadow-dmc-cyan/30 transition-all duration-300 hover:shadow-2xl hover:shadow-dmc-cyan/40 hover:-translate-y-0.5 group"
              onClick={() => navigate("/auth?returnTo=/dashboard")}
            >
              Reserve Your Suite
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-white/10 text-white hover:bg-white/10 px-10 py-6 rounded-full text-base font-semibold"
            >
              Call +1 (888) 555-DMC
            </Button>
          </div>

          <p className="mt-8 text-sm text-dmc-text-muted">
            Best rate guarantee · Free cancellation · No hidden fees
          </p>
        </motion.div>
      </div>
    </section>
  );
}
