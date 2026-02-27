import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
  Zap,
  Check,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "per-ride",
    name: "Pay-Per-Ride",
    price: "₹15",
    per: "per ride",
    badge: "Current Plan",
    badgeClass: "bg-muted text-muted-foreground border-border",
    highlight: false,
    features: ["No commitment", "Pay as you go", "All routes", "Basic support"],
    buttonVariant: "outline" as const,
  },
  {
    id: "eco-monthly",
    name: "Eco-Rider Monthly",
    price: "₹299",
    per: "per month",
    badge: "Best Value",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    highlight: true,
    features: ["Unlimited rides", "Priority matching", "All routes", "24/7 support", "₹0.10/km savings"],
    buttonVariant: "default" as const,
  },
  {
    id: "exam-week",
    name: "Exam Week Pass",
    price: "₹149",
    per: "per week",
    badge: "Exam Season",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    highlight: false,
    features: ["7-day access", "Early AM rides", "Campus routes", "Exam schedule sync"],
    buttonVariant: "outline" as const,
  },
];

export function WalletPage() {
  const { currentUser, transactions } = useApp();
  const balance = currentUser?.walletBalance ?? 340;

  const totalCredits = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Wallet</h1>
          <p className="text-sm text-muted-foreground">Manage your ride credits and plans</p>
        </div>

        <Card className="border-border overflow-hidden">
          <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-background p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Available Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono-data text-foreground">₹{balance}</span>
                  <span className="text-sm text-muted-foreground">credits</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-green-600 mb-1">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Earned</span>
                </div>
                <span className="font-mono-data font-bold text-foreground">₹{totalCredits}</span>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-destructive mb-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Spent</span>
                </div>
                <span className="font-mono-data font-bold text-foreground">₹{totalDebits}</span>
              </div>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Subscription Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`border transition-all duration-200 ${
                  plan.highlight
                    ? "border-primary/40 shadow-glow bg-primary/[0.02]"
                    : "border-border hover:border-primary/20"
                }`}
              >
                <CardHeader className="p-4 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-semibold text-foreground">{plan.name}</CardTitle>
                    <Badge variant="outline" className={`text-[10px] shrink-0 ${plan.badgeClass}`}>
                      {plan.badge}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold font-mono-data text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.per}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <ul className="space-y-1.5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className={`w-3 h-3 shrink-0 ${plan.highlight ? "text-primary" : "text-green-500"}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full h-9 text-xs font-medium ${plan.highlight ? "shadow-glow" : ""}`}
                    onClick={() => toast.success(`Switched to ${plan.name}!`)}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Transaction History
          </h2>
          <Card className="border-border">
            <CardContent className="p-0">
              {transactions.map((tx, idx) => (
                <div key={tx.id}>
                  <div className="flex items-center gap-3 p-4">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === "credit"
                          ? "bg-green-100 dark:bg-green-950/30"
                          : "bg-red-100 dark:bg-red-950/30"
                      }`}
                    >
                      {tx.type === "credit" ? (
                        <ArrowDownLeft className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`font-mono-data font-semibold text-sm ${
                          tx.type === "credit" ? "text-green-600" : "text-destructive"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                      </span>
                    </div>
                  </div>
                  {idx < transactions.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-primary/[0.02]">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Add Credits</p>
                <p className="text-xs text-muted-foreground">Top up your wallet</p>
              </div>
            </div>
            <Button size="sm" onClick={() => toast.info("Payment gateway coming soon!")}>
              Add Money
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
