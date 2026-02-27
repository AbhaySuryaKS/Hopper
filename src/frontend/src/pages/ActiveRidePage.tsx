import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { MockMap } from "@/components/MockMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Siren,
  MapPin,
  Clock,
  Navigation,
  Flag,
  CheckCircle,
  Car,
} from "lucide-react";
import { toast } from "sonner";

export function ActiveRidePage() {
  const { rides } = useApp();
  const navigate = useNavigate();
  const [sosDialogOpen, setSosDialogOpen] = useState(false);
  const [deviationAlert, setDeviationAlert] = useState(false);
  const [rideEnded, setRideEnded] = useState(false);
  const [etaSeconds, setEtaSeconds] = useState(720);

  const activeRide = rides.find((r) => r.status === "active") || rides[0];

  useEffect(() => {
    if (rideEnded) return;
    const interval = setInterval(() => {
      setEtaSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [rideEnded]);

  const formatETA = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSOS = () => {
    setSosDialogOpen(true);
    toast.error("SOS Alert sent to Campus Security!");
  };

  const handleDeviation = () => {
    setDeviationAlert(true);
    toast.warning("Route deviation detected! Driver notified.");
    setTimeout(() => setDeviationAlert(false), 5000);
  };

  const handleEndRide = () => {
    setRideEnded(true);
    toast.success("Ride ended. Please rate your driver!");
    setTimeout(() => navigate({ to: "/trip" }), 1500);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col bg-background overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background z-10">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </Badge>
          <div>
            <p className="text-xs font-semibold text-foreground">{activeRide.startLocation} → {activeRide.destination}</p>
            <p className="text-[10px] text-muted-foreground">{activeRide.driverName} · {activeRide.vehicleModel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
            deviationAlert
              ? "bg-destructive/10 border border-destructive/30"
              : "bg-accent"
          }`}>
            {deviationAlert ? (
              <AlertTriangle className="w-3.5 h-3.5 text-destructive animate-pulse" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-primary" />
            )}
            <span className={`text-sm font-mono-data font-bold ${deviationAlert ? "text-destructive" : "text-foreground"}`}>
              {rideEnded ? "00:00" : formatETA(etaSeconds)}
            </span>
          </div>
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>

      {deviationAlert && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-destructive/10 border-b border-destructive/20 animate-in slide-in-from-top">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-sm text-destructive font-medium">
            Route deviation detected! Driver is 0.8km off the expected route.
          </p>
        </div>
      )}

      <div className="flex-1 relative">
        <MockMap showPickupRequest={false} className="absolute inset-0 rounded-none" />

        <div className="absolute top-3 left-3 z-10 space-y-2">
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded-xl p-3 w-44">
            <div className="flex items-center gap-2 mb-1.5">
              <Car className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">{activeRide.driverName}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{activeRide.startLocation}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>{activeRide.destination}</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-border flex justify-between">
              <span className="text-[10px] text-muted-foreground">ETA</span>
              <span className="text-[10px] font-mono-data font-bold text-primary">{formatETA(etaSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-background border-t border-border space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="h-12 flex-col gap-1 text-[10px] font-medium border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={handleSOS}
          >
            <Siren className="w-5 h-5" />
            SOS
          </Button>

          <Button
            variant="outline"
            className="h-12 flex-col gap-1 text-[10px] font-medium border-amber-300 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20"
            onClick={handleDeviation}
          >
            <Flag className="w-5 h-5" />
            Sim Deviation
          </Button>

          <Button
            className="h-12 flex-col gap-1 text-[10px] font-medium bg-green-600 hover:bg-green-700"
            onClick={handleEndRide}
            disabled={rideEnded}
          >
            {rideEnded ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Ended
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                End Ride
              </>
            )}
          </Button>
        </div>

        <p className="text-[10px] text-center text-muted-foreground">
          "Sim Deviation" triggers route alert for demo purposes
        </p>
      </div>

      <Dialog open={sosDialogOpen} onOpenChange={setSosDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Siren className="w-5 h-5 animate-pulse" />
              SOS Alert Sent!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm font-semibold text-foreground">Campus Security Notified</p>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="font-mono-data">12.9352° N, 77.6245° E</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>Alert sent at {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-3 h-3 shrink-0" />
                  <span>{activeRide.vehicleModel} · {activeRide.licensePlate}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Campus security is on their way. Stay calm and stay visible.
              Your emergency contact has been notified.
            </p>

            <Button
              className="w-full bg-destructive hover:bg-destructive/90"
              onClick={() => setSosDialogOpen(false)}
            >
              I'm Safe — Dismiss Alert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
