
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
  DialogHeader, DialogFooter, DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { exercisesByMuscleGroup, muscleGroups, getUserSplit } from "@/data/exercises"
import { format, parseISO } from "date-fns"

export interface AddWorkoutFormValues {
  exercise: string;
  date: string;
  sets: {
    set: number;
    weight: number;
    cleanReps: number;
    supportedReps: number;
  }[];
  notes?: string;
}

function getTodayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function getDayOfWeek(dateStr: string) {
  return format(parseISO(dateStr), "EEEE")
}

function suggestedMuscleGroupsForDate(dateISO: string) {
  const day = getDayOfWeek(dateISO)
  const split = getUserSplit()
  return split[day] || []
}

export function AddWorkoutModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: AddWorkoutFormValues) => void;
}) {
  // Always default date to today when open
  const defaultDate = getTodayISO()
  const [form, setForm] = React.useState<AddWorkoutFormValues>({
    exercise: "",
    date: defaultDate,
    sets: [
      { set: 1, weight: 0, cleanReps: 0, supportedReps: 0 }
    ],
    notes: "",
  });

  // Whenever opening or date changes, update defaults.
  React.useEffect(() => {
    if (open) {
      setForm({
        exercise: "",
        date: defaultDate,
        sets: [{ set: 1, weight: 0, cleanReps: 0, supportedReps: 0 }],
        notes: "",
      })
    }
    // eslint-disable-next-line
  }, [open])

  const actualDay = form.date || defaultDate
  const dayName = format(new Date(actualDay), "EEEE")
  const suggestedGroups = suggestedMuscleGroupsForDate(actualDay)
  const optionGroups = (suggestedGroups.length > 0) ? suggestedGroups : muscleGroups

  // Exercise dropdown grouped by muscle group, with suggested ones on top
  const allExerciseOptions = muscleGroups.map(group => ({
    group,
    exercises: exercisesByMuscleGroup[group]
  }))

  // Handlers for set input fields
  const handleSetInput = (
    idx: number,
    field: "set" | "weight" | "cleanReps" | "supportedReps",
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      sets: prev.sets.map((setRow, i) =>
        i === idx ? { ...setRow, [field]: field === "set" ? Number(value) : Number(value) }
        : setRow
      )
    }))
  }

  const handleAddSet = () => {
    setForm(prev => ({
      ...prev,
      sets: [...prev.sets, {
        set: prev.sets.length + 1,
        weight: 0,
        cleanReps: 0,
        supportedReps: 0,
      }]
    }))
  }

  const handleRemoveSet = (idx: number) => {
    setForm(prev => ({
      ...prev,
      sets: prev.sets.filter((_, i) => i !== idx)
        .map((set, i) => ({ ...set, set: i + 1 }))
    }))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.exercise || !form.date) return
    onSave(form)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add a Workout</DialogTitle>
          <DialogDescription className="text-gray-200">
            <span>
              <b>Day: {actualDay} ({dayName})</b>
              <br />
              <span className="text-yellow-300 font-medium">
                {suggestedGroups.join(", ") || "Any muscle group"}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          {/* Exercise selection, grouped */}
          <label className="text-sm font-semibold text-white">Exercise</label>
          <select
            name="exercise"
            value={form.exercise}
            onChange={handleInput}
            required
            className="rounded-md border border-gray-600 px-3 py-2 bg-gray-800 text-white"
          >
            <option value="" disabled>Select exercise</option>
            {allExerciseOptions.map(({ group, exercises }) => (
              <optgroup key={group} label={group + (suggestedGroups.includes(group) ? " (Today)" : "")}>
                {exercises.map(ex => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <label className="text-sm font-semibold text-white">Date</label>
          <Input
            name="date"
            type="date"
            value={form.date}
            onChange={handleInput}
            required
            className="bg-gray-800 text-white border-gray-600"
          />
          <div className="flex flex-col gap-2 mb-2 p-2 rounded bg-gray-800 border border-gray-700">
            <div className="font-semibold text-base text-white">Sets</div>
            {form.sets.map((setRow, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  type="number"
                  min={1}
                  placeholder="Set"
                  value={setRow.set || ""}
                  onChange={e => handleSetInput(idx, "set", e.target.value)}
                  className="w-14 bg-gray-800 text-white border-gray-600"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Clean Rep"
                  value={setRow.cleanReps || ""}
                  onChange={e => handleSetInput(idx, "cleanReps", e.target.value)}
                  className="w-24 bg-gray-800 text-white border-gray-600"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="With Support"
                  value={setRow.supportedReps || ""}
                  onChange={e => handleSetInput(idx, "supportedReps", e.target.value)}
                  className="w-28 bg-gray-800 text-white border-gray-600"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Weight"
                  value={setRow.weight || ""}
                  onChange={e => handleSetInput(idx, "weight", e.target.value)}
                  className="w-20 bg-gray-800 text-white border-gray-600"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-gray-300 hover:text-red-400 px-1"
                  onClick={() => handleRemoveSet(idx)}
                  disabled={form.sets.length === 1}
                  title="Remove set"
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddSet}
              size="sm"
              className="w-fit px-3 mt-1 bg-blue-700 hover:bg-blue-800 text-white"
            >
              + Add Set
            </Button>
          </div>
          <Input 
            name="notes" 
            placeholder="Notes (optional)" 
            value={form.notes} 
            onChange={handleInput} 
            className="bg-gray-800 text-white border-gray-600"
          />
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-600 hover-scale">Add Workout</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
