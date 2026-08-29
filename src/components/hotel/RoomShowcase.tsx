import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Maximize2, Users, Wifi, Coffee, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface Room {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  size: string;
  capacity: string;
  features: string[];
  image: string;
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Ocean Suite",
    category: "Suite",
    description:
      "Wake up to panoramic ocean views in this elegantly appointed suite. Features a king bed with premium linens, a separate living area, and a private balcony overlooking the azure waters.",
    price: 450,
    size: "65 m²",
    capacity: "2 Guests",
    features: ["Ocean View", "King Bed", "Balcony", "Rain Shower"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  },
  {
    id: 2,
    name: "Royal Penthouse",
    category: "Penthouse",
    description:
      "The pinnacle of luxury living. This expansive penthouse features floor-to-ceiling windows, a private rooftop terrace, jacuzzi, and personalized butler service for the ultimate escape.",
    price: 1200,
    size: "180 m²",
    capacity: "4 Guests",
    features: ["Rooftop Terrace", "Jacuzzi", "Butler Service", "Panoramic View"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  {
    id: 3,
    name: "Garden Terrace Room",
    category: "Deluxe",
    description:
      "A tranquil retreat surrounded by lush tropical gardens. This room blends modern comfort with natural beauty, featuring direct garden access and a deep soaking tub.",
    price: 320,
    size: "48 m²",
    capacity: "2 Guests",
    features: ["Garden Access", "Soaking Tub", "Lounge Area", "Work Desk"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d955bc56e?w=800&q=80",
  },
  {
    id: 4,
    name: "Presidential Suite",
    category: "Presidential",
    description:
      "Our finest accommodation, designed for discerning travelers. Features two bedrooms, a grand living room, private dining area, and wraparound terrace with 360° views.",
    price: 2500,
    size: "320 m²",
    capacity: "6 Guests",
    features: ["Private Dining", "Wraparound Terrace", "Spa Room", "Wine Cellar"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  },
];

function RoomCard({ room, index }: { room: Room; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden glass border border-white/30 shadow-xl shadow-black/[0.04] hover:shadow-2xl hover:shadow-dmc-gold/10 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="glass-strong px-3 py-1 rounded-full text-xs font-semibold text-dmc-navy">
            {room.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="glass-strong rounded-2xl px-4 py-2 text-right">
            <span className="text-2xl font-bold text-dmc-navy">${room.price}</span>
            <span className="text-xs text-dmc-slate block -mt-0.5">per night</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dmc-navy group-hover:text-dmc-gold transition-colors duration-300">
          {room.name}
        </h3>
        <p className="mt-2 text-sm text-dmc-slate/80 leading-relaxed line-clamp-2">
          {room.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-sm text-dmc-slate">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-dmc-gold" />
            {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-dmc-gold" />
            {room.capacity}
          </span>
        </div>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          {room.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-dmc-gold/8 px-3 py-1 text-xs font-medium text-dmc-gold border border-dmc-gold/10"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Button
            className="w-full rounded-2xl bg-dmc-navy hover:bg-dmc-navy/90 text-white group/btn transition-all duration-300 hover:shadow-lg hover:shadow-dmc-navy/20"
            onClick={() => navigate("/auth?returnTo=/dashboard")}
          >
            Reserve Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoomShowcase() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="relative py-28 px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dmc-gold/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-dmc-gold text-sm font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-dmc-gold" />
            Accommodations
            <span className="h-px w-8 bg-dmc-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold text-dmc-navy tracking-tight"
          >
            Our Exquisite Rooms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 text-dmc-slate max-w-xl mx-auto leading-relaxed"
          >
            Each room is a masterpiece of design and comfort, thoughtfully crafted
            to create an unforgettable sanctuary for our guests.
          </motion.p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-dmc-slate mb-4">
            Looking for the perfect room?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-dmc-gold/30 text-dmc-navy hover:bg-dmc-gold/5 hover:border-dmc-gold/50 px-8"
          >
            <Coffee className="mr-2 h-4 w-4 text-dmc-gold" />
            View All Room Types
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
