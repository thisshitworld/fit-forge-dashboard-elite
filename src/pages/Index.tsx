
// Main Fitness Dashboard Page

import * as React from "react"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { AddWorkoutModal, AddWorkoutFormValues } from "@/components/AddWorkoutModal"
import { WorkoutTable } from "@/components/WorkoutTable"
import { ProgressChart } from "@/components/ProgressChart"
import { PersonalRecords } from "@/components/PersonalRecords"
import { fakeWorkouts, Workout } from "@/data/fakeWorkouts"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getUserSplit, setUserSplit, muscleGroups } from "@/data/exercises"
import { format } from "date-fns"

const LOCAL_KEY = "ffge-workouts"

function getStoredWorkouts(): Workout[] {
  const v = localStorage.getItem(LOCAL_KEY)
  return v ? JSON.parse(v) : fakeWorkouts
}

function setStoredWorkouts(w: Workout[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(w))
}

function getTodayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

const Index = () => {
  // Split setup
  const [split, setSplit] = React.useState<Record<string, string[]>>(getUserSplit())
  const [splitEditing, setSplitEditing] = React.useState(!split || Object.keys(split).length === 0)

  // Always show today's workouts, allow picking date
  const [date, setDate] = React.useState(getTodayISO())
  const [workouts, setWorkouts] = React.useState<Workout[]>(getStoredWorkouts().filter(w => w.date === date))
  const [addOpen, setAddOpen] = React.useState(false)
  // For celebratory effect when a PR is set
  const [showCelebrate, setShowCelebrate] = React.useState(false)

  React.useEffect(() => {
    setStoredWorkouts(workouts)
  }, [workouts])

  React.useEffect(() => {
    // Always display only workouts for the current date
    const all = getStoredWorkouts()
    setWorkouts(all.filter(w => w.date === date))
  }, [date])

  // Personal Split Save
  const handleSaveSplit = (newSplit: Record<string, string[]>) => {
    setSplit(newSplit)
    setUserSplit(newSplit)
    setSplitEditing(false)
  }

  // Find if PR broken on add
  const handleAddWorkout = (form: AddWorkoutFormValues) => {
    const newWorkout: Workout = {
      id: Math.random().toString(36).substr(2, 9),
      date: form.date,
      exercise: form.exercise,
      sets: form.sets,
      notes: form.notes,
    }
    // Check PR (most weight/clean reps for same exercise)
    const forExercise = getStoredWorkouts().filter(w => w.exercise === form.exercise)
    let isPR = false
    if (forExercise.length === 0) {
      isPR = true
    } else {
      const prevPR = forExercise.reduce((max, w) => {
        const maxSet = max.sets.reduce((m, s) =>
          s.weight > m.weight ||
          (s.weight === m.weight && s.cleanReps > m.cleanReps)
            ? s
            : m, max.sets[0])
        const wSet = w.sets.reduce((m, s) =>
          s.weight > m.weight ||
          (s.weight === m.weight && s.cleanReps > m.cleanReps)
            ? s
            : m, w.sets[0])
        // Compare by weight, then cleanReps
        return (wSet.weight > maxSet.weight ||
          (wSet.weight === maxSet.weight && wSet.cleanReps > maxSet.cleanReps))
          ? w
          : max
      }, forExercise[0])
      const newSet = newWorkout.sets.reduce((m, s) =>
        s.weight > m.weight ||
        (s.weight === m.weight && s.cleanReps > m.cleanReps) ? s : m,
        newWorkout.sets[0])
      const prevSet = prevPR.sets.reduce((m, s) =>
        s.weight > m.weight ||
        (s.weight === m.weight && s.cleanReps > m.cleanReps) ? s : m,
        prevPR.sets[0])
      if (
        newSet.weight > prevSet.weight ||
        (newSet.weight === prevSet.weight && newSet.cleanReps > prevSet.cleanReps)
      ) {
        isPR = true
      }
    }
    // Save workout
    const newAll = [newWorkout, ...getStoredWorkouts()]
    setStoredWorkouts(newAll)
    setWorkouts(newAll.filter(w => w.date === date))
    if (isPR) {
      setShowCelebrate(true)
      setTimeout(() => setShowCelebrate(false), 1800)
    }
  }

  // Days for user split input
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // UI for setting your weekly split
  function SplitEditBox() {
    const [local, setLocal] = React.useState<Record<string, string[]>>(split || {})
    return (
      <div className="p-6 border rounded-2xl bg-white max-w-lg mx-auto mb-10 mt-4">
        <h2 className="font-playfair text-xl mb-2">Set your weekly split</h2>
        {DAYS.map(day => (
          <div key={day} className="flex items-center gap-3 mb-2">
            <span className="w-20">{day}</span>
            <select
              multiple
              value={local[day] || []}
              className="border rounded px-2 py-1"
              onChange={e => {
                const vals = Array.from(e.target.selectedOptions).map(o => o.value)
                setLocal(s => ({ ...s, [day]: vals }))
              }}
            >
              {muscleGroups.map(mg => (
                <option key={mg} value={mg}>{mg}</option>
              ))}
            </select>
          </div>
        ))}
        <Button
          className="bg-neutral-900 hover:bg-neutral-800 text-white mt-4"
          onClick={() => handleSaveSplit(local)}
        >
          Save Split
        </Button>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard">
        <AppSidebar />
        <div className="flex-1 p-4 pt-8 max-w-4xl mx-auto">
          {splitEditing ? <SplitEditBox /> : (
            <>
              <div className="flex items-center flex-wrap gap-4 mb-4">
                <DashboardHeader onAddWorkout={() => setAddOpen(true)} />
                <div className="ml-auto flex gap-2 items-center">
                  <input
                    type="date"
                    className="rounded border px-2 py-1"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSplitEditing(true)}
                  >Edit Split</Button>
                </div>
              </div>
              {showCelebrate && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-fade-in">
                  <div className="bg-white/90 border border-yellow-400 rounded-2xl p-6 shadow-2xl flex flex-col items-center animate-bounce-up">
                    <span className="text-5xl font-playfair text-yellow-400 mt-2 animate-bounce-up">🔥</span>
                    <span className="font-playfair text-2xl text-primary font-bold">New Personal Record!</span>
                  </div>
                </div>
              )}
              <AddWorkoutModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSave={handleAddWorkout}
              />
              <PersonalRecords data={workouts} />
              <ProgressChart data={workouts} />
              <WorkoutTable data={workouts} />
            </>
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index
