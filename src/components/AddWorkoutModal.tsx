
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"

export interface AddWorkoutFormValues {
  exercise: string;
  date: string;
  weight: number;
  cleanReps: number;
  supportedReps: number;
  notes?: string;
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
  const [form, setForm] = React.useState<AddWorkoutFormValues>({
    exercise: "",
    date: "",
    weight: 0,
    cleanReps: 0,
    supportedReps: 0,
    notes: "",
  });

  React.useEffect(() => {
    if (open) setForm({
      exercise: "",
      date: "",
      weight: 0,
      cleanReps: 0,
      supportedReps: 0,
      notes: "",
    });
  }, [open]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.exercise || !form.date) return;
    onSave(form);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workout</DialogTitle>
          <DialogDescription>Every rep counts — log your gains!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          <Input name="exercise" placeholder="Exercise (e.g. Bench Press)" value={form.exercise} onChange={handleInput} required />
          <Input name="date" type="date" value={form.date} onChange={handleInput} required />
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
