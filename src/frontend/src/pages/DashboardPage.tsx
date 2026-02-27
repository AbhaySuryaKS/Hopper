import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { MockMap } from "@/components/MockMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  Crown,
  Zap,
  RotateCcw,
  Search,
  ChevronRight,
  AlertCircle,
  QrCode,
  Smartphone,
  DollarSign,
  Plus,
  Car,
} from "lucide-react";
import { toast } from "sonner";

const RIDE_COUNTS = [10, 20, 30];
const DISTANCES = [5, 10, 15];

export function DashboardPage() {
  const { currentUser, activeRole, toggleRole } = useApp();
  const navigate = useNavigate();

  const [rideCount, setRideCount] = useState(10);
  const [distanceKm, setDistanceKm] = useState(5);
  const [isPremium, setIsPremium] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cash" | null>(null);
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const basePrice = 15;
  const extraPerKm = 2;
  const extraKm = Math.max(0, distanceKm - 5);
  const pricePerRide = basePrice + extraKm * extraPerKm;
  const totalPrice = pricePerRide * rideCount * (isPremium ? 1.3 : 1);

  const handleBookNow = () => {
    setBookingConfirmed(true);
    toast.success("Booking confirmed! Select payment to proceed.");
  };

  const handlePayment = () => {
    toast.success(paymentMethod === "upi" ? "UPI App opening..." : "Cash payment confirmed!");
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      {!reminderDismissed && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800/50 px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-sm text-amber-800 dark:text-amber-200 font-medium">
              Your ride is tomorrow at 8:15 AM — Confirm your seat?
            </span>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              className="h-7 text-xs bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => { toast.success("Ride confirmed!"); setReminderDismissed(true); }}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-amber-700 dark:text-amber-400"
              onClick={() => setReminderDismissed(true)}
            >
              Skip
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="w-full lg:w-[420px] xl:w-[480px] flex flex-col overflow-y-auto border-r border-border">
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40 rounded-lg px-3 py-2 flex-1">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-green-800 dark:text-green-300">Student Identity Verified</p>
                  <p className="text-[10px] text-green-600 dark:text-green-500">via SheerID — {currentUser?.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleRole}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 shrink-0 ${
                  activeRole === "driver"
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-secondary text-secondary-foreground border-border"
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                {activeRole === "driver" ? "Driver" : "Rider"}
              </button>
            </div>

            {activeRole === "driver" && (
              <Button
                onClick={() => navigate({ to: "/create-ride" })}
                className="w-full h-9 text-sm gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Ride
              </Button>
            )}
          </div>

          <div className="p-4 flex-1">
            <Tabs defaultValue="single">
              <TabsList className="w-full h-9 mb-4">
                <TabsTrigger value="single" className="flex-1 text-xs">Single Ride</TabsTrigger>
                <TabsTrigger value="future" className="flex-1 text-xs">Future</TabsTrigger>
                <TabsTrigger value="pass" className="flex-1 text-xs">Pass</TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="space-y-3 mt-0">
                <div className="space-y-2">
                  <Label className="text-xs">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input placeholder="Pickup location" className="pl-8 h-10 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary" />
                    <Input placeholder="IIT Campus" defaultValue="IIT Campus" className="pl-8 h-10 text-sm" />
                  </div>
                </div>
                <Button
                  className="w-full h-10 gap-2"
                  onClick={() => navigate({ to: "/search" })}
                >
                  <Search className="w-4 h-4" />
                  Find Rides
                </Button>
              </TabsContent>

              <TabsContent value="future" className="space-y-3 mt-0">
                <div className="space-y-2">
                  <Label className="text-xs">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input placeholder="Pickup location" className="pl-8 h-10 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary" />
                    <Input placeholder="IIT Campus" defaultValue="IIT Campus" className="pl-8 h-10 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-xs">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input type="date" className="pl-8 h-10 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input type="time" className="pl-8 h-10 text-sm" />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-10 gap-2" onClick={() => toast.success("Future booking submitted!")}>
                  <Calendar className="w-4 h-4" />
                  Book for Later
                </Button>
              </TabsContent>

              <TabsContent value="pass" className="space-y-4 mt-0">
                <div>
                  <Label className="text-xs mb-2 block">Number of Rides</Label>
                  <div className="flex gap-2">
                    {RIDE_COUNTS.map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setRideCount(count)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                          rideCount === count
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs mb-2 block">Distance</Label>
                  <div className="flex gap-2">
                    {DISTANCES.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDistanceKm(d)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                          distanceKm === d
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {d}km
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-accent rounded-xl p-4 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per ride</span>
                    <span className="font-mono-data font-semibold text-foreground">₹{pricePerRide}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rides</span>
                    <span className="font-mono-data font-semibold text-foreground">× {rideCount}</span>
                  </div>
                  {isPremium && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Premium markup</span>
                      <span className="font-mono-data font-semibold text-amber-500">+30%</span>
                    </div>
                  )}
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-mono-data font-bold text-lg text-primary">₹{Math.round(totalPrice)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground">Premium Ride</span>
                        {isPremium && (
                          <Badge className="h-4 text-[9px] bg-amber-500 text-white px-1.5">PREMIUM</Badge>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground">Priority + Flexible</p>
                    </div>
                  </div>
                  <Switch checked={isPremium} onCheckedChange={setIsPremium} />
                </div>

                {isPremium && (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Zap, title: "Priority Pickup", desc: "First in queue" },
                      { icon: RotateCcw, title: "Flex Cancel", desc: "Cancel any time" },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div
                        key={title}
                        className="flex flex-col gap-1 p-3 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20"
                      >
                        <Icon className="w-4 h-4 text-amber-600" />
                        <p className="text-xs font-semibold text-foreground">{title}</p>
                        <p className="text-[10px] text-muted-foreground">{desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {!bookingConfirmed ? (
                  <Button className="w-full h-10 gap-2" onClick={handleBookNow}>
                    <ChevronRight className="w-4 h-4" />
                    Book Pass — ₹{Math.round(totalPrice)}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Label className="text-xs">Payment Method</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "upi" as const, label: "UPI", icon: Smartphone },
                        { id: "cash" as const, label: "Cash", icon: DollarSign },
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPaymentMethod(id)}
                          className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all duration-200 ${
                            paymentMethod === id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${paymentMethod === id ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${paymentMethod === id ? "text-primary" : "text-foreground"}`}>
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "upi" && (
                      <div className="space-y-3">
                        <div className="flex flex-col items-center p-4 bg-accent rounded-xl gap-3">
                          <div className="w-28 h-28 bg-background border-2 border-border rounded-xl flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">Scan to pay ₹{Math.round(totalPrice)}</p>
                        </div>
                        <Button className="w-full h-10 gap-2" onClick={handlePayment}>
                          <Smartphone className="w-4 h-4" />
                          Open UPI App
                        </Button>
                      </div>
                    )}

                    {paymentMethod === "cash" && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-xl text-center space-y-2">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                        <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                          Pay ₹{Math.round(totalPrice)} in cash to driver
                        </p>
                        <Button
                          className="w-full h-9 bg-green-600 hover:bg-green-700 text-white"
                          onClick={handlePayment}
                        >
                          Confirm Cash Payment
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-4 border-t border-border">
            <Card className="border-border bg-card">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs text-muted-foreground font-medium">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-8"
                  onClick={() => navigate({ to: "/trip" })}
                >
                  Active Trip
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-8"
                  onClick={() => navigate({ to: "/active-ride" })}
                >
                  Live Ride
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="hidden lg:block flex-1 p-2">
          <MockMap className="rounded-xl" showPickupRequest={activeRole === "driver"} />
        </div>
      </div>
    </div>
  );
}
