import { useState, useEffect } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  TrendingUp,
  Users,
  Target,
  Star,
  Crown,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LevelProgress = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      setProfile(profileData);

      // Count referrals
      const { count } = await supabase
        .from("referrals")
        .select("*", { count: "exact", head: true })
        .eq("referrer_id", user?.id);

      setReferralCount(count || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load level progress");
    } finally {
      setLoading(false);
    }
  };

  const levels = [
    { name: "Junior", points: 0, icon: Award, bonus: "Base bonuses" },
    { name: "Emerald", points: 5000, icon: Star, bonus: "5% Achievement" },
    { name: "Gold", points: 15000, icon: Award, bonus: "4% Achievement" },
    { name: "Diamond 1", points: 50000, icon: Crown, bonus: "3% Achievement + Car Fund" },
  ];

  const currentLevel = profile?.level || "Junior";
  const currentPoints = profile?.points || 0;
  const currentLevelIndex = levels.findIndex(l => l.name === currentLevel);
  const nextLevel = levels[currentLevelIndex + 1];
  const progress = nextLevel 
    ? Math.min((currentPoints / nextLevel.points) * 100, 100) 
    : 100;

  const bonuses = [
    { label: "Retail Profit", value: "20%", active: true, description: "Profit on product sales" },
    { label: "Sponsor Bonus", value: "33%", active: true, description: "Bonus for direct sponsorship" },
    { label: "Personal Purchase Bonus", value: "10%", active: true, description: "On your own purchases" },
    { label: "1st Level Bonus", value: "7%", active: true, description: "Commission from Level 1" },
    { label: "2nd Level Bonus", value: "5%", active: true, description: "Commission from Level 2" },
    { label: "3rd Level Bonus", value: "3%", active: true, description: "Commission from Level 3" },
    { label: "Achievement Bonus", value: "5%", active: true, description: "Based on ₦420 per PV" },
    { label: "Emerald Achievement", value: "5%", active: currentLevel !== "Junior", description: "Emerald rank bonus" },
    { label: "Gold Achievement", value: "4%", active: currentLevel === "Gold" || currentLevel === "Diamond 1", description: "Requires Gold rank" },
    { label: "Diamond 1 Achievement", value: "3%", active: currentLevel === "Diamond 1", description: "Requires Diamond 1 rank" },
  ];

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Level Progress</h1>
          <p className="text-muted-foreground">Track your growth and unlock achievements</p>
        </div>

        <Card className="shadow-elevated border-2 border-warning/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center">
                <Star className="w-10 h-10 text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{currentLevel} Rank</h2>
                  <Badge className="bg-success text-success-foreground">
                    Active
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  {currentPoints.toLocaleString()} / {nextLevel?.points?.toLocaleString() || "Max"} PV
                </p>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {progress.toFixed(0)}% progress to {nextLevel?.name || "Max Level"}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{referralCount}</div>
                <div className="text-sm text-muted-foreground">Direct Referrals</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">{currentPoints}</div>
                <div className="text-sm text-muted-foreground">Total PV</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">
                  ₦{Number(profile?.total_earnings || 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>All Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {levels.map((level, index) => {
                const isUnlocked = index <= currentLevelIndex;
                const isNext = index === currentLevelIndex + 1;
                
                return (
                  <div
                    key={level.name}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                      isUnlocked
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-muted/30 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isUnlocked ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      <level.icon
                        className={`w-8 h-8 ${
                          isUnlocked ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">{level.name}</h3>
                        {isUnlocked && (
                          <Badge className="bg-success text-success-foreground">
                            Unlocked
                          </Badge>
                        )}
                        {isNext && (
                          <Badge variant="outline" className="border-primary text-primary">
                            Next Level
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {level.points > 0
                          ? `Requires ${level.points.toLocaleString()} points`
                          : "Starting level"}
                      </p>
                      <p className="text-sm text-primary">{level.bonus}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Your Bonus Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {bonuses.map((bonus, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    bonus.active
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      bonus.active
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {bonus.active ? "✓" : "🔒"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{bonus.label}</span>
                      <span className={`text-lg font-bold ${bonus.active ? "text-secondary" : "text-muted-foreground"}`}>
                        {bonus.value}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {bonus.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Note: Rank Achievement Bonus is based on ₦420 per PV
            </p>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default LevelProgress;
