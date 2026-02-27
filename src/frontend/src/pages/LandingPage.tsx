import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Car, ArrowRight, Shield, Users, Clock, Star, MapPin } from "lucide-react";
import { toast } from "sonner";

export function LandingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginAsDemo } = useApp();
  const navigate = useNavigate();

  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.(edu|ac\.in)$/.test(e) || e.endsWith(".edu") || e.includes(".ac.in");

  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      toast.error("Please use your college email (.edu or .ac.in)");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(email);
    navigate({ to: "/dashboard" });
    setLoading(false);
  };

  const handleDemo = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    loginAsDemo();
    navigate({ to: "/dashboard" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-20 lg:max-w-[52%]">
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Hopper</span>
          </div>

          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs">
            <Shield className="w-3 h-3 mr-1" />
            Student-Verified Platform
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
            Campus rides,
            <br />
            <span className="text-primary">student-verified</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Share rides with your college community. Safe, affordable, and perfectly timed for your campus schedule.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 max-w-md shadow-xs">
          <h2 className="font-semibold text-foreground mb-1">Sign in with your college email</h2>
          <p className="text-sm text-muted-foreground mb-5">We accept .edu and .ac.in domains only</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">College Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="h-11"
              />
            </div>

            <Button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full h-11 font-semibold"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              Sign In
            </Button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Button
              variant="outline"
              onClick={handleDemo}
              disabled={loading}
              className="w-full h-11 font-medium"
            >
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Continue as Demo User
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-8">
          {[
            { icon: Users, label: "4,200+ students" },
            { icon: Clock, label: "Save 2hrs/week" },
            { icon: MapPin, label: "Bengaluru wide" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-muted/30 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 map-bg opacity-60" />

        <div className="relative z-10 w-full h-full p-8 flex flex-col gap-4 items-start justify-center">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Route preview map"
            role="img"
          >
            <defs>
              <filter id="glow-hero">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 10 85 Q 20 78 28 72 Q 38 64 42 55 Q 48 44 52 42 Q 60 38 68 30 Q 76 22 85 16"
              fill="none"
              stroke="oklch(0.42 0.08 255 / 0.3)"
              strokeWidth="3"
            />
            <path
              d="M 10 85 Q 20 78 28 72 Q 38 64 42 55 Q 48 44 52 42 Q 60 38 68 30 Q 76 22 85 16"
              fill="none"
              stroke="oklch(0.62 0.2 195)"
              strokeWidth="1"
              filter="url(#glow-hero)"
            />
          </svg>

          <div className="absolute top-12 right-12 bg-background/90 backdrop-blur-sm border border-border rounded-2xl p-4 w-56 shadow-glow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Car className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Ananya K.</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">4.9</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Koramangala</span>
              </div>
              <div className="w-px h-3 bg-border ml-[2.5px]" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>IIT Campus</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Silent</Badge>
              <span className="text-xs font-mono-data font-semibold text-primary">8:30 AM</span>
            </div>
          </div>

          <div className="absolute bottom-16 left-8 bg-background/90 backdrop-blur-sm border border-border rounded-xl p-3 w-44">
            <p className="text-[10px] text-muted-foreground mb-1">Today's rides saved</p>
            <p className="text-2xl font-bold font-mono-data text-foreground">₹45</p>
            <p className="text-[10px] text-green-500">↑ 3 campus rides</p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-glow">
              <Car className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
