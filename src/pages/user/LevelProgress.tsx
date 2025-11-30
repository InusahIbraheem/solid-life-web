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
    name: "Gold",
    level: 5,
    icon: Award,
    color: "text-warning",
    bgColor: "bg-warning/10",
    progress: 65,
    currentPoints: 6500,
    requiredPoints: 10000,
  };

  const levels = [
    { name: "Bronze", level: 1, points: 0, icon: Award, unlocked: true },
    { name: "Silver", level: 2, points: 1000, icon: Star, unlocked: true },
    { name: "Gold", level: 3, points: 2500, icon: Award, unlocked: true },
    { name: "Platinum", level: 4, points: 5000, icon: Trophy, unlocked: true },
    { name: "Diamond", level: 5, points: 10000, icon: Crown, unlocked: true },
    { name: "Elite", level: 6, points: 20000, icon: Zap, unlocked: false },
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
      title: "Gold Level",
      description: "Reached Gold level status",
      icon: Award,
      earned: true,
      date: "2024-02-15",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      id: 5,
      title: "50 Referrals",
      description: "Recruited 50 direct referrals",
      icon: Users,
      earned: false,
      date: null,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
    {
      id: 6,
      title: "Diamond Level",
      description: "Reach Diamond level status",
      icon: Crown,
      earned: false,
      date: null,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ];

  const benefits = [
    { level: "Gold", benefit: "30% commission on Level 1", active: true },
    { level: "Gold", benefit: "Priority customer support", active: true },
    { level: "Gold", benefit: "Monthly bonus rewards", active: true },
    { level: "Diamond", benefit: "40% commission on Level 1", active: false },
    { level: "Diamond", benefit: "Exclusive training sessions", active: false },
    { level: "Diamond", benefit: "International trips", active: false },
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
              <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
                <currentLevel.icon className="w-10 h-10 text-warning" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{currentLevel.name} Level</h2>
                  <Badge className="bg-warning text-warning-foreground">
                    Level {currentLevel.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  {currentLevel.currentPoints.toLocaleString()} / {currentLevel.requiredPoints.toLocaleString()} points
                </p>
                <Progress value={currentLevel.progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {currentLevel.progress}% progress to Diamond level
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
            <CardTitle>Level Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    benefit.active
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      benefit.active
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {benefit.active ? "✓" : "🔒"}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{benefit.benefit}</div>
                    <div className="text-sm text-muted-foreground">
                      {benefit.level} level benefit
                    </div>
                  </div>
                  {benefit.active ? (
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default LevelProgress;
