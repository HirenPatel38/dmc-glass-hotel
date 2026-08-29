import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roomNames: Record<number, string> = {
  1: "Deluxe Ocean Suite",
  2: "Royal Penthouse",
  3: "Garden Terrace Room",
  4: "Presidential Suite",
};

const roomPrices: Record<number, number> = {
  1: 450,
  2: 1200,
  3: 320,
  4: 2500,
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const roomId = Number(id);
  const roomName = roomNames[roomId] || "Deluxe Ocean Suite";
  const price = roomPrices[roomId] || 450;

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [selecting, setSelecting] = useState<"in" | "out">("in");

  const nights = checkIn && checkOut
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleDateClick = (day: number) => {
    const selected = new Date(year, month, day);
    if (selected < today) return;

    if (selecting === "in") {
      setCheckIn(selected);
      setCheckOut(null);
      setSelecting("out");
    } else {
      if (checkIn && selected > checkIn) {
        setCheckOut(selected);
        setSelecting("in");
      } else {
        setCheckIn(selected);
        setCheckOut(null);
        setSelecting("out");
      }
    }
  };

  const isInRange = (day: number) => {
    if (!checkIn || !checkOut) return false;
    const d = new Date(year, month, day);
    return d > checkIn && d < checkOut;
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isCheckIn = checkIn?.getDate() === d && checkIn?.getMonth() === month && checkIn?.getFullYear() === year;
      const isCheckOut = checkOut?.getDate() === d && checkOut?.getMonth() === month && checkOut?.getFullYear() === year;
      const inRange = isInRange(d);
      const past = isPast(d);

      days.push(
        <button
          key={d}
          onClick={() => handleDateClick(d)}
          disabled={past}
          className={`h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 relative ${
            past
              ? "text-dmc-text-muted/30 cursor-not-allowed"
              : isCheckIn || isCheckOut
              ? "bg-dmc-cyan text-dmc-surface shadow-lg shadow-dmc-cyan/20"
              : inRange
              ? "bg-dmc-cyan/15 text-dmc-cyan"
              : "text-dmc-text-dim hover:bg-white/5 hover:text-dmc-text"
          }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const format = (d: Date | null) =>
    d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

  return (
    <div className="min-h-screen bg-[#0b1120] py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(`/rooms/${roomId}`)}
            className="flex items-center gap-2 text-dmc-text-muted hover:text-dmc-text transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to room
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-dmc-text">Book Your Stay</h1>
          <p className="mt-2 text-dmc-text-dim">
            {roomName} · <span className="text-dmc-cyan">${price}</span> / night
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-6 lg:p-8 border border-white/10">
              {/* Selection Indicator */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex-1 p-3 rounded-xl text-center transition-all ${selecting === "in" ? "glass-strong border-dmc-cyan/30" : "glass-subtle"}`}>
                  <span className="text-xs text-dmc-text-muted block">Check-in</span>
                  <span className="text-sm font-bold text-dmc-text">{format(checkIn)}</span>
                </div>
                <div className="text-dmc-text-muted">→</div>
                <div className={`flex-1 p-3 rounded-xl text-center transition-all ${selecting === "out" ? "glass-strong border-dmc-cyan/30" : "glass-subtle"}`}>
                  <span className="text-xs text-dmc-text-muted block">Check-out</span>
                  <span className="text-sm font-bold text-dmc-text">{format(checkOut)}</span>
                </div>
              </div>

              {/* Month Nav */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-white/5 text-dmc-text-dim hover:text-dmc-text transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-bold text-dmc-text">
                  {monthNames[month]} {year}
                </h3>
                <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-white/5 text-dmc-text-dim hover:text-dmc-text transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-dmc-text-muted py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass-strong rounded-3xl p-6 border border-white/15 shadow-xl shadow-black/30 sticky top-24">
              <h3 className="font-bold text-dmc-text mb-6">Booking Summary</h3>

              {/* Guests */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dmc-text-muted flex items-center gap-2">
                    <Users className="h-4 w-4" /> Guests
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="h-8 w-8 rounded-lg glass-subtle flex items-center justify-center text-dmc-text-dim hover:text-dmc-text transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-dmc-text">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="h-8 w-8 rounded-lg glass-subtle flex items-center justify-center text-dmc-text-dim hover:text-dmc-text transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Check-in</span>
                  <span className="text-dmc-text font-medium">{format(checkIn)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Check-out</span>
                  <span className="text-dmc-text font-medium">{format(checkOut)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Guests</span>
                  <span className="text-dmc-text font-medium">{guests}</span>
                </div>
                {nights > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-dmc-text-muted">{nights} night{nights > 1 ? "s" : ""}</span>
                      <span className="text-dmc-text">${price * nights}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dmc-text-muted">Taxes & fees</span>
                      <span className="text-dmc-text">${Math.round(price * nights * 0.12)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="font-bold text-dmc-text">Total</span>
                      <span className="font-bold text-dmc-cyan">
                        ${price * nights + Math.round(price * nights * 0.12)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <Button
                className="w-full mt-6 bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface font-semibold py-6 rounded-2xl shadow-lg shadow-dmc-cyan/20 transition-all"
                disabled={!checkIn || !checkOut || nights === 0}
                onClick={() => navigate(`/checkout/${roomId}?checkin=${checkIn?.toISOString()}&checkout=${checkOut?.toISOString()}&guests=${guests}`)}
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Continue to Checkout
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
