import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const experiences = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    title: "Sunset Yacht Experience",
    description:
      "Sail along the coast at golden hour aboard our private luxury yacht. Includes champagne, gourmet canapés, and a sunset photography session.",
  },
  {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    title: "Couples Retreat Spa",
    description:
      "A deeply restorative couples' experience combining hot stone therapy, aromatherapy, and a private mineral bath with ocean views.",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    title: "Private Chef's Table",
    description:
      "An intimate 12-course tasting menu prepared by our Michelin-starred chef, paired with rare vintages from our cellar collection.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120] via-[#0e1525] to-[#0b1120]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dmc-cyan/4 rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-7xl relative">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-dmc-cyan text-sm font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-dmc-cyan" />
            Curated
            <span className="h-px w-8 bg-dmc-cyan" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold text-dmc-text tracking-tight"
          >
            Signature Experiences
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 text-dmc-text-dim max-w-xl mx-auto leading-relaxed"
          >
            Beyond accommodation, we craft unforgettable moments. These are the
            experiences our guests treasure most.
          </motion.p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-0 rounded-3xl overflow-hidden glass border border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-dmc-cyan/5 transition-all duration-500`}
            >
              <div className="relative lg:w-1/2 h-64 lg:h-auto min-h-[280px] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-dmc-surface/30 to-transparent" />

                <div className="absolute top-6 left-6 glass-strong p-3 rounded-2xl">
                  <Quote className="h-5 w-5 text-dmc-cyan" />
                </div>
              </div>

              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-dmc-cyan text-sm font-semibold tracking-widest uppercase">
                  Experience {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-dmc-text group-hover:text-dmc-cyan transition-colors duration-300">
                  {exp.title}
                </h3>

                <p className="mt-4 text-dmc-text-dim leading-relaxed">
                  {exp.description}
                </p>

                <Button
                  variant="ghost"
                  className="mt-6 self-start text-dmc-text-dim hover:text-dmc-cyan hover:bg-dmc-cyan/5 group/btn px-0"
                  onClick={() => navigate("/auth?returnTo=/dashboard")}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
