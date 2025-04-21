
export interface Workout {
  id: string
  date: string // ISO Date only, e.g. "2025-04-20"
  exercise: string
  weight: number
  cleanReps: number
  supportedReps: number
  notes?: string
}

export const fakeWorkouts: Workout[] = [
  {
    id: '1',
    date: "2025-04-18",
    exercise: "Bench Press",
    weight: 50,
    cleanReps: 10,
    supportedReps: 5,
    notes: "Felt strong!"
  },
  {
    id: '2',
    date: "2025-04-19",
    exercise: "Bench Press",
    weight: 55,
    cleanReps: 8,
    supportedReps: 2,
    notes: "Spotter helped last 2 reps"
  },
  {
    id: '3',
    date: "2025-04-19",
    exercise: "Squat",
    weight: 70,
    cleanReps: 10,
    supportedReps: 0,
    notes: "No support!"
  },
  {
    id: '4',
    date: "2025-04-20",
    exercise: "Deadlift",
    weight: 80,
    cleanReps: 8,
    supportedReps: 0,
    notes: "All clean reps"
  },
  {
    id: '5',
    date: "2025-04-20",
    exercise: "Bench Press",
    weight: 60,
    cleanReps: 7,
    supportedReps: 3,
    notes: "Success!"
  }
]
