
import { Workout } from "@/data/fakeWorkouts"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, CartesianGrid } from "recharts"
import * as React from "react"
import { Dumbbell } from "lucide-react"

export function ProgressChart({ data }: { data: Workout[] }) {
  // Get all exercises
  const exercises = Array.from(new Set(data.map(w => w.exercise)))
  const [exercise, setExercise] = React.useState(exercises[0] || "")

  const chartData = data
    .filter(w => w.exercise === exercise)
    .map(w => {
      // Get average values from sets
      const totalSets = w.sets?.length || 0
      const avgCleanReps = totalSets > 0 
        ? w.sets.reduce((sum, set) => sum + set.cleanReps, 0) / totalSets 
        : 0
      const avgSupportedReps = totalSets > 0 
        ? w.sets.reduce((sum, set) => sum + set.supportedReps, 0) / totalSets 
        : 0
      const maxWeight = totalSets > 0 
        ? Math.max(...w.sets.map(set => set.weight)) 
        : 0
        
      return {
        date: w.date,
        "Clean": avgCleanReps,
        "With Support": avgSupportedReps,
        "Weight": maxWeight,
      }
    })

  return (
    <div id="progress-charts" className="bg-card rounded-xl shadow-lg p-5 mb-8">
      <h2 className="font-playfair text-2xl text-blue-500 mb-4 flex items-center gap-2">
        <Dumbbell className="text-blue-600" /> Progress Chart
      </h2>
      <div className="flex items-center gap-2 mb-3">
        <label htmlFor="exercise-picker" className="text-muted-foreground">Exercise:</label>
        <select
          id="exercise-picker"
          className="rounded-md border px-2 py-1 text-lg"
          value={exercise}
          onChange={e => setExercise(e.target.value)}
        >
          {exercises.map(ex => (
            <option key={ex} value={ex}>{ex}</option>
          ))}
        </select>
      </div>
      {chartData.length === 0 ? (
        <div className="text-muted-foreground py-6">No data for this exercise yet.</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid stroke="#eee" strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Clean" stroke="#2563EB" strokeWidth={2} />
            <Line type="monotone" dataKey="With Support" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="Weight" stroke="#1E3A8A" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
