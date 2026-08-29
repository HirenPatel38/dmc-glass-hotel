import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Maximize2,
  Users,
  Wifi,
  Coffee,
  Bath,
  Tv,
  Wind,
  Star,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roomData: Record<number, {
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  size: string;
  capacity: string;
  features: string[];
  amenities: string[];
  image: string;
  gallery: string[];
}> = {
  1: {
    name: "Deluxe Ocean Suite",
    category: "Suite",
    description: "Wake up to panoramic ocean views.",
    longDescription:
      "Step into a world of refined coastal elegance. The Deluxe Ocean Suite offers 65 m² of thoughtfully designed living space with floor-to-ceiling windows framing endless ocean vistas. The separate living area features custom Italian furnishings, while the king bed is dressed in 800-thread-count Egyptian cotton. Your private balcony extends over the water, creating an intimate connection with the sea.",
    price: 450,
    size: "65 m²",
    capacity: "2 Guests",
    features: ["Ocean View", "King Bed", "Balcony", "Rain Shower"],
    amenities: ["Free Wi-Fi", "Minibar", "Coffee Machine", "Smart TV", "Air Conditioning", "Bathrobes"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d955bc56e?w=600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80",
    ],
  },
  2: {
    name: "Royal Penthouse",
    category: "Penthouse",
    description: "The pinnacle of luxury living.",
    longDescription:
      "Occupying the entire top floor, the Royal Penthouse spans 180 m² of unparalleled luxury. A private elevator opens into a grand foyer with double-height ceilings and a custom chandelier. The wraparound terrace offers 270° views, an outdoor jacuzzi, and a fire pit lounge. Inside, a personal butler attends to every detail, from in-suite dining to arranging exclusive experiences.",
    price: 1200,
    size: "180 m²",
    capacity: "4 Guests",
    features: ["Rooftop Terrace", "Jacuzzi", "Butler Service", "Panoramic View"],
    amenities: ["Free Wi-Fi", "Private Elevator", "Wine Fridge", "Smart Home", "Steam Room", "Dining Room"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    ],
  },
  3: {
    name: "Garden Terrace Room",
    category: "Deluxe",
    description: "A tranquil garden retreat.",
    longDescription:
      "Nestled among manicured tropical gardens, the Garden Terrace Room blends contemporary design with the calming influence of nature. Direct garden access leads to a private terrace surrounded by fragrant jasmine and frangipani. Inside, natural materials — warm wood, soft stone, living greenery — create a sanctuary that restores and rejuvenates.",
    price: 320,
    size: "48 m²",
    capacity: "2 Guests",
    features: ["Garden Access", "Soaking Tub", "Lounge Area", "Work Desk"],
    amenities: ["Free Wi-Fi", "Minibar", "Rain Shower", "Smart TV", "Air Conditioning", "Yoga Mat"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d955bc56e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    ],
  },
  4: {
    name: "Presidential Suite",
    category: "Presidential",
    description: "Our finest accommodation.",
    longDescription:
      "The crown jewel of DMC Glass Hotel. At 320 m², the Presidential Suite is a private residence featuring two bedrooms, a grand living room with double-height windows, a formal dining area for ten, a dedicated spa room with sauna, and a curated wine cellar. The wraparound terrace offers unobstructed 360° views, an infinity plunge pool, and private garden.",
    price: 2500,
    size: "320 m²",
    capacity: "6 Guests",
    features: ["Private Dining", "Wraparound Terrace", "Spa Room", "Wine Cellar"],
    amenities: ["Free Wi-Fi", "Private Elevator", "Chef's Kitchen", "Smart Home", "Sauna", "Plunge Pool"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80",
    ],
  },
};

const amenityIcons: Record<string, React.ReactNode> = {
  "Free Wi-Fi": <Wifi className="h-5 w-5" />,
  "Minibar": <Coffee className="h-5 w-5" />,
  "Rain Shower": <Bath className="h-5 w-5" />,
  "Smart TV": <Tv className="h-5 w-5" />,
  "Air Conditioning": <Wind className="h-5 w-5" />,
  "Coffee Machine": <Coffee className="h-5 w-5" />,
};

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const roomId = Number(id);
  const room = roomData[roomId];

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dmc-surface">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dmc-text mb-4">Room Not Found</h1>
          <Button onClick={() => navigate("/")} className="bg-dmc-cyan text-dmc-surface">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120]">
      {/* Hero Image */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/40 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 glass-strong rounded-full p-3 text-dmc-text hover:text-dmc-cyan transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>

        {/* Category Badge */}
        <div className="absolute top-6 right-6">
          <span className="glass-strong px-4 py-2 rounded-full text-sm font-semibold text-dmc-text">
            {room.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:col-span-2"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dmc-text tracking-tight">
              {room.name}
            </h1>

            <div className="mt-4 flex items-center gap-6 text-sm text-dmc-text-muted">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="h-4 w-4 text-dmc-cyan" /> {room.size}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-dmc-cyan" /> {room.capacity}
              </span>
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-dmc-gold fill-dmc-gold" />
                ))}
              </span>
            </div>

            <div className="mt-8 glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-xl font-bold text-dmc-text mb-4">About This Room</h2>
              <p className="text-dmc-text-dim leading-relaxed">{room.longDescription}</p>
            </div>

            {/* Features */}
            <div className="mt-8 glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-xl font-bold text-dmc-text mb-4">Room Features</h2>
              <div className="flex flex-wrap gap-3">
                {room.features.map((f) => (
                  <span key={f} className="rounded-full bg-dmc-cyan/10 px-4 py-2 text-sm font-medium text-dmc-cyan border border-dmc-cyan/15">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8 glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-xl font-bold text-dmc-text mb-4">In-Room Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 text-dmc-text-dim">
                    <div className="h-10 w-10 rounded-xl bg-dmc-cyan/8 flex items-center justify-center text-dmc-cyan">
                      {amenityIcons[a] || <Coffee className="h-5 w-5" />}
                    </div>
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-8 glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-xl font-bold text-dmc-text mb-4">Gallery</h2>
              <div className="grid grid-cols-3 gap-3">
                {room.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-xl overflow-hidden h-32 lg:h-40"
                  >
                    <img src={img} alt="Room detail" className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 glass-strong rounded-3xl p-8 border border-white/15 shadow-xl shadow-black/30">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-dmc-text">${room.price}</span>
                <span className="text-dmc-text-muted ml-2">/ night</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Room type</span>
                  <span className="text-dmc-text font-medium">{room.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Size</span>
                  <span className="text-dmc-text font-medium">{room.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Capacity</span>
                  <span className="text-dmc-text font-medium">{room.capacity}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dmc-text-muted">1 night</span>
                  <span className="text-dmc-text">${room.price}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dmc-text-muted">Taxes & fees</span>
                  <span className="text-dmc-text">${Math.round(room.price * 0.12)}</span>
                </div>
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between">
                  <span className="font-bold text-dmc-text">Total</span>
                  <span className="font-bold text-dmc-cyan">
                    ${room.price + Math.round(room.price * 0.12)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface font-semibold py-6 rounded-2xl shadow-lg shadow-dmc-cyan/20 hover:shadow-xl hover:shadow-dmc-cyan/30 transition-all"
                onClick={() => navigate(`/booking/${roomId}`)}
              >
                <CalendarCheck className="mr-2 h-5 w-5" />
                Book This Room
              </Button>

              <p className="text-center text-xs text-dmc-text-muted mt-4">
                Free cancellation up to 48 hours before check-in
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
