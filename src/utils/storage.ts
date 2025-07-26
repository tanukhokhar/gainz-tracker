import { Workout } from "@/components/WorkoutCard";

const STORAGE_KEY = 'fittracker_workouts';
const USER_KEY = 'fittracker_user';

export interface User {
  id: string;
  email: string;
}

// User storage
export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

// Workout storage
export const saveWorkouts = (workouts: Workout[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
};

export const getWorkouts = (): Workout[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  const workouts = JSON.parse(stored);
  // Convert date strings back to Date objects
  return workouts.map((workout: any) => ({
    ...workout,
    date: new Date(workout.date)
  }));
};

// CSV Export
export const exportWorkoutsToCSV = (workouts: Workout[]) => {
  const headers = ['Date', 'Type', 'Duration (min)', 'Calories'];
  const csvContent = [
    headers.join(','),
    ...workouts.map(workout => [
      workout.date.toISOString().split('T')[0],
      workout.type,
      workout.duration,
      workout.calories
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `workout-data-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};