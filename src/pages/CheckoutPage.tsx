import { useParams, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = Number(id);
  const roomName = roomNames[roomId] || "Deluxe Ocean Suite";
  const price = roomPrices[roomId] || 450;

  const checkIn = searchParams.get("checkin");
  const checkOut = searchParams.get("checkout");
  const guests = Number(searchParams.get("guests")) || 2;

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 1;

  const subtotal = price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

  const [completed, setCompleted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl p-12 border border-white/15 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="h-20 w-20 text-dmc-cyan mx-auto" />
          </motion.div>
          <h1 className="mt-6 text-2xl font-bold text-dmc-text">Booking Confirmed</h1>
          <p className="mt-3 text-dmc-text-dim">
            Your reservation at DMC Glass Hotel has been confirmed. Check your
            email for booking details and confirmation code.
          </p>
          <div className="mt-6 glass rounded-xl p-4 border border-white/10">
            <p className="text-xs text-dmc-text-muted">Confirmation #</p>
            <p className="text-lg font-bold text-dmc-cyan font-mono">
              DMC-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
          </div>
          <Button
            className="mt-8 w-full bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface font-semibold py-6 rounded-2xl"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

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
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dmc-text-muted hover:text-dmc-text transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to booking
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-dmc-text">Checkout</h1>
          <p className="mt-2 text-dmc-text-dim">Complete your reservation at DMC Glass Hotel</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}>
              {/* Guest Info */}
              <div className="glass rounded-3xl p-6 lg:p-8 border border-white/10 mb-6">
                <h3 className="font-bold text-dmc-text mb-4">Guest Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-dmc-text-muted mb-1 block">First Name</label>
                    <Input placeholder="John" required className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-dmc-text-muted mb-1 block">Last Name</label>
                    <Input placeholder="Doe" required className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-dmc-text-muted mb-1 block">Email</label>
                    <Input type="email" placeholder="john@example.com" required className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-dmc-text-muted mb-1 block">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="glass rounded-3xl p-6 lg:p-8 border border-white/10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-dmc-text">Payment Details</h3>
                  <div className="flex items-center gap-1 text-xs text-dmc-text-muted">
                    <Lock className="h-3 w-3" /> Encrypted
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-dmc-text-muted mb-1 block">Cardholder Name</label>
                    <Input placeholder="Name on card" required className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                  </div>
                  <div>
                    <label className="text-sm text-dmc-text-muted mb-1 block">Card Number</label>
                    <Input placeholder="4242 4242 4242 4242" required maxLength={19} className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-dmc-text-muted mb-1 block">Expiry</label>
                      <Input placeholder="MM / YY" required maxLength={7} className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted font-mono" />
                    </div>
                    <div>
                      <label className="text-sm text-dmc-text-muted mb-1 block">CVC</label>
                      <Input placeholder="123" required maxLength={4} className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface font-semibold py-6 rounded-2xl shadow-lg shadow-dmc-cyan/20 transition-all text-base"
                disabled={processing}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-dmc-surface/30 border-t-dmc-surface rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay ${total.toLocaleString()}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-dmc-text-muted">
                <Shield className="h-3 w-3" /> Your payment information is secure and encrypted
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass-strong rounded-3xl p-6 border border-white/15 shadow-xl shadow-black/30 sticky top-24">
              <h3 className="font-bold text-dmc-text mb-6">Order Summary</h3>

              <div className="glass rounded-xl p-4 border border-white/10 mb-6">
                <p className="font-bold text-dmc-text">{roomName}</p>
                <div className="mt-2 space-y-1 text-sm text-dmc-text-muted">
                  <p>Check-in: {formatDate(checkIn)}</p>
                  <p>Check-out: {formatDate(checkOut)}</p>
                  <p>Guests: {guests}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">${price} × {nights} night{nights > 1 ? "s" : ""}</span>
                  <span className="text-dmc-text">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dmc-text-muted">Taxes & fees (12%)</span>
                  <span className="text-dmc-text">${taxes.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="font-bold text-dmc-text">Total</span>
                  <span className="font-bold text-dmc-cyan text-lg">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
