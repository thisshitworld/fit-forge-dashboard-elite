
import { Workout } from "@/data/fakeWorkouts"

export function WorkoutTable({ data }: { data: Workout[] }) {
  return (
    <div id="workout-history" className="bg-card rounded-xl shadow-lg p-4 mb-8">
      <h2 className="font-playfair text-2xl text-blue-500 mb-3">Workout History</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="bg-slate-100">
              <th className="py-2 px-3 rounded-l-xl text-left">Date</th>
              <th className="py-2 px-3 text-left">Exercise</th>
              <th className="py-2 px-3 text-left">Sets</th>
              <th className="py-2 px-3 text-left">Weight (kg)</th>
              <th className="py-2 px-3 text-left">Clean Reps</th>
              <th className="py-2 px-3 text-left">Supported Reps</th>
              <th className="py-2 px-3 text-left">Notes</th>
              <th className="py-2 px-3 rounded-r-xl"></th>
            </tr>
          </thead>
          <tbody>
            {data.flatMap(w => 
              w.sets.map((set, idx) => (
                <tr key={`${w.id}-${idx}`} className="hover:bg-slate-100 hover:cursor-pointer transition">
                  {idx === 0 && (
                    <>
                      <td className="py-2 px-3" rowSpan={w.sets.length}>{w.date}</td>
                      <td className="py-2 px-3" rowSpan={w.sets.length}>{w.exercise}</td>
                    </>
                  )}
                  <td className="py-2 px-3">{set.set}</td>
                  <td className="py-2 px-3 font-semibold">{set.weight}</td>
                  <td className="py-2 px-3">{set.cleanReps}</td>
                  <td className="py-2 px-3">{set.supportedReps}</td>
                  {idx === 0 && (
                    <td className="py-2 px-3 text-muted-foreground" rowSpan={w.sets.length}>{w.notes}</td>
                  )}
                  <td className="py-2 px-3"></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
