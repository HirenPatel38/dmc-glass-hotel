import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ArrowRight, Maximize2, Users, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const categories = ["All", "Suite", "Penthouse", "Deluxe", "Presidential"];

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
      className="group relative rounded-3xl overflow-hidden glass border border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-dmc-cyan/10 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="glass-strong px-3 py-1 rounded-full text-xs font-semibold text-dmc-text">
            {room.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="glass-strong rounded-2xl px-4 py-2 text-right">
            <span className="text-2xl font-bold text-dmc-text">${room.price}</span>
            <span className="text-xs text-dmc-text-muted block -mt-0.5">per night</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dmc-text group-hover:text-dmc-cyan transition-colors duration-300">
          {room.name}
        </h3>
        <p className="mt-2 text-sm text-dmc-text-dim leading-relaxed line-clamp-2">
          {room.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-sm text-dmc-text-muted">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-dmc-cyan" />
            {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-dmc-cyan" />
            {room.capacity}
          </span>
        </div>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          {room.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-dmc-cyan/8 px-3 py-1 text-xs font-medium text-dmc-cyan border border-dmc-cyan/10"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Button
            className="w-full rounded-2xl bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface font-semibold group/btn transition-all duration-300 hover:shadow-lg hover:shadow-dmc-cyan/20"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            View Details
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
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        search === "" ||
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.description.toLowerCase().includes(search.toLowerCase()) ||
        room.features.some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        activeCategory === "All" || room.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section id="rooms" className="relative py-28 px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dmc-cyan/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-dmc-cyan text-sm font-semibold tracking-widest uppercase mb-4"
          >
            <span className="h-px w-8 bg-dmc-cyan" />
            Accommodations
            <span className="h-px w-8 bg-dmc-cyan" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold text-dmc-text tracking-tight"
          >
            Our Rooms & Suites
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 text-dmc-text-dim max-w-xl mx-auto leading-relaxed"
          >
            Each room is a masterpiece of design and comfort, thoughtfully crafted
            to create an unforgettable sanctuary for our guests.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dmc-text-muted" />
              <Input
                placeholder="Search rooms, features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted focus:border-dmc-cyan/40 focus:ring-dmc-cyan/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <SlidersHorizontal className="h-4 w-4 text-dmc-text-muted mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-dmc-cyan text-dmc-surface shadow-lg shadow-dmc-cyan/20"
                      : "glass-subtle text-dmc-text-dim hover:text-dmc-text hover:bg-white/8"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-dmc-text-muted mt-4">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </p>
        </motion.div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-dmc-text-muted text-lg">No rooms match your search.</p>
            <Button
              variant="ghost"
              className="mt-4 text-dmc-cyan hover:text-dmc-cyan/80"
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
