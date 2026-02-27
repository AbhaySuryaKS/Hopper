import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Users,
  Shield,
  Music,
  Volume2,
  MessageCircle,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import type { Ride, Vibe } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";

type VibeFilter = "all" | Vibe;

const vibeConfig: Record<Vibe, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  silent: { label: "Silent", icon: Volume2, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 border-blue-200 dark:border-blue-800/30" },
  music: { label: "Music", icon: Music, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 border-purple-200 dark:border-purple-800/30" },
  networking: { label: "Networking", icon: MessageCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30 text-green-600 border-green-200 dark:border-green-800/30" },
};

const statusConfig = {
  scheduled: { label: "Scheduled", class: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30" },
  active: { label: "Active", class: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/30" },
  completed: { label: "Completed", class: "bg-muted text-muted-foreground border-border" },
  cancelled: { label: "Cancelled", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

function SkeletonCard() {
  return (
    <Card className="border-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}

function RideCard({ ride }: { ride: Ride }) {
  const navigate = useNavigate();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [seatCount, setSeatCount] = useState(1);

  const vibeInfo = vibeConfig[ride.vibe];
  const VibeIcon = vibeInfo.icon;
  const status = statusConfig[ride.status];

  const handleRequest = () => {
    toast.success(`Booking ${seatCount} seat(s) on ${ride.driverName}'s ride!`);
    setBookingDialogOpen(false);
    navigate({ to: "/trip" });
  };

  return (
    <>
      <Card className="border-border hover:border-primary/30 hover:shadow-glow transition-all duration-200 group">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/15 text-primary text-sm font-bold">
                  {ride.driverName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm text-foreground">{ride.driverName}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground font-mono-data">{ride.driverTrustScore}</span>
                  {ride.femaleOnly && (
                    <span className="ml-1">
                      <Shield className="w-3 h-3 text-pink-500" />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Badge variant="outline" className={`text-[10px] font-medium shrink-0 ${status.class}`}>
              {status.label}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="text-foreground font-medium">{ride.startLocation}</span>
            </div>
            <div className="ml-1 w-px h-3 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-muted-foreground">{ride.destination}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{ride.dateTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{ride.seatsAvailable} seat{ride.seatsAvailable !== 1 ? "s" : ""} left</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5 flex-wrap">
              <Badge variant="outline" className={`text-[10px] flex items-center gap-1 ${vibeInfo.bg}`}>
                <VibeIcon className="w-2.5 h-2.5" />
                {vibeInfo.label}
              </Badge>
              {ride.femaleOnly && (
                <Badge variant="outline" className="text-[10px] bg-pink-50 dark:bg-pink-950/30 text-pink-600 border-pink-200 dark:border-pink-800/30 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" />
                  Women Only
                </Badge>
              )}
              <span className="text-xs font-mono-data font-semibold text-primary">₹15</span>
            </div>

            <Button
              size="sm"
              className="h-7 text-xs shrink-0"
              disabled={ride.seatsAvailable === 0 || ride.status === "completed" || ride.status === "cancelled"}
              onClick={() => setBookingDialogOpen(true)}
            >
              {ride.seatsAvailable === 0 ? "Full" : "Request Seat"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Book Seats</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/15 text-primary text-sm font-bold">
                  {ride.driverName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{ride.driverName}</p>
                <p className="text-xs text-muted-foreground">{ride.startLocation} → {ride.destination}</p>
                <p className="text-xs text-muted-foreground">{ride.dateTime}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Number of seats</p>
              <div className="flex items-center gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setSeatCount((s) => Math.max(1, s - 1))}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors font-bold"
                >
                  -
                </button>
                <span className="font-mono-data font-bold text-2xl w-8 text-center">{seatCount}</span>
                <button
                  type="button"
                  onClick={() => setSeatCount((s) => Math.min(ride.seatsAvailable, s + 1))}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors font-bold"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-center text-muted-foreground">{ride.seatsAvailable} seats available</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-xl border border-primary/20">
              <span className="text-sm font-medium">Total</span>
              <span className="font-mono-data font-bold text-primary text-lg">₹{seatCount * 15}</span>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRequest}>Confirm Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SearchPage() {
  const { rides } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [femaleOnlyFilter, setFemaleOnlyFilter] = useState(false);
  const [vibeFilter, setVibeFilter] = useState<VibeFilter>("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      !searchQuery ||
      ride.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFemale = !femaleOnlyFilter || ride.femaleOnly;
    const matchesVibe = vibeFilter === "all" || ride.vibe === vibeFilter;
    return matchesSearch && matchesFemale && matchesVibe;
  });

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Find a Ride</h1>
          <p className="text-sm text-muted-foreground">Browse rides going to campus</p>
        </div>

        <div className="space-y-3 mb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by pickup location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <Shield className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-xs font-medium">Women Only</span>
              <Switch
                checked={femaleOnlyFilter}
                onCheckedChange={setFemaleOnlyFilter}
                className="h-4 w-7 data-[state=checked]:bg-pink-500"
              />
            </div>

            <div className="flex gap-1">
              {(["all", "silent", "music", "networking"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibeFilter(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 capitalize ${
                    vibeFilter === v
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {v === "all" ? (
                    <span className="flex items-center gap-1">
                      <Filter className="w-3 h-3" />
                      All
                    </span>
                  ) : v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : filteredRides.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">No rides found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            filteredRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
          )}
        </div>
      </div>
    </div>
  );
}
