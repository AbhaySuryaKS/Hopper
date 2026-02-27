import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Edit2,
  Car,
  Shield,
  Award,
  ThumbsUp,
  TrendingUp,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";

const badges = [
  { id: "safe", icon: Shield, label: "Safe Driver", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30" },
  { id: "top", icon: Star, label: "Top Rated", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/30" },
  { id: "consistent", icon: TrendingUp, label: "Consistent", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30" },
  { id: "community", icon: ThumbsUp, label: "Community Fav", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/30" },
];

export function ProfilePage() {
  const { currentUser, ratings } = useApp();
  const [editingVehicle, setEditingVehicle] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [vehicleModel, setVehicleModel] = useState(currentUser?.vehicleModel || "Honda City");
  const [licensePlate, setLicensePlate] = useState(currentUser?.licensePlate || "KA-04-GH-7890");
  const [displayName, setDisplayName] = useState(currentUser?.name || "Meera Patel");

  if (!currentUser) return null;

  const avgRating =
    ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length : 0;

  const handleSaveVehicle = () => {
    setEditingVehicle(false);
    toast.success("Vehicle details updated!");
  };

  const handleSaveName = () => {
    setEditingName(false);
    toast.success("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">My Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your driver profile and reputation</p>
        </div>

        <Card className="border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-background shadow-glow">
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-2xl">
                    {displayName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-background" />
              </div>

              <div className="flex-1 min-w-0">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="h-8 text-sm font-semibold"
                    />
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSaveName}>
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingName(false)}>
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-foreground truncate">{displayName}</h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 shrink-0"
                      onClick={() => setEditingName(true)}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                    />
                  ))}
                  <span className="text-sm font-mono-data ml-1 font-semibold text-foreground">
                    {avgRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Rides", value: "47", icon: Car },
                { label: "Rating", value: avgRating.toFixed(1), icon: Star },
                { label: "This Month", value: "12", icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center p-3 bg-accent rounded-xl">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                  <p className="text-lg font-mono-data font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Car className="w-4 h-4 text-primary" />
              Vehicle Details
            </CardTitle>
            {!editingVehicle && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs gap-1"
                onClick={() => setEditingVehicle(true)}
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {editingVehicle ? (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs">Vehicle Model</Label>
                  <Input
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">License Plate</Label>
                  <Input
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="h-10 text-sm font-mono-data"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 h-9 text-sm" onClick={handleSaveVehicle}>
                    Save Changes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-9 text-sm"
                    onClick={() => setEditingVehicle(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Model</span>
                  <span className="text-sm font-semibold text-foreground">{vehicleModel}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">License Plate</span>
                  <span className="text-sm font-mono-data font-bold text-foreground bg-accent px-2 py-0.5 rounded">
                    {licensePlate}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Badges & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2">
              {badges.map(({ id, icon: Icon, label, color, bg }) => (
                <div
                  key={id}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border ${bg}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${color}`} />
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Rating History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-0">
            {ratings.map((rating, idx) => (
              <div key={rating.id}>
                <div className="py-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{rating.fromUserName}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${s <= rating.stars ? "fill-amber-400 text-amber-400" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{rating.reviewText}</p>
                </div>
                {idx < ratings.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Trust Score</p>
                  <p className="text-xs text-muted-foreground">Based on {ratings.length} ratings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-mono-data text-primary">{currentUser.trustScore.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">out of 5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
