import type { SwitchId } from './types'

/** Pesos en porcentaje de cada interruptor (columnas E4:L4 del Excel) */
export const SWITCH_WEIGHTS: Record<SwitchId, number> = {
  col64: 64,
  col32: 32,
  col16: 16,
  col8: 8,
  col4: 4,
  col2: 2,
  col1: 1,
  col05: 0.5,
}

/** Orden de interruptores de mayor a menor peso */
export const SWITCH_ORDER: SwitchId[] = [
  'col64',
  'col32',
  'col16',
  'col8',
  'col4',
  'col2',
  'col1',
  'col05',
]

/** Etiquetas legibles para la UI */
export const SWITCH_LABELS: Record<SwitchId, string> = {
  col64: '64%',
  col32: '32%',
  col16: '16%',
  col8: '8%',
  col4: '4%',
  col2: '2%',
  col1: '1%',
  col05: '0.5%',
}

/** Umbral máximo configurable en el dispositivo físico */
export const MAX_THRESHOLD = 127.5

/** Paso de redondeo del umbral (MROUND a 0.5) */
export const THRESHOLD_STEP = 0.5

/** Clave localStorage para tutorial completado */
export const TUTORIAL_STORAGE_KEY = 'selector-calculadora-tutorial-completed'
