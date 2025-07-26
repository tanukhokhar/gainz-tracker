import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Clock, Zap, Calendar } from "lucide-react";
import { format } from "date-fns";

export interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

export const WorkoutCard = ({ workout, onEdit, onDelete }: WorkoutCardProps) => {
  const getWorkoutColor = (type: string) => {
    const colors: Record<string, string> = {
      'Running': 'bg-red-500/10 text-red-700 dark:text-red-400',
      'Cycling': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      'Gym': 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      'Yoga': 'bg-green-500/10 text-green-700 dark:text-green-400',
      'Swimming': 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
      'Walking': 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    };
    return colors[type] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Badge className={getWorkoutColor(workout.type)}>
              {workout.type}
            </Badge>
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(workout)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(workout.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span>{workout.calories} cal</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(workout.date, 'MMM dd')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};