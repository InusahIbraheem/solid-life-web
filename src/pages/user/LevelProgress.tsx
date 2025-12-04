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
  Trophy,
  Crown,
  Zap,
} from "lucide-react";

const LevelProgress = () => {
  const currentLevel = {
    name: "Emerald",
    level: 2,
    icon: Star,
    color: "text-success",
    bgColor: "bg-success/10",
    progress: 45,
    currentPoints: 6750,
    requiredPoints: 15000,
  };

  const levels = [
    { name: "Junior", level: 1, points: 0, icon: Award, unlocked: true, bonus: "Base bonuses" },
    { name: "Emerald", level: 2, points: 5000, icon: Star, unlocked: true, bonus: "5% Achievement" },
    { name: "Gold", level: 3, points: 15000, icon: Award, unlocked: false, bonus: "4% Achievement" },
    { name: "Diamond 1", level: 4, points: 50000, icon: Crown, unlocked: false, bonus: "3% Achievement + Car Fund" },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Sale",
      description: "Made your first product sale",
      icon: Target,
      earned: true,
      date: "2024-01-15",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 2,
      title: "10 Referrals",
      description: "Recruited 10 direct referrals",
      icon: Users,
      earned: true,
      date: "2024-01-28",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 3,
      title: "₦100K Earned",
      description: "Earned ₦100,000 in commissions",
      icon: TrendingUp,
      earned: true,
      date: "2024-02-10",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: 4,
      title: "Emerald Rank",
      description: "Reached Emerald level status",
      icon: Star,
      earned: true,
      date: "2024-02-15",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 5,
      title: "Gold Rank",
      description: "Reach Gold level status",
      icon: Award,
      earned: false,
      date: null,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
    {
      id: 6,
      title: "Diamond 1",
      description: "Reach Diamond 1 status + Car Fund",
      icon: Crown,
      earned: false,
      date: null,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ];

  const bonuses = [
    { label: "Retail Profit", value: "20%", active: true, description: "Profit on product sales" },
    { label: "Sponsor Bonus", value: "33%", active: true, description: "Bonus for direct sponsorship" },
    { label: "Personal Purchase Bonus", value: "10%", active: true, description: "On your own purchases" },
    { label: "1st Level Bonus", value: "7%", active: true, description: "Commission from Level 1" },
    { label: "2nd Level Bonus", value: "5%", active: true, description: "Commission from Level 2" },
    { label: "3rd Level Bonus", value: "3%", active: true, description: "Commission from Level 3" },
    { label: "Achievement Bonus", value: "5%", active: true, description: "Based on ₦420 per PV" },
    { label: "Emerald Achievement", value: "5%", active: true, description: "Emerald rank bonus" },
    { label: "Gold Achievement", value: "4%", active: false, description: "Requires Gold rank" },
    { label: "Diamond 1 Achievement", value: "3%", active: false, description: "Requires Diamond 1 rank" },
  ];

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
                <currentLevel.icon className="w-10 h-10 text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{currentLevel.name} Rank</h2>
                  <Badge className="bg-success text-success-foreground">
                    Level {currentLevel.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  {currentLevel.currentPoints.toLocaleString()} / {currentLevel.requiredPoints.toLocaleString()} PV
                </p>
                <Progress value={currentLevel.progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {currentLevel.progress}% progress to Gold rank
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">23</div>
                <div className="text-sm text-muted-foreground">Direct Referrals</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">156</div>
                <div className="text-sm text-muted-foreground">Total Network</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">₦450K</div>
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
              {levels.map((level, index) => (
                <div
                  key={level.level}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    level.unlocked
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/30 opacity-60"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      level.unlocked ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    <level.icon
                      className={`w-8 h-8 ${
                        level.unlocked ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{level.name}</h3>
                      {level.unlocked && (
                        <Badge className="bg-success text-success-foreground">
                          Unlocked
                        </Badge>
                      )}
                      {!level.unlocked && index === levels.findIndex((l) => !l.unlocked) && (
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
                  </div>
                  {index < levels.length - 1 && (
                    <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center text-muted-foreground">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Achievements & Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`overflow-hidden ${
                    achievement.earned
                      ? "border-2 border-primary/20 shadow-soft"
                      : "opacity-60"
                  }`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-3">
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <div className="text-center">
                        <Badge className="bg-success text-success-foreground">
                          Earned {achievement.date}
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Badge variant="outline" className="text-muted-foreground">
                          Locked
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
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
