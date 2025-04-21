
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

const LOCAL_KEY = "ffge-workouts"

function getStoredWorkouts(): Workout[] {
  const v = localStorage.getItem(LOCAL_KEY)
  return v ? JSON.parse(v) : fakeWorkouts
}

function setStoredWorkouts(w: Workout[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(w))
}

const Index = () => {
  const [workouts, setWorkouts] = React.useState<Workout[]>(getStoredWorkouts)
  const [addOpen, setAddOpen] = React.useState(false)
  // For celebratory effect when a PR is set
  const [showCelebrate, setShowCelebrate] = React.useState(false)

  React.useEffect(() => {
    setStoredWorkouts(workouts)
  }, [workouts])

  // Find if PR broken on add
  const handleAddWorkout = (form: AddWorkoutFormValues) => {
    const newWorkout: Workout = {
      ...form,
      id: Math.random().toString(36).substr(2, 9),
    }
    // Find old PR
    const forExercise = workouts.filter(w => w.exercise === form.exercise)
    let isPR = false
    if (forExercise.length === 0) {
      isPR = true
    } else {
      const prevPR = forExercise.reduce((max, w) =>
        w.weight > max.weight ||
        (w.weight === max.weight && w.cleanReps > max.cleanReps)
          ? w
          : max,
        forExercise[0]
      )
      if (
        newWorkout.weight > prevPR.weight ||
        (newWorkout.weight === prevPR.weight && newWorkout.cleanReps > prevPR.cleanReps)
      ) {
        isPR = true
      }
    }
    setWorkouts([newWorkout, ...workouts])
    if (isPR) {
      setShowCelebrate(true)
      setTimeout(() => setShowCelebrate(false), 1800)
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard">
        <AppSidebar />
        <div className="flex-1 p-8 max-w-5xl mx-auto">
          <DashboardHeader onAddWorkout={() => setAddOpen(true)} />
          {showCelebrate && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-fade-in">
              <div className="bg-white/90 border border-highlight rounded-2xl p-6 shadow-2xl flex flex-col items-center animate-bounce-up">
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
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index
