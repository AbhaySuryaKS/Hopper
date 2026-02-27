import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  RefreshCw,
  Car,
  Star,
  MapPin,
  Music,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const subjectColors: Record<string, string> = {
  "Data Structures": "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/30",
  "OS Lab": "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/30",
  "Networks": "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/30",
  "Algorithms": "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30",
  "DBMS": "bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800/30",
  "Project": "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/30",
  "Seminar": "bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800/30",
};

const suggestedRides = [
  {
    day: "Mon",
    forClass: "9:00 AM Data Structures",
    driverName: "Rahul M.",
    trustScore: 4.8,
    from: "HSR Layout",
    to: "IIT Campus",
    time: "8:00 AM",
    vibe: "Music",
    price: "₹15",
  },
  {
    day: "Tue",
    forClass: "11:00 AM Networks",
    driverName: "Ananya K.",
    trustScore: 4.9,
    from: "Koramangala",
    to: "IIT Campus",
    time: "10:15 AM",
    vibe: "Silent",
    price: "₹15",
  },
  {
    day: "Wed",
    forClass: "9:00 AM Data Structures",
    driverName: "Vikram S.",
    trustScore: 4.6,
    from: "BTM Layout",
    to: "IIT Campus",
    time: "7:45 AM",
    vibe: "Networking",
    price: "₹15",
  },
];

export function TimetablePage() {
  const { timetable } = useApp();
  const navigate = useNavigate();
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSynced(true);
    setSyncing(false);
    toast.success("Timetable synced! Rides suggested for your classes.");
  };

  const getClassesForDay = (day: string) =>
    timetable.filter((entry) => entry.day === day);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Timetable Sync</h1>
            <p className="text-sm text-muted-foreground">Auto-match rides to your class schedule</p>
          </div>
          <Button
            onClick={handleSync}
            disabled={syncing}
            className="gap-2 shrink-0"
          >
            {syncing ? (
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <RefreshCw className={`w-4 h-4 ${synced ? "text-green-400" : ""}`} />
            )}
            {syncing ? "Syncing..." : synced ? "Synced ✓" : "Sync Timetable"}
          </Button>
        </div>

        <Card className="border-border overflow-hidden">
          <CardHeader className="p-4 pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-border">
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        className="p-3 text-xs font-semibold text-muted-foreground text-center"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {DAYS.map((day) => {
                      const classes = getClassesForDay(day);
                      return (
                        <td key={day} className="p-2 align-top border-r border-border last:border-r-0">
                          <div className="space-y-1.5 min-h-[80px]">
                            {classes.map((cls) => {
                              const colorClass = subjectColors[cls.subject] || "bg-muted text-foreground border-border";
                              return (
                                <div
                                  key={`${cls.day}-${cls.time}`}
                                  className={`p-2 rounded-lg border text-[10px] leading-tight ${colorClass}`}
                                >
                                  <div className="flex items-center gap-1 mb-0.5">
                                    <Clock className="w-2.5 h-2.5 shrink-0" />
                                    <span className="font-mono-data font-semibold">{cls.time}</span>
                                  </div>
                                  <p className="font-medium truncate">{cls.subject}</p>
                                </div>
                              );
                            })}
                            {classes.length === 0 && (
                              <div className="h-16 rounded-lg border border-dashed border-border flex items-center justify-center">
                                <span className="text-[10px] text-muted-foreground">Free</span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Car className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Auto-Suggested Rides</h2>
            <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
              AI Matched
            </Badge>
          </div>

          {!synced && (
            <div className="text-center py-10 space-y-3 bg-accent/50 rounded-2xl border border-dashed border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Sync your timetable first</p>
              <p className="text-xs text-muted-foreground">We'll find the best rides for your class times</p>
              <Button size="sm" onClick={handleSync} className="gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Sync Now
              </Button>
            </div>
          )}

          {synced && (
            <div className="space-y-3">
              {suggestedRides.map((ride) => (
                <Card
                  key={`${ride.day}-${ride.forClass}`}
                  className="border-border hover:border-primary/30 transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                            {ride.day}
                          </Badge>
                          <span className="text-xs text-muted-foreground">for {ride.forClass}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">
                              {ride.driverName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{ride.driverName}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              <span className="text-[10px] text-muted-foreground font-mono-data">{ride.trustScore}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{ride.from} → {ride.to}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span className="font-mono-data">{ride.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Music className="w-3 h-3" />
                            <span>{ride.vibe}</span>
                          </div>
                          <span className="font-mono-data font-semibold text-primary">{ride.price}</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="h-8 text-xs gap-1 shrink-0"
                        onClick={() => {
                          toast.success(`Booked ride for ${ride.forClass}!`);
                          navigate({ to: "/trip" });
                        }}
                      >
                        Book
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
