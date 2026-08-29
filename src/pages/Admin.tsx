import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  BedDouble,
  Users,
  CalendarDays,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Search,
  Bell,
  BarChart3,
} from "lucide-react";

const stats = [
  { label: "Total Bookings", value: "247", change: "+12%", icon: CalendarDays, color: "text-dmc-cyan" },
  { label: "Revenue", value: "$1.2M", change: "+8%", icon: DollarSign, color: "text-emerald-400" },
  { label: "Occupancy Rate", value: "89%", change: "+5%", icon: TrendingUp, color: "text-dmc-gold" },
  { label: "Guest Satisfaction", value: "4.9", change: "+0.2", icon: BarChart3, color: "text-purple-400" },
];

const recentBookings = [
  { id: "DMC-7K2M9X", guest: "Victoria Ashford", room: "Presidential Suite", dates: "Sep 15–18", status: "confirmed", total: "$7,500" },
  { id: "DMC-3P8N1V", guest: "James Wellington", room: "Royal Penthouse", dates: "Sep 12–15", status: "confirmed", total: "$3,600" },
  { id: "DMC-9W4T2K", guest: "Sophia Chen", room: "Deluxe Ocean Suite", dates: "Sep 10–13", status: "checked-in", total: "$1,350" },
  { id: "DMC-6R1M8B", guest: "Alexander Gray", room: "Garden Terrace Room", dates: "Sep 8–10", status: "completed", total: "$640" },
  { id: "DMC-2H5J9P", guest: "Emma Richardson", room: "Deluxe Ocean Suite", dates: "Sep 5–8", status: "completed", total: "$1,350" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-dmc-cyan/10 text-dmc-cyan border-dmc-cyan/20",
  "checked-in": "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  completed: "bg-white/5 text-dmc-text-muted border-white/10",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"overview" | "rooms" | "bookings">("overview");

  const sections = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "rooms" as const, label: "Rooms", icon: BedDouble },
    { id: "bookings" as const, label: "Bookings", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120]">
      {/* Admin Header */}
      <div className="glass-strong border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-dmc-text-muted hover:text-dmc-text transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-medium text-dmc-gold">Admin Panel</p>
              <h1 className="mt-0.5 text-2xl font-bold text-dmc-text">DMC Glass Hotel</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl glass-subtle text-dmc-text-dim hover:text-dmc-text transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-red-500 rounded-full border-2 border-dmc-surface" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-dmc-cyan to-dmc-cyan-dim flex items-center justify-center text-xs font-bold text-dmc-surface">
              A
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="glass rounded-2xl border border-white/10 p-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? "bg-dmc-gold/10 text-dmc-gold border border-dmc-gold/20"
                      : "text-dmc-text-dim hover:bg-white/5 hover:text-dmc-text"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            {activeSection === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="glass rounded-2xl p-5 border border-white/10">
                        <div className={`flex size-10 items-center justify-center rounded-xl bg-white/5 ${s.color} mb-3`}>
                          <s.icon className="size-5" />
                        </div>
                        <p className="text-2xl font-bold text-dmc-text">{s.value}</p>
                        <p className="text-xs text-dmc-text-muted mt-1">{s.label}</p>
                        <p className="text-xs text-emerald-400 mt-1">{s.change} this month</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-dmc-text">Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 text-dmc-text-muted font-medium">ID</th>
                            <th className="text-left py-3 text-dmc-text-muted font-medium">Guest</th>
                            <th className="text-left py-3 text-dmc-text-muted font-medium hidden sm:table-cell">Room</th>
                            <th className="text-left py-3 text-dmc-text-muted font-medium hidden md:table-cell">Dates</th>
                            <th className="text-left py-3 text-dmc-text-muted font-medium">Status</th>
                            <th className="text-right py-3 text-dmc-text-muted font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentBookings.map((b) => (
                            <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 font-mono text-dmc-text-muted">{b.id}</td>
                              <td className="py-3 text-dmc-text font-medium">{b.guest}</td>
                              <td className="py-3 text-dmc-text-dim hidden sm:table-cell">{b.room}</td>
                              <td className="py-3 text-dmc-text-dim hidden md:table-cell">{b.dates}</td>
                              <td className="py-3">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[b.status] || statusColors.confirmed}`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-3 text-right font-bold text-dmc-text">{b.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === "rooms" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-dmc-text">Room Management</h2>
                  <Button className="bg-dmc-cyan hover:bg-dmc-cyan/90 text-dmc-surface rounded-xl text-sm">
                    + Add Room
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dmc-text-muted" />
                  <Input placeholder="Search rooms..." className="pl-10 glass border-white/10 bg-white/5 text-dmc-text placeholder:text-dmc-text-muted" />
                </div>
                {[
                  { name: "Deluxe Ocean Suite", category: "Suite", price: 450, status: "Available" },
                  { name: "Royal Penthouse", category: "Penthouse", price: 1200, status: "Booked" },
                  { name: "Garden Terrace Room", category: "Deluxe", price: 320, status: "Available" },
                  { name: "Presidential Suite", category: "Presidential", price: 2500, status: "Available" },
                ].map((room) => (
                  <div key={room.name} className="glass rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-dmc-text">{room.name}</p>
                      <p className="text-sm text-dmc-text-muted">{room.category} · ${room.price}/night</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        room.status === "Available" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" : "bg-dmc-cyan/10 text-dmc-cyan border-dmc-cyan/20"
                      }`}>
                        {room.status}
                      </span>
                      <button className="p-2 rounded-lg hover:bg-white/5 text-dmc-text-muted hover:text-dmc-text transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 text-dmc-text-muted hover:text-dmc-cyan transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 text-dmc-text-muted hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeSection === "bookings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-xl font-bold text-dmc-text">All Bookings</h2>
                <Card className="glass border-white/10">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-4 px-6 text-dmc-text-muted font-medium">ID</th>
                            <th className="text-left py-4 px-6 text-dmc-text-muted font-medium">Guest</th>
                            <th className="text-left py-4 px-6 text-dmc-text-muted font-medium">Room</th>
                            <th className="text-left py-4 px-6 text-dmc-text-muted font-medium hidden md:table-cell">Dates</th>
                            <th className="text-left py-4 px-6 text-dmc-text-muted font-medium">Status</th>
                            <th className="text-right py-4 px-6 text-dmc-text-muted font-medium">Total</th>
                            <th className="text-right py-4 px-6 text-dmc-text-muted font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentBookings.map((b) => (
                            <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-6 font-mono text-dmc-text-muted">{b.id}</td>
                              <td className="py-4 px-6 text-dmc-text font-medium">{b.guest}</td>
                              <td className="py-4 px-6 text-dmc-text-dim">{b.room}</td>
                              <td className="py-4 px-6 text-dmc-text-dim hidden md:table-cell">{b.dates}</td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[b.status] || statusColors.confirmed}`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right font-bold text-dmc-text">{b.total}</td>
                              <td className="py-4 px-6 text-right">
                                <button className="p-1.5 rounded-lg hover:bg-white/5 text-dmc-text-muted hover:text-dmc-cyan transition-colors">
                                  <Edit className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

