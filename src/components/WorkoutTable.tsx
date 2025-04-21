
import { Workout } from "@/data/fakeWorkouts"

export function WorkoutTable({ data }: { data: Workout[] }) {
  return (
    <div id="workout-history" className="bg-card rounded-xl shadow-lg p-4 mb-8">
      <h2 className="font-playfair text-2xl text-highlight mb-3">Workout History</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="bg-accent">
              <th className="py-2 px-3 rounded-l-xl text-left">Date</th>
              <th className="py-2 px-3 text-left">Exercise</th>
              <th className="py-2 px-3 text-left">Weight (kg)</th>
              <th className="py-2 px-3 text-left">Clean Reps</th>
              <th className="py-2 px-3 text-left">Supported Reps</th>
              <th className="py-2 px-3 text-left">Notes</th>
              <th className="py-2 px-3 rounded-r-xl"></th>
            </tr>
          </thead>
          <tbody>
            {data.map(w => (
              <tr key={w.id} className="hover:bg-accent hover:cursor-pointer transition">
                <td className="py-2 px-3">{w.date}</td>
                <td className="py-2 px-3">{w.exercise}</td>
                <td className="py-2 px-3 font-semibold">{w.weight}</td>
                <td className="py-2 px-3">{w.cleanReps}</td>
                <td className="py-2 px-3">{w.supportedReps}</td>
                <td className="py-2 px-3 text-muted-foreground">{w.notes}</td>
                <td className="py-2 px-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
