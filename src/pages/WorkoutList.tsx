import { useState } from "react";
import { WorkoutCard, Workout } from "@/components/WorkoutCard";
import { WorkoutFiltersComponent, WorkoutFilters } from "@/components/WorkoutFilters";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WorkoutForm } from "@/components/WorkoutForm";
import { Plus } from "lucide-react";
import { isWithinInterval } from "date-fns";

interface WorkoutListProps {
  workouts: Workout[];
  onAddWorkout: (workout: Omit<Workout, 'id'>) => void;
  onEditWorkout: (id: string, workout: Omit<Workout, 'id'>) => void;
  onDeleteWorkout: (id: string) => void;
  onExportCSV: () => void;
}

export const WorkoutList = ({ 
  workouts, 
  onAddWorkout, 
  onEditWorkout, 
  onDeleteWorkout,
  onExportCSV 
}: WorkoutListProps) => {
  const [filters, setFilters] = useState<WorkoutFilters>({
    search: '',
    type: '',
    dateRange: undefined,
  });
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Get unique workout types
  const workoutTypes = Array.from(new Set(workouts.map(w => w.type))).sort();

  // Filter workouts
  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = !filters.search || 
      workout.type.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = !filters.type || workout.type === filters.type;
    
    const matchesDateRange = !filters.dateRange?.from || 
      isWithinInterval(workout.date, { 
        start: filters.dateRange.from, 
        end: filters.dateRange.to || filters.dateRange.from 
      });

    return matchesSearch && matchesType && matchesDateRange;
  });

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
  };

  const handleEditSubmit = (workoutData: Omit<Workout, 'id'>) => {
    if (editingWorkout) {
      onEditWorkout(editingWorkout.id, workoutData);
      setEditingWorkout(null);
    }
  };

  const handleAddSubmit = (workoutData: Omit<Workout, 'id'>) => {
    onAddWorkout(workoutData);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          My Workouts
        </h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Workout
        </Button>
      </div>

      <WorkoutFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onExportCSV={onExportCSV}
        workoutTypes={workoutTypes}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkouts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              {workouts.length === 0 
                ? "No workouts yet. Add your first workout to get started!" 
                : "No workouts match your current filters."}
            </p>
          </div>
        ) : (
          filteredWorkouts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onEdit={handleEdit}
                onDelete={onDeleteWorkout}
              />
            ))
        )}
      </div>

      {/* Add Workout Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Workout</DialogTitle>
          </DialogHeader>
          <WorkoutForm 
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Workout Dialog */}
      <Dialog open={!!editingWorkout} onOpenChange={() => setEditingWorkout(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Workout</DialogTitle>
          </DialogHeader>
          <WorkoutForm 
            workout={editingWorkout}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingWorkout(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};