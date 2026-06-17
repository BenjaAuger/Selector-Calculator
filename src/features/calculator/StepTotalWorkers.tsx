import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

interface StepTotalWorkersProps {
  value: string
  error?: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function StepTotalWorkers({
  value,
  error,
  onChange,
  onNext,
  onBack,
}: StepTotalWorkersProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Total de trabajadores
        </h2>
        <p className="mt-2 text-slate-600">
          Ingrese la cantidad total de trabajadores en su empresa.
        </p>
      </div>

      <Input
        label="Número total de trabajadores"
        type="number"
        min={1}
        step={1}
        inputMode="numeric"
        placeholder="Ej: 138"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        hint="Solo números enteros positivos"
        autoFocus
      />

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Volver
        </Button>
        <Button type="submit" fullWidth>
          Continuar
        </Button>
      </div>
    </form>
  )
}
