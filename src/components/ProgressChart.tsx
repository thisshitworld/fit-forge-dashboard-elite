
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
    .map(w => ({
      date: w.date,
      "Clean": w.cleanReps,
      "With Support": w.supportedReps,
      "Weight": w.weight,
    }))

  return (
    <div id="progress-charts" className="bg-card rounded-xl shadow-lg p-5 mb-8">
      <h2 className="font-playfair text-2xl text-highlight mb-4 flex items-center gap-2">
        <Dumbbell className="text-primary" /> Progress Chart
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
            <Line type="monotone" dataKey="Clean" stroke="#6E59A5" strokeWidth={2} />
            <Line type="monotone" dataKey="With Support" stroke="#8b5cf6" strokeWidth={2} />
            <Line type="monotone" dataKey="Weight" stroke="#403E43" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
