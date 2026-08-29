import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    alt: "Hotel exterior at sunset",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    alt: "Luxury pool area",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    alt: "Elegant bedroom",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    alt: "Restaurant interior",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&q=80",
    alt: "Spa treatment room",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    alt: "Beach lounge",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
    alt: "Bathroom suite",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="relative py-28 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-dmc-gold text-sm font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-dmc-gold" />
            Visual Tour
            <span className="h-px w-8 bg-dmc-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold text-dmc-navy tracking-tight"
          >
            Our Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 text-dmc-slate max-w-xl mx-auto leading-relaxed"
          >
            A glimpse into the world of DMC — where every corner tells a story
            of elegance and refined taste.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((img, index) => (
            <GalleryItem key={index} img={img} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  img,
  index,
}: {
  img: (typeof galleryImages)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${img.span}`}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <img
          src={img.src}
          alt={img.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-dmc-navy/40 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-strong p-4 rounded-full"
        >
          <ZoomIn className="h-6 w-6 text-dmc-gold" />
        </motion.div>
      </motion.div>

      {/* Caption */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 p-4"
      >
        <p className="text-sm font-medium text-white drop-shadow-lg">
          {img.alt}
        </p>
      </motion.div>
    </motion.div>
  );
}
