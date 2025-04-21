
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
  DialogHeader, DialogFooter, DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { exercisesByMuscleGroup, muscleGroups, weeklySplit } from "@/data/exercises"
import { format, parseISO } from "date-fns"

export interface AddWorkoutFormValues {
  exercise: string;
  date: string;
  weight: number;
  cleanReps: number;
  supportedReps: number;
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
  return weeklySplit[day] || []
}

function exerciseOptions(groups: string[]) {
  const set = new Set<string>()
  groups.forEach(g => exercisesByMuscleGroup[g as keyof typeof exercisesByMuscleGroup]?.forEach(e => set.add(e)))
  return Array.from(set)
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
    weight: 0,
    cleanReps: 0,
    supportedReps: 0,
    notes: "",
  });

  // Whenever opening or date changes, update defaults.
  React.useEffect(() => {
    if (open) {
      setForm({
        exercise: "",
        date: defaultDate,
        weight: 0,
        cleanReps: 0,
        supportedReps: 0,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workout</DialogTitle>
          <DialogDescription>
            <span>
              Every rep counts — log your gains!<br />
              <b>Split for {actualDay}: {dayName}</b><br />
              <span className="text-highlight">
                {suggestedGroups.join(", ") || "Any muscle group"}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          {/* Exercise selection, grouped */}
          <label className="text-sm font-semibold">Exercise</label>
          <select
            name="exercise"
            value={form.exercise}
            onChange={handleInput}
            required
            className="rounded-md border px-3 py-2"
          >
            <option value="" disabled>Select exercise</option>
            {/* list suggested groups first */}
            {allExerciseOptions.map(({ group, exercises }) => (
              <optgroup key={group} label={group + (suggestedGroups.includes(group) ? " (Today)" : "")}>
                {exercises.map(ex => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </optgroup>
            ))}
          </select>

          <label className="text-sm font-semibold">Date</label>
          <Input
            name="date"
            type="date"
            value={form.date}
            onChange={handleInput}
            required
          />
          <div className="text-xs text-muted-foreground mb-2">
            Day: <b>{dayName}</b>
          </div>
          <div className="flex gap-2">
            <Input name="weight" type="number" min={0} placeholder="Weight (kg)" value={form.weight} onChange={handleInput} required />
            <Input name="cleanReps" type="number" min={0} placeholder="Clean reps" value={form.cleanReps} onChange={handleInput} required />
            <Input name="supportedReps" type="number" min={0} placeholder="Supported reps" value={form.supportedReps} onChange={handleInput} required />
          </div>
          <Input name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleInput} />
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary text-white hover-scale">Add Workout</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
