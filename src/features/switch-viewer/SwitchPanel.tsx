import { SWITCH_LABELS, SWITCH_ORDER } from '../../domain/constants'
import type { SwitchConfiguration, SwitchId } from '../../domain/types'

interface SwitchToggleProps {
  switchId: SwitchId
  isActive: boolean
  interactive?: boolean
  onToggle?: (switchId: SwitchId) => void
}

export function SwitchToggle({
  switchId,
  isActive,
  interactive = false,
  onToggle,
}: SwitchToggleProps) {
  const label = SWITCH_LABELS[switchId]

  const content = (
    <>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <div className="relative h-14 w-8 rounded-md border border-slate-300 bg-slate-800 p-0.5 shadow-inner">
        <div
          className={`absolute left-0.5 right-0.5 h-5 rounded-sm transition-all duration-200 ${
            isActive
              ? 'top-0.5 bg-success-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
              : 'top-[calc(100%-1.375rem)] bg-slate-400'
          }`}
        />
      </div>

      <span
        className={`text-xs font-bold ${isActive ? 'text-success-600' : 'text-slate-400'}`}
      >
        {isActive ? 'ON' : 'OFF'}
      </span>
    </>
  )

  const baseClasses = `flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
    isActive
      ? 'border-success-500 bg-green-50 shadow-md shadow-green-100'
      : 'border-slate-200 bg-slate-50'
  }`

  if (interactive && onToggle) {
    return (
      <button
        type="button"
        onClick={() => onToggle(switchId)}
        aria-pressed={isActive}
        aria-label={`Interruptor ${label}: ${isActive ? 'activo' : 'inactivo'}. Clic para cambiar.`}
        className={`${baseClasses} cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95`}
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className={baseClasses}
      aria-label={`Interruptor ${label}: ${isActive ? 'activo' : 'inactivo'}`}
    >
      {content}
    </div>
  )
}

interface SwitchPanelProps {
  switches: SwitchConfiguration
  interactive?: boolean
  onSwitchToggle?: (switchId: SwitchId) => void
}

export function SwitchPanel({
  switches,
  interactive = false,
  onSwitchToggle,
}: SwitchPanelProps) {
  return (
    <div className="w-full">
      <h3 className="mb-1 text-center text-lg font-semibold text-slate-800">
        Configuración de interruptores
      </h3>
      {interactive && (
        <p className="mb-4 text-center text-sm text-primary-600">
          Haga clic en cada interruptor para activarlo o desactivarlo. El resultado se actualiza al instante.
        </p>
      )}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {SWITCH_ORDER.map((switchId) => (
          <SwitchToggle
            key={switchId}
            switchId={switchId}
            isActive={switches[switchId] === 1}
            interactive={interactive}
            onToggle={onSwitchToggle}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-slate-500">
        {interactive
          ? 'Los interruptores en verde (ON) definen el umbral de selección.'
          : 'Los interruptores en verde (ON) deben activarse en el dispositivo físico.'}
      </p>
    </div>
  )
}
