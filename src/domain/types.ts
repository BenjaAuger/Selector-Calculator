/** Identificador de cada interruptor físico del dispositivo */
export type SwitchId =
  | 'col64'
  | 'col32'
  | 'col16'
  | 'col8'
  | 'col4'
  | 'col2'
  | 'col1'
  | 'col05'

/** Estado de un interruptor: 1 = activo (ON), 0 = inactivo (OFF) */
export type SwitchState = 0 | 1

/** Configuración completa de los 8 interruptores */
export interface SwitchConfiguration {
  col64: SwitchState
  col32: SwitchState
  col16: SwitchState
  col8: SwitchState
  col4: SwitchState
  col2: SwitchState
  col1: SwitchState
  col05: SwitchState
}

/** Entrada del cálculo */
export interface CalculatorInput {
  totalWorkers: number
  workersToSelect: number
}

/** Resultado completo del cálculo (equivalente a hoja Calculadora) */
export interface CalculationResult {
  totalWorkers: number
  workersToSelect: number
  exactPercentage: number
  threshold: number
  estimatedWorkers: number
  switches: SwitchConfiguration
  activeSwitchLabels: string[]
}

/** Error de validación de entrada */
export interface ValidationError {
  field: 'totalWorkers' | 'workersToSelect'
  message: string
}

/** Fila de la tabla de combinaciones (hoja Combinaciones del Excel) */
export interface CombinationRow {
  switches: SwitchConfiguration
  value: number
}
