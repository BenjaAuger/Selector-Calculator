import { useMemo, useState } from 'react'
import type { CalculationResult } from '../../domain/types'
import type { SwitchId } from '../../domain/types'
import {
  deriveResultFromSwitches,
  isSwitchConfigurationEqual,
} from '../../domain/liveResult'
import { toggleSwitch } from '../../domain/switchEncoder'
import { Button } from '../../components/ui/Button'
import { SwitchPanel } from '../switch-viewer/SwitchPanel'

interface ResultSummaryProps {
  result: CalculationResult
  onReset: () => void
}

export function ResultSummary({ result, onReset }: ResultSummaryProps) {
  const [switches, setSwitches] = useState(result.switches)

  const liveResult = useMemo(
    () => deriveResultFromSwitches(result, switches),
    [result, switches],
  )

  const isManuallyAdjusted = !isSwitchConfigurationEqual(
    switches,
    result.switches,
  )

  const {
    totalWorkers,
    workersToSelect,
    exactPercentage,
    threshold,
    estimatedWorkers,
    activeSwitchLabels,
  } = liveResult

  const handleSwitchToggle = (switchId: SwitchId) => {
    setSwitches((prev) => toggleSwitch(prev, switchId))
  }

  const handleRestoreSuggestion = () => {
    setSwitches(result.switches)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Resultado</h2>
        <p className="mt-2 text-slate-600">
          Configure su dispositivo con los siguientes valores
        </p>
      </div>

      {isManuallyAdjusted && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-primary-800">
            Ha ajustado los interruptores manualmente. El umbral y la estimación se actualizaron en tiempo real.
          </p>
          <Button variant="secondary" onClick={handleRestoreSuggestion} className="shrink-0">
            Restaurar sugerencia
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Porcentaje solicitado"
          value={`${exactPercentage.toFixed(2)}%`}
          sublabel={`${workersToSelect} de ${totalWorkers} trabajadores`}
        />
        <StatCard
          label="Umbral configurado"
          value={`${threshold}%`}
          sublabel={
            isManuallyAdjusted
              ? 'Según interruptores activos'
              : 'Redondeado al 0.5% más cercano'
          }
          highlight
        />
        <StatCard
          label="Trabajadores estimados"
          value={String(estimatedWorkers)}
          sublabel="Con el umbral actual"
        />
        <StatCard
          label="Interruptores activos"
          value={activeSwitchLabels.length > 0 ? activeSwitchLabels.join(' + ') : 'Ninguno'}
          sublabel={activeSwitchLabels.length > 0 ? 'Suma ponderada = umbral' : 'Umbral 0%'}
        />
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Nota:</strong> Puede modificar los interruptores del panel para explorar
        distintas configuraciones. Cada combinación activa suma su peso y define el umbral
        de selección en el dispositivo.
      </div>

      <SwitchPanel
        switches={switches}
        interactive
        onSwitchToggle={handleSwitchToggle}
      />

      {activeSwitchLabels.length > 0 && (
        <div className="rounded-xl bg-primary-50 p-4 text-center">
          <p className="text-sm text-primary-700 font-medium">Instrucción resumida</p>
          <p className="mt-1 text-lg font-bold text-primary-900">
            Active los interruptores: {activeSwitchLabels.join(', ')}
          </p>
        </div>
      )}

      <Button onClick={onReset} variant="secondary" fullWidth>
        Nuevo cálculo
      </Button>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  sublabel: string
  highlight?: boolean
}

function StatCard({ label, value, sublabel, highlight }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? 'border-primary-200 bg-primary-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-bold ${
          highlight ? 'text-primary-700' : 'text-slate-900'
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500">{sublabel}</p>
    </div>
  )
}
