import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Heart,
  UserPlus,
  Send,
  Car,
  Navigation,
  Info,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  from: "me" | "driver";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  { id: "1", from: "driver", text: "Hi! I'm on my way to Silk Board pickup.", time: "7:52 AM" },
  { id: "2", from: "me", text: "Great! I'll be at the bus stop.", time: "7:53 AM" },
  { id: "3", from: "driver", text: "ETA 8 minutes. White Honda City.", time: "7:54 AM" },
];

export function TripDashboardPage() {
  const { rides } = useApp();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const activeRide = rides.find((r) => r.status === "active") || rides[0];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), from: "me", text: newMessage.trim(), time: "Now" },
    ]);
    setNewMessage("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), from: "driver", text: "Got it, see you soon!", time: "Now" },
      ]);
    }, 1000);
  };

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toast.success(isFavorite ? "Removed from favorites" : `${activeRide.driverName} saved to favorites!`);
  };

  const handleFriend = () => {
    setIsFriend((prev) => !prev);
    toast.success(isFriend ? "Friend request cancelled" : "Friend request sent!");
  };

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Trip Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your current ride details</p>
        </div>

        <Card className="border-border overflow-hidden">
          <div className="bg-primary/5 border-b border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active Ride
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span className="font-mono-data">ETA: 12 min</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/15 text-primary font-bold text-lg">
                  {activeRide.driverName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">{activeRide.driverName}</p>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= Math.round(activeRide.driverTrustScore) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1 font-mono-data">{activeRide.driverTrustScore}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Car className="w-3 h-3" />
                  <span>{activeRide.vehicleModel}</span>
                  <span className="font-mono-data bg-accent px-1.5 py-0.5 rounded text-foreground">{activeRide.licensePlate}</span>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div>
                  <span className="text-foreground font-medium">{activeRide.startLocation}</span>
                  <span className="text-muted-foreground ml-2 text-xs">Pickup</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="ml-[3px] flex flex-col gap-0.5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="w-px h-2 bg-border ml-[0.5px]" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <div>
                  <span className="text-foreground font-medium">{activeRide.destination}</span>
                  <span className="text-muted-foreground ml-2 text-xs">Drop-off</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-accent rounded-xl">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">ETA</p>
                <p className="text-sm font-mono-data font-bold text-foreground">12 min</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-[10px] text-muted-foreground">Distance</p>
                <p className="text-sm font-mono-data font-bold text-foreground">8.4 km</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Fare</p>
                <p className="text-sm font-mono-data font-bold text-primary">₹15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground">Communication & Social</p>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">
                {activeRide.driverName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{activeRide.driverName}</p>
              <p className="text-xs text-muted-foreground">{activeRide.vehicleModel}</p>
            </div>

            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => toast.info("Calling driver...")}
              >
                <Phone className="w-4 h-4 text-green-600" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setChatOpen(true)}
              >
                <MessageCircle className="w-4 h-4 text-primary" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-9 w-9 rounded-full transition-all duration-200 ${isFavorite ? "border-pink-300 bg-pink-50 dark:bg-pink-950/20" : ""}`}
                onClick={handleFavorite}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-200 ${isFavorite ? "fill-pink-500 text-pink-500" : "text-muted-foreground"}`}
                />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-9 w-9 rounded-full transition-all duration-200 ${isFriend ? "border-primary/30 bg-primary/5" : ""}`}
                onClick={handleFriend}
              >
                <UserPlus className={`w-4 h-4 ${isFriend ? "text-primary" : "text-muted-foreground"}`} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button
              variant="outline"
              className="h-10 gap-2 text-sm"
              onClick={() => setChatOpen(true)}
            >
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </Button>
            <Button
              variant="outline"
              className="h-10 gap-2 text-sm"
              onClick={() => toast.info("Opening navigation...")}
            >
              <Navigation className="w-4 h-4" />
              Track Route
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent side="right" className="w-full sm:w-80 p-0 flex flex-col">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">
                  {activeRide.driverName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-sm">Chat with {activeRide.driverName}</SheetTitle>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Unlocked after approval
                </p>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                      msg.from === "me"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-accent text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-0.5 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 border-t border-border flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 h-10 text-sm"
            />
            <Button size="icon" className="h-10 w-10 shrink-0" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
