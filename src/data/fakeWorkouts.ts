
export interface Workout {
  id: string
  date: string // ISO Date only, e.g. "2025-04-20"
  exercise: string
  sets: {
    set: number
    weight: number
    cleanReps: number
    supportedReps: number
  }[]
  notes?: string
  weight?: number // For backward compatibility with components
  cleanReps?: number // For backward compatibility with components  
  supportedReps?: number // For backward compatibility with components
}

export const fakeWorkouts: Workout[] = []
