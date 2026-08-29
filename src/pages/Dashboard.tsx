import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  LogOut,
  CalendarCheck,
  BedDouble,
  Star,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const quickActions = [
  { icon: CalendarCheck, label: "My Reservations", desc: "View & manage bookings" },
  { icon: BedDouble, label: "Room Service", desc: "Order to your room" },
  { icon: Star, label: "Concierge", desc: "Request assistance" },
  { icon: CreditCard, label: "Billing", desc: "View invoices & payments" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-dmc-cream px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-dmc-gold">
              DMC Guest Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-dmc-navy">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start border-dmc-gold/20 text-dmc-navy hover:bg-dmc-gold/5"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="border-white/40 shadow-md glass hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-dmc-gold/10 text-dmc-gold">
                    <action.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base text-dmc-navy">{action.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-dmc-slate">
                  {action.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-white/40 shadow-md glass">
          <CardHeader>
            <CardTitle className="text-dmc-navy">Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-dmc-slate">
            Your personalized guest dashboard is ready. Manage reservations, request
            services, and explore everything DMC Hotel has to offer.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
