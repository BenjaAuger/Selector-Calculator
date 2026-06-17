import { THRESHOLD_STEP } from './constants'

/**
 * Calcula el porcentaje exacto de selección.
 * Equivalente Excel: =B2/B1*100
 */
export function calculatePercentage(
  workersToSelect: number,
  totalWorkers: number,
): number {
  return (workersToSelect / totalWorkers) * 100
}

/**
 * Redondea al múltiplo más cercano de 0.5.
 * Equivalente Excel: =MROUND(B3, 0.5)
 */
export function roundThreshold(percentage: number): number {
  return Math.round(percentage / THRESHOLD_STEP) * THRESHOLD_STEP
}

/**
 * Estima trabajadores seleccionados con el umbral configurado.
 */
export function estimateSelectedWorkers(
  totalWorkers: number,
  threshold: number,
): number {
  return Math.round((totalWorkers * threshold) / 100)
}
