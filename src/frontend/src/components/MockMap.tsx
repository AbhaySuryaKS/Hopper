import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, MapPin, Plus, Minus, Navigation, Car } from "lucide-react";

interface MockMapProps {
  showPickupRequest?: boolean;
  className?: string;
  compact?: boolean;
}

const stops = [
  { id: 1, x: "18%", y: "72%", label: "BTM Layout" },
  { id: 2, x: "32%", y: "55%", label: "Silk Board" },
  { id: 3, x: "52%", y: "42%", label: "Koramangala" },
  { id: 4, x: "72%", y: "28%", label: "HSR Layout" },
];

export function MockMap({ showPickupRequest = true, className = "", compact = false }: MockMapProps) {
  const [pickupDismissed, setPickupDismissed] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => setPickupDismissed(true), 1500);
  };

  const handleDecline = () => {
    setAccepted(false);
    setTimeout(() => setPickupDismissed(true), 1000);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden map-bg rounded-lg ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bengaluru route map"
        role="img"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1="0" y1="25" x2="100" y2="25" stroke="oklch(0.28 0.02 255)" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="oklch(0.28 0.02 255)" strokeWidth="0.3" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="oklch(0.28 0.02 255)" strokeWidth="0.3" />
        <line x1="25" y1="0" x2="25" y2="100" stroke="oklch(0.28 0.02 255)" strokeWidth="0.3" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="oklch(0.28 0.02 255)" strokeWidth="0.3" />
        <line x1="75" y1="0" x2="75" y2="100" stroke="oklch(0.28 0.02 255)" strokeWidth="0.3" />

        <path
          d="M 10 85 Q 20 78 28 72 Q 38 64 42 55 Q 48 44 52 42 Q 60 38 68 30 Q 76 22 85 16"
          fill="none"
          stroke="oklch(0.42 0.08 255 / 0.4)"
          strokeWidth="2.5"
        />
        <path
          d="M 8 82 Q 18 75 25 68 Q 35 60 40 52 Q 46 42 50 40 Q 58 36 66 28 Q 74 20 83 14"
          fill="none"
          stroke="oklch(0.42 0.08 255 / 0.3)"
          strokeWidth="1.5"
        />

        <path
          d="M 10 85 Q 20 78 28 72 Q 38 64 42 55 Q 48 44 52 42 Q 60 38 68 30 Q 76 22 85 16"
          fill="none"
          stroke="oklch(0.62 0.2 195)"
          strokeWidth="0.8"
          filter="url(#glowStrong)"
          strokeDasharray="2 0"
        />

        <path
          d="M 10 85 Q 20 78 28 72 Q 38 64 42 55 Q 48 44 52 42 Q 60 38 68 30 Q 76 22 85 16"
          fill="none"
          stroke="oklch(0.75 0.18 195)"
          strokeWidth="0.5"
        />
      </svg>

      {stops.map((stop) => (
        <div
          key={stop.id}
          className="absolute z-10 flex flex-col items-center"
          style={{ left: stop.x, top: stop.y, transform: "translate(-50%, -50%)" }}
        >
          <div className="animate-bounce">
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg" />
          </div>
          {!compact && (
            <span className="mt-1 text-[9px] font-medium text-primary/80 bg-background/80 px-1.5 py-0.5 rounded whitespace-nowrap backdrop-blur-sm">
              {stop.label}
            </span>
          )}
        </div>
      ))}

      <div
        className="absolute z-10 animate-pulse"
        style={{ left: "52%", top: "42%", transform: "translate(-50%, -50%)" }}
      >
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary flex items-center justify-center shadow-glow">
          <Car className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-background" />
      </div>

      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 text-[9px] text-muted-foreground z-10">
        <span className="bg-background/60 px-2 py-0.5 rounded backdrop-blur-sm">Bengaluru South</span>
        <span className="bg-background/60 px-2 py-0.5 rounded backdrop-blur-sm">IIT Campus → HSR</span>
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10">
        <button type="button" className="w-7 h-7 rounded bg-background/80 border border-border flex items-center justify-center hover:bg-background backdrop-blur-sm transition-colors">
          <Plus className="w-3 h-3 text-foreground" />
        </button>
        <button type="button" className="w-7 h-7 rounded bg-background/80 border border-border flex items-center justify-center hover:bg-background backdrop-blur-sm transition-colors">
          <Minus className="w-3 h-3 text-foreground" />
        </button>
        <button type="button" className="w-7 h-7 rounded bg-background/80 border border-border flex items-center justify-center hover:bg-background backdrop-blur-sm transition-colors mt-1">
          <Navigation className="w-3 h-3 text-primary" />
        </button>
      </div>

      {showPickupRequest && !pickupDismissed && (
        <div className="absolute top-3 right-12 z-20 w-52 bg-background/95 backdrop-blur-md border border-border rounded-xl p-3 shadow-glow-lg transition-all duration-300">
          {accepted === null ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-foreground">Incoming Pickup Request</span>
              </div>
              <div className="flex items-center gap-2 mb-2.5">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-primary/20 text-primary text-[9px] font-bold">PS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold text-foreground">Priya S.</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-muted-foreground" />
                    <p className="text-[9px] text-muted-foreground">Silk Board</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  className="flex-1 h-7 text-[10px] bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleAccept}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-7 text-[10px] border-destructive text-destructive hover:bg-destructive/10"
                  onClick={handleDecline}
                >
                  <X className="w-3 h-3 mr-1" />
                  Decline
                </Button>
              </div>
            </>
          ) : (
            <div className={`flex items-center gap-2 py-1 ${accepted ? "text-green-500" : "text-destructive"}`}>
              {accepted ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              <span className="text-xs font-medium">{accepted ? "Request Accepted!" : "Request Declined"}</span>
            </div>
          )}
        </div>
      )}

      <Badge
        variant="outline"
        className="absolute bottom-3 right-3 text-[9px] bg-background/80 backdrop-blur-sm border-primary/30 text-primary z-10"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1" />
        Live Tracking
      </Badge>
    </div>
  );
}
