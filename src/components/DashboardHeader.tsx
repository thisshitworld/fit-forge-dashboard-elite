
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader({ onAddWorkout }: { onAddWorkout: () => void }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-8">
      <div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-2 animate-fade-in tracking-tight">
          Fitness Tracking Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Track your gains, smash your PRs, and see every rep that counts.<br />
          <span className="text-highlight font-semibold">Stay elite.</span>
        </p>
      </div>
      <Button
        className="bg-primary text-white font-bold text-lg px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce-up hover-scale"
        onClick={onAddWorkout}
        aria-label="Add Workout"
      >
        <Plus /> Add Workout
      </Button>
    </div>
  );
}
