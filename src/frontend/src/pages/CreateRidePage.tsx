import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Users, Music, Volume2, MessageCircle, ChevronLeft, Car, Shield } from "lucide-react";
import { toast } from "sonner";
import type { Vibe } from "@/context/AppContext";

const VIBES: { value: Vibe; label: string; icon: React.ElementType; color: string }[] = [
  { value: "silent", label: "Silent", icon: Volume2, color: "text-blue-500" },
  { value: "music", label: "Music", icon: Music, color: "text-purple-500" },
  { value: "networking", label: "Networking", icon: MessageCircle, color: "text-green-500" },
];

export function CreateRidePage() {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("IIT Campus");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(2);
  const [femaleOnly, setFemaleOnly] = useState(false);
  const [vibe, setVibe] = useState<Vibe>("music");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startLocation || !date || !time) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Ride created successfully! Riders can now find you.");
    setSubmitting(false);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Create a Ride</h1>
            <p className="text-sm text-muted-foreground">Offer seats to campus-bound students</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="border-border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Route Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Start Location *</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                  <Input
                    placeholder="e.g. Koramangala, BTM Layout"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="pl-8 h-10 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Destination *</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500" />
                  <Input
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-8 h-10 text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-8 h-10 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-8 h-10 text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Seats Available
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">How many riders can you take?</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.max(1, s - 1))}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono-data font-bold text-xl text-foreground">{seats}</span>
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.min(4, s + 1))}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3">
                {[1, 2, 3, 4].map((seat) => (
                  <div
                    key={seat}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-200 ${seat <= seats ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Ride Vibe
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex gap-2">
                {VIBES.map(({ value, label, icon: Icon, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setVibe(value)}
                    className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all duration-200 ${
                      vibe === value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-accent"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${vibe === value ? "text-primary" : color}`} />
                    <span className={`text-xs font-medium ${vibe === value ? "text-primary" : "text-foreground"}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center">
                    <Shield className="w-4.5 h-4.5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Female-Only Ride</p>
                    <p className="text-xs text-muted-foreground">Only female students can book</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {femaleOnly && (
                    <Badge className="bg-pink-500/10 text-pink-600 border-pink-500/20 text-[10px]">Active</Badge>
                  )}
                  <Switch
                    checked={femaleOnly}
                    onCheckedChange={setFemaleOnly}
                    className="data-[state=checked]:bg-pink-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold gap-2"
            disabled={submitting}
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Car className="w-5 h-5" />
            )}
            {submitting ? "Creating..." : "Create Ride"}
          </Button>
        </form>
      </div>
    </div>
  );
}
