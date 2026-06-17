import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

interface StepWorkersToSelectProps {
  value: string
  totalWorkers: string
  error?: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function StepWorkersToSelect({
  value,
  totalWorkers,
  error,
  onChange,
  onNext,
  onBack,
}: StepWorkersToSelectProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Trabajadores a seleccionar
        </h2>
        <p className="mt-2 text-slate-600">
          De un total de <strong>{totalWorkers}</strong> trabajadores, ¿cuántos
          desea seleccionar aproximadamente?
        </p>
      </div>

      <Input
        label="Cantidad a seleccionar"
        type="number"
        min={0}
        max={Number(totalWorkers)}
        step={1}
        inputMode="numeric"
        placeholder="Ej: 25"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        hint={`Máximo: ${totalWorkers} trabajadores`}
        autoFocus
      />

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Anterior
        </Button>
        <Button type="submit" fullWidth>
          Calcular
        </Button>
      </div>
    </form>
  )
}
