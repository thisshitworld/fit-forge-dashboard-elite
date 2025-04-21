
export const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Legs",
  "Arms",
  "Core",
  "Cardio",
] as const

type MuscleGroup = (typeof muscleGroups)[number]

export const exercisesByMuscleGroup: Record<MuscleGroup, string[]> = {
  Chest: [
    "Bench Press",
    "Incline Bench Press",
    "Decline Bench Press",
    "Chest Fly",
    "Push Up",
    "Cable Crossover"
  ],
  Back: [
    "Deadlift",
    "Pull Up",
    "Lat Pulldown",
    "Barbell Row",
    "Seated Row",
    "T-Bar Row"
  ],
  Shoulders: [
    "Overhead Press",
    "Dumbbell Shoulder Press",
    "Lateral Raise",
    "Front Raise",
    "Rear Delt Fly"
  ],
  Legs: [
    "Squat",
    "Leg Press",
    "Lunge",
    "Hamstring Curl",
    "Leg Extension",
    "Calf Raise"
  ],
  Arms: [
    "Barbell Curl",
    "Dumbbell Curl",
    "Tricep Pushdown",
    "Skullcrusher",
    "Hammer Curl",
    "Tricep Dips"
  ],
  Core: [
    "Crunch",
    "Plank",
    "Russian Twist",
    "Leg Raise",
    "Cable Crunch"
  ],
  Cardio: [
    "Running",
    "Cycling",
    "Rowing Machine",
    "Jump Rope",
    "Swimming"
  ]
}

// Your recommended weekly split for context. Example, edit as needed:
export const weeklySplit: Record<string, MuscleGroup[]> = {
  Monday: ["Chest", "Shoulders"],
  Tuesday: ["Back", "Arms"],
  Wednesday: ["Legs"],
  Thursday: ["Chest", "Core"],
  Friday: ["Back", "Shoulders"],
  Saturday: ["Legs", "Arms"],
  Sunday: ["Cardio", "Core"]
}
