import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Workout } from "./WorkoutCard";

interface WorkoutFormProps {
  workout?: Workout | null;
  onSubmit: (workout: Omit<Workout, 'id'>) => void;
  onCancel?: () => void;
}

const workoutTypes = [
  'Running',
  'Cycling', 
  'Gym',
  'Yoga',
  'Swimming',
  'Walking',
  'Boxing',
  'Dancing',
  'Hiking',
  'Other'
];

export const WorkoutForm = ({ workout, onSubmit, onCancel }: WorkoutFormProps) => {
  const [type, setType] = useState(workout?.type || '');
  const [duration, setDuration] = useState(workout?.duration?.toString() || '');
  const [calories, setCalories] = useState(workout?.calories?.toString() || '');
  const [date, setDate] = useState<Date>(workout?.date || new Date());

  useEffect(() => {
    if (workout) {
      setType(workout.type);
      setDuration(workout.duration.toString());
      setCalories(workout.calories.toString());
      setDate(workout.date);
    }
  }, [workout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !duration || !calories) return;

    onSubmit({
      type,
      duration: parseInt(duration),
      calories: parseInt(calories),
      date,
    });

    if (!workout) {
      // Reset form for new workout
      setType('');
      setDuration('');
      setCalories('');
      setDate(new Date());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-primary bg-clip-text text-transparent">
          {workout ? 'Edit Workout' : 'Add New Workout'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Workout Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((workoutType) => (
                  <SelectItem key={workoutType} value={workoutType}>
                    {workoutType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calories">Calories Burned</Label>
            <Input
              id="calories"
              type="number"
              min="1"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              {workout ? 'Update' : 'Add'} Workout
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};