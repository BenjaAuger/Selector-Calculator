import { estimateSelectedWorkers } from './percentage'
import {
  calculateSwitchValue,
  getActiveSwitchLabels,
} from './switchEncoder'
import type { CalculationResult, SwitchConfiguration } from './types'

/**
 * Recalcula umbral y estimaciones a partir de una configuración de interruptores.
 * Usado cuando el usuario modifica interruptores manualmente en el panel interactivo.
 */
export function deriveResultFromSwitches(
  base: CalculationResult,
  switches: SwitchConfiguration,
): CalculationResult {
  const threshold = calculateSwitchValue(switches)

  return {
    ...base,
    threshold,
    estimatedWorkers: estimateSelectedWorkers(base.totalWorkers, threshold),
    switches,
    activeSwitchLabels: getActiveSwitchLabels(switches),
  }
}

/**
 * Indica si la configuración de interruptores difiere de la sugerencia inicial.
 */
export function isSwitchConfigurationEqual(
  a: SwitchConfiguration,
  b: SwitchConfiguration,
): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
