
// Types only; start with no workouts
export interface Workout {
  id: string
  date: string // ISO Date only, e.g. "2025-04-20"
  exercise: string
  weight: number
  cleanReps: number
  supportedReps: number
  notes?: string
}

export const fakeWorkouts: Workout[] = []
