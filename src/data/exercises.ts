
export const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Legs",
  "Arms",
  "Core",
  "Cardio",
  "Traps",
  "Forearms",
  "Glutes",
  "Calves",
  "Abs",
  "Obliques",
  "Lower Back",
] as const

type MuscleGroup = (typeof muscleGroups)[number]

export const exercisesByMuscleGroup: Record<MuscleGroup, string[]> = {
  Chest: [
    "Bench Press",
    "Incline Bench Press",
    "Decline Bench Press",
    "Chest Fly",
    "Push Up",
    "Cable Crossover",
    "Dumbbell Bench Press",
    "Dips",
    "Machine Chest Press",
    "Pec Deck Fly",
  ],
  Back: [
    "Deadlift",
    "Pull Up",
    "Lat Pulldown",
    "Barbell Row",
    "Seated Row",
    "T-Bar Row",
    "Face Pull",
    "Chin Up",
    "Rack Pull",
    "Single-Arm Dumbbell Row",
  ],
  Shoulders: [
    "Overhead Press",
    "Dumbbell Shoulder Press",
    "Lateral Raise",
    "Front Raise",
    "Rear Delt Fly",
    "Arnold Press",
    "Upright Row",
    "Plate Raise",
    "Cable Lateral Raise",
    "Machine Shoulder Press",
  ],
  Legs: [
    "Squat",
    "Leg Press",
    "Lunge",
    "Hamstring Curl",
    "Leg Extension",
    "Calf Raise",
    "Romanian Deadlift",
    "Bulgarian Split Squat",
    "Glute Bridge",
    "Seated Calf Raise",
  ],
  Arms: [
    "Barbell Curl",
    "Dumbbell Curl",
    "Tricep Pushdown",
    "Skullcrusher",
    "Hammer Curl",
    "Tricep Dips",
    "Cable Curl",
    "Preacher Curl",
    "Overhead Tricep Extension",
    "Concentration Curl",
  ],
  Core: [
    "Crunch",
    "Plank",
    "Russian Twist",
    "Leg Raise",
    "Cable Crunch",
    "Bicycle Crunch",
    "V-Up",
    "Ab Wheel Rollout",
    "Hanging Knee Raise",
    "Oblique Crunch",
  ],
  Cardio: [
    "Running",
    "Cycling",
    "Rowing Machine",
    "Jump Rope",
    "Swimming",
    "Elliptical",
    "Stair Climber",
    "HIIT Sprint",
    "Incline Walk",
    "Boxing",
  ],
  Traps: [
    "Barbell Shrug",
    "Dumbbell Shrug",
    "Rack Pulls",
    "Farmer's Walk",
    "Face Pulls",
  ],
  Forearms: [
    "Wrist Curl",
    "Reverse Wrist Curl",
    "Farmer's Walk",
    "Hammer Curl",
    "Reverse Curl",
  ],
  Glutes: [
    "Hip Thrust",
    "Glute Bridge",
    "Cable Kickback",
    "Sumo Deadlift",
    "Bulgarian Split Squat",
  ],
  Calves: [
    "Standing Calf Raise",
    "Seated Calf Raise",
    "Leg Press Calf Raise",
    "Donkey Calf Raise",
    "Jump Rope",
  ],
  Abs: [
    "Crunch",
    "Plank",
    "Hanging Leg Raise",
    "Cable Crunch",
    "Ab Wheel Rollout",
  ],
  Obliques: [
    "Russian Twist",
    "Side Plank",
    "Oblique Crunch",
    "Woodchopper",
    "Hanging Knee Raise Twist",
  ],
  "Lower Back": [
    "Back Extension",
    "Romanian Deadlift",
    "Deadlift",
    "Superman",
    "Bird Dog",
  ],
}

// The user's split will be saved/retrieved from localStorage
const SPLIT_KEY = "user-workout-split"

export function getUserSplit(): Record<string, MuscleGroup[]> {
  const raw = localStorage.getItem(SPLIT_KEY)
  try {
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function setUserSplit(split: Record<string, MuscleGroup[]>) {
  localStorage.setItem(SPLIT_KEY, JSON.stringify(split))
}
