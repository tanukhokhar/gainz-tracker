import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Zap } from "lucide-react";
import { Workout } from "./WorkoutCard";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

interface GoalTrackerProps {
  workouts: Workout[];
}

export const GoalTracker = ({ workouts }: GoalTrackerProps) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  
  const weeklyWorkouts = workouts.filter(workout => 
    isWithinInterval(workout.date, { start: weekStart, end: weekEnd })
  );

  // Weekly goals
  const weeklyGoals = {
    workouts: { target: 5, current: weeklyWorkouts.length },
    duration: { target: 300, current: weeklyWorkouts.reduce((sum, w) => sum + w.duration, 0) },
    calories: { target: 2000, current: weeklyWorkouts.reduce((sum, w) => sum + w.calories, 0) },
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-primary";
  };

  const isGoalAchieved = (current: number, target: number) => current >= target;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Weekly Goals</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Workouts Goal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Workouts</span>
              </div>
              {isGoalAchieved(weeklyGoals.workouts.current, weeklyGoals.workouts.target) && (
                <Badge className="bg-success/10 text-success">Achieved!</Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{weeklyGoals.workouts.current} / {weeklyGoals.workouts.target}</span>
                <span className={getProgressColor(getProgressPercentage(weeklyGoals.workouts.current, weeklyGoals.workouts.target))}>
                  {Math.round(getProgressPercentage(weeklyGoals.workouts.current, weeklyGoals.workouts.target))}%
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(weeklyGoals.workouts.current, weeklyGoals.workouts.target)} 
                className="h-2"
              />
            </div>
          </div>

          {/* Duration Goal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Duration (min)</span>
              </div>
              {isGoalAchieved(weeklyGoals.duration.current, weeklyGoals.duration.target) && (
                <Badge className="bg-success/10 text-success">Achieved!</Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{weeklyGoals.duration.current} / {weeklyGoals.duration.target}</span>
                <span className={getProgressColor(getProgressPercentage(weeklyGoals.duration.current, weeklyGoals.duration.target))}>
                  {Math.round(getProgressPercentage(weeklyGoals.duration.current, weeklyGoals.duration.target))}%
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(weeklyGoals.duration.current, weeklyGoals.duration.target)} 
                className="h-2"
              />
            </div>
          </div>

          {/* Calories Goal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Calories</span>
              </div>
              {isGoalAchieved(weeklyGoals.calories.current, weeklyGoals.calories.target) && (
                <Badge className="bg-success/10 text-success">Achieved!</Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{weeklyGoals.calories.current} / {weeklyGoals.calories.target}</span>
                <span className={getProgressColor(getProgressPercentage(weeklyGoals.calories.current, weeklyGoals.calories.target))}>
                  {Math.round(getProgressPercentage(weeklyGoals.calories.current, weeklyGoals.calories.target))}%
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(weeklyGoals.calories.current, weeklyGoals.calories.target)} 
                className="h-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};