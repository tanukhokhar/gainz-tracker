import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AuthForm } from "@/components/AuthForm";
import { Dashboard } from "./Dashboard";
import { WorkoutList } from "./WorkoutList";
import { WorkoutForm } from "@/components/WorkoutForm";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Workout } from "@/components/WorkoutCard";
import { User, saveUser, getUser, removeUser, saveWorkouts, getWorkouts, exportWorkoutsToCSV } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
      setWorkouts(getWorkouts());
    }
  }, []);

  useEffect(() => {
    if (workouts.length > 0) {
      saveWorkouts(workouts);
    }
  }, [workouts]);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would be handled by Supabase
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
    };
    setUser(newUser);
    saveUser(newUser);
    setWorkouts(getWorkouts());
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in.",
    });
  };

  const handleSignup = (email: string, password: string) => {
    // Mock authentication - in real app, this would be handled by Supabase
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
    };
    setUser(newUser);
    saveUser(newUser);
    setWorkouts([]);
    toast({
      title: "Account created!",
      description: "Welcome to FitTracker. Start logging your workouts!",
    });
  };

  const handleLogout = () => {
    setUser(null);
    removeUser();
    setWorkouts([]);
    setCurrentPage('dashboard');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const handleAddWorkout = (workoutData: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workoutData,
      id: Math.random().toString(36).substring(7),
    };
    setWorkouts(prev => [...prev, newWorkout]);
    toast({
      title: "Workout added!",
      description: `Added ${workoutData.type} workout for ${workoutData.duration} minutes.`,
    });
  };

  const handleEditWorkout = (id: string, workoutData: Omit<Workout, 'id'>) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...workoutData, id } : w));
    toast({
      title: "Workout updated!",
      description: "Your workout has been successfully updated.",
    });
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
    toast({
      title: "Workout deleted",
      description: "Your workout has been removed.",
      variant: "destructive",
    });
  };

  const handleExportCSV = () => {
    exportWorkoutsToCSV(workouts);
    toast({
      title: "Export successful!",
      description: "Your workout data has been downloaded.",
    });
  };

  if (!user) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthForm onLogin={handleLogin} onSignup={handleSignup} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Layout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        user={user}
      >
        {currentPage === 'dashboard' && <Dashboard workouts={workouts} />}
        {currentPage === 'workouts' && (
          <WorkoutList
            workouts={workouts}
            onAddWorkout={handleAddWorkout}
            onEditWorkout={handleEditWorkout}
            onDeleteWorkout={handleDeleteWorkout}
            onExportCSV={handleExportCSV}
          />
        )}
        {currentPage === 'add-workout' && (
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Add New Workout
            </h1>
            <WorkoutForm
              onSubmit={(workoutData) => {
                handleAddWorkout(workoutData);
                setCurrentPage('workouts');
              }}
            />
          </div>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
