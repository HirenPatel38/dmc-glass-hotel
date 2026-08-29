import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  LogOut,
  CalendarCheck,
  BedDouble,
  Star,
  CreditCard,
  MessageSquare,
  Camera,
  User,
  Settings,
  Clock,
  MapPin,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

const quickActions = [
  { icon: CalendarCheck, label: "My Bookings", desc: "View and manage reservations", color: "text-dmc-cyan" },
  { icon: BedDouble, label: "Room Service", desc: "Order to your room", color: "text-dmc-cyan" },
  { icon: Star, label: "Write a Review", desc: "Share your experience", color: "text-dmc-gold" },
  { icon: CreditCard, label: "Billing", desc: "Invoices and payments", color: "text-dmc-cyan" },
];

const mockBookings = [
  {
    id: "DMC-7K2M9X",
    room: "Deluxe Ocean Suite",
    checkIn: "Sep 15, 2026",
    checkOut: "Sep 18, 2026",
    status: "upcoming" as const,
    nights: 3,
    total: 1350,
  },
  {
    id: "DMC-3P8N1V",
    room: "Royal Penthouse",
    checkIn: "Jul 4, 2026",
    checkOut: "Jul 7, 2026",
    status: "completed" as const,
    nights: 3,
    total: 3600,
  },
];

const mockMessages = [
  { from: "Concierge", text: "Welcome to DMC Glass Hotel! Your yacht charter has been confirmed for Sep 16.", time: "2 hours ago" },
  { from: "Spa", text: "Your couples retreat spa session is scheduled for Sep 17 at 3:00 PM.", time: "1 day ago" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "reviews" | "messages" | "settings">("overview");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Settings },
    { id: "bookings" as const, label: "Bookings", icon: CalendarCheck },
    { id: "reviews" as const, label: "Reviews", icon: Star },
    { id: "messages" as const, label: "Messages", icon: MessageSquare },
    { id: "settings" as const, label: "Profile", icon: User },
  ];

  const isAdmin = true; // Toggle for admin access

  return (
    <div className="min-h-screen bg-[#0b1120]">
      {/* Header */}
      <div className="glass-strong border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-dmc-cyan">Guest Portal</p>
            <h1 className="mt-1 text-2xl font-bold text-dmc-text">
              Welcome back{user?.name ? `, ${user.name}` : ""}
            </h1>
          </div>
          <div className="flex items-center gap-3">            <Button variant="ghost" size="sm" className="text-dmc-cyan hover:bg-dmc-cyan/10" onClick={() => navigate("/")}>
              ← Back to Site
            </Button>
            {isAdmin && (
              <Button variant="outline" size="sm" className="border-dmc-gold/20 text-dmc-gold hover:bg-dmc-gold/5" onClick={() => navigate("/admin")}>
                Admin Panel
              </Button>
            )}
            <Button variant="outline" size="sm" className="border-white/10 text-dmc-text-dim hover:bg-white/5" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <nav className="glass rounded-2xl border border-white/10 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-dmc-cyan/10 text-dmc-cyan border border-dmc-cyan/20"
                      : "text-dmc-text-dim hover:bg-white/5 hover:text-dmc-text"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, i) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card className="glass border-white/10 hover:border-dmc-cyan/20 hover:shadow-lg hover:shadow-dmc-cyan/5 transition-all duration-300 cursor-pointer h-full">
                        <CardHeader className="pb-2">
                          <div className={`mb-2 flex size-10 items-center justify-center rounded-xl bg-dmc-cyan/10 ${action.color}`}>
                            <action.icon className="size-5" />
                          </div>
                          <CardTitle className="text-sm text-dmc-text">{action.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-dmc-text-muted">{action.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Upcoming Booking */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-dmc-text flex items-center gap-2">
                      <Clock className="h-5 w-5 text-dmc-cyan" />
                      Upcoming Reservation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockBookings.filter((b) => b.status === "upcoming").map((b) => (
                      <div key={b.id} className="glass-strong rounded-xl p-4 border border-white/10">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-dmc-text">{b.room}</p>
                            <p className="text-sm text-dmc-text-muted mt-1 flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> DMC Glass Hotel
                            </p>
                            <p className="text-sm text-dmc-text-dim mt-2">
                              {b.checkIn} → {b.checkOut} · {b.nights} nights
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dmc-cyan/10 text-dmc-cyan border border-dmc-cyan/20">
                              Upcoming
                            </span>
                            <p className="text-lg font-bold text-dmc-cyan mt-2">${b.total.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-xs text-dmc-text-muted mt-2 font-mono">#{b.id}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-xl font-bold text-dmc-text">My Bookings</h2>
                {mockBookings.map((b) => (
                  <Card key={b.id} className="glass border-white/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-dmc-text">{b.room}</p>
                          <p className="text-sm text-dmc-text-dim mt-1">
                            {b.checkIn} → {b.checkOut} · {b.nights} nights
                          </p>
                          <p className="text-xs text-dmc-text-muted mt-1 font-mono">#{b.id}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            b.status === "upcoming"
                              ? "bg-dmc-cyan/10 text-dmc-cyan border border-dmc-cyan/20"
                              : "bg-white/5 text-dmc-text-muted border border-white/10"
                          }`}>
                            {b.status === "upcoming" ? "Upcoming" : "Completed"}
                          </span>
                          <span className="font-bold text-dmc-text">${b.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface rounded-full" onClick={() => navigate("/")}>
                  Book a New Room
                </Button>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-bold text-dmc-text">Write a Review</h2>
                <Card className="glass border-white/10">
                  <CardContent className="p-6">
                    {reviewSubmitted ? (
                      <div className="text-center py-8">
                        <Star className="h-12 w-12 text-dmc-gold mx-auto fill-dmc-gold" />
                        <p className="mt-4 text-lg font-bold text-dmc-text">Thank you for your review!</p>
                        <p className="mt-2 text-sm text-dmc-text-dim">Your feedback helps us improve the DMC experience.</p>
                        <Button className="mt-6" variant="ghost" onClick={() => { setReviewSubmitted(false); setReviewText(""); }}>
                          Write Another
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-dmc-text-muted mb-2 block">Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((r) => (
                              <button key={r} onClick={() => setReviewRating(r)} className="p-1">
                                <Star className={`h-6 w-6 transition-colors ${r <= reviewRating ? "text-dmc-gold fill-dmc-gold" : "text-dmc-text-muted"}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-dmc-text-muted mb-2 block">Your Review</label>
                          <Textarea
                            placeholder="Share your experience at DMC Glass Hotel..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted min-h-[120px]"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-dmc-text-muted mb-2 block">Upload Photos</label>
                          <div className="glass-subtle rounded-xl p-8 text-center border border-dashed border-white/15 hover:border-dmc-cyan/30 transition-colors cursor-pointer">
                            <Camera className="h-8 w-8 text-dmc-text-muted mx-auto mb-2" />
                            <p className="text-sm text-dmc-text-muted">Click to upload or drag photos here</p>
                          </div>
                        </div>
                        <Button
                          className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface rounded-xl"
                          disabled={!reviewText.trim()}
                          onClick={() => setReviewSubmitted(true)}
                        >
                          Submit Review
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "messages" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-bold text-dmc-text">Messages</h2>
                <Card className="glass border-white/10">
                  <CardContent className="p-6">
                    <div className="space-y-4 mb-6">
                      {mockMessages.map((m, i) => (
                        <div key={i} className="glass-strong rounded-xl p-4 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-dmc-cyan">{m.from}</span>
                            <span className="text-xs text-dmc-text-muted">{m.time}</span>
                          </div>
                          <p className="text-sm text-dmc-text-dim">{m.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message to concierge..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted"
                      />
                      <Button size="icon" className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface shrink-0 rounded-xl">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-bold text-dmc-text">Profile Settings</h2>
                <Card className="glass border-white/10">
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-dmc-text-muted mb-1 block">First Name</label>
                        <Input defaultValue={user?.name?.split(" ")[0] || ""} className="glass border-white/10 bg-white/5 text-dmc-text" />
                      </div>
                      <div>
                        <label className="text-sm text-dmc-text-muted mb-1 block">Last Name</label>
                        <Input defaultValue={user?.name?.split(" ")[1] || ""} className="glass border-white/10 bg-white/5 text-dmc-text" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm text-dmc-text-muted mb-1 block">Email</label>
                        <Input defaultValue={user?.email || ""} className="glass border-white/10 bg-white/5 text-dmc-text" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm text-dmc-text-muted mb-1 block">Phone</label>
                        <Input placeholder="+1 (555) 000-0000" className="glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                      </div>
                    </div>
                    <Button className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface rounded-xl">Save Changes</Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
