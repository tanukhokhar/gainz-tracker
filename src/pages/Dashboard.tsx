import { StatsCard } from "@/components/StatsCard";
import { GoalTracker } from "@/components/GoalTracker";
import { WorkoutCharts } from "@/components/WorkoutCharts";
import { Dumbbell, Clock, Zap, TrendingUp, Calendar } from "lucide-react";
import { Workout } from "@/components/WorkoutCard";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

interface DashboardProps {
  workouts: Workout[];
}

export const Dashboard = ({ workouts }: DashboardProps) => {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Calculate stats
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  
  const weeklyWorkouts = workouts.filter(workout => 
    isWithinInterval(workout.date, { start: weekStart, end: weekEnd })
  );
  const weeklyDuration = weeklyWorkouts.reduce((sum, w) => sum + w.duration, 0);

  const monthlyWorkouts = workouts.filter(workout => 
    isWithinInterval(workout.date, { start: monthStart, end: monthEnd })
  );

  return (
    <div className="space-y-6">
      {/* Goal Tracker */}
      <GoalTracker workouts={workouts} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Workouts"
          value={totalWorkouts}
          subtitle="All time"
          icon={Dumbbell}
          gradient
        />
        <StatsCard
          title="Total Duration"
          value={`${Math.round(totalDuration / 60)}h`}
          subtitle={`${totalDuration} minutes`}
          icon={Clock}
        />
        <StatsCard
          title="Total Calories"
          value={totalCalories.toLocaleString()}
          subtitle="Burned all time"
          icon={Zap}
        />
        <StatsCard
          title="This Week"
          value={weeklyWorkouts.length}
          subtitle={`${weeklyDuration} minutes`}
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Progress Analytics</h2>
        <WorkoutCharts workouts={workouts} />
      </div>
    </div>
  );
};