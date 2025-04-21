
import { Workout } from "@/data/fakeWorkouts"
import { Star } from "lucide-react"

function getPRs(workouts: Workout[]) {
  // Map of exercise => {weight, cleanReps, date}
  const prs: Record<string, { weight: number; cleanReps: number; date: string }> = {}
  
  for (const w of workouts) {
    // Get max weight and reps from sets
    const maxSet = w.sets && w.sets.length > 0 
      ? w.sets.reduce((max, set) => 
          set.weight > max.weight || 
          (set.weight === max.weight && set.cleanReps > max.cleanReps) 
            ? set : max, w.sets[0])
      : null;
    
    if (maxSet) {
      if (
        !prs[w.exercise] ||
        maxSet.weight > prs[w.exercise].weight ||
        (maxSet.weight === prs[w.exercise].weight && maxSet.cleanReps > prs[w.exercise].cleanReps)
      ) {
        prs[w.exercise] = { 
          weight: maxSet.weight, 
          cleanReps: maxSet.cleanReps, 
          date: w.date 
        }
      }
    }
  }
  return prs
}

export function PersonalRecords({ data }: { data: Workout[] }) {
  const prs = getPRs(data)
  return (
    <div id="personal-records" className="bg-card rounded-xl shadow-lg p-5 mb-8">
      <h2 className="font-playfair text-2xl text-blue-500 mb-4 flex items-center gap-2">
        <Star className="text-yellow-400 animate-bounce-up" /> Personal Records
      </h2>
      <div className="flex flex-wrap gap-4">
        {Object.entries(prs).map(([exercise, rec]) => (
          <div key={exercise} className="bg-secondary rounded-lg shadow px-6 py-3 flex flex-col items-center min-w-[140px] hover-scale">
            <span className="font-semibold text-lg">{exercise}</span>
            <span className="text-3xl text-blue-600 font-bold font-playfair">{rec.weight} kg</span>
            <span className="text-sm text-gray-600">Clean reps: <b>{rec.cleanReps}</b></span>
            <span className="text-xs text-muted-foreground mt-1">on {rec.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
