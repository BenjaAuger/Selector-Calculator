import { MAX_THRESHOLD } from './constants'
import {
  calculatePercentage,
  estimateSelectedWorkers,
  roundThreshold,
} from './percentage'
import { findCombinationByThreshold } from './combinations'
import { getActiveSwitchLabels } from './switchEncoder'
import type {
  CalculationResult,
  CalculatorInput,
  ValidationError,
} from './types'

/**
 * Valida los datos de entrada del usuario.
 */
export function validateCalculatorInput(
  input: CalculatorInput,
): ValidationError | null {
  const { totalWorkers, workersToSelect } = input

  if (!Number.isInteger(totalWorkers) || totalWorkers <= 0) {
    return {
      field: 'totalWorkers',
      message: 'Ingrese un número válido de trabajadores',
    }
  }

  if (!Number.isInteger(workersToSelect) || workersToSelect < 0) {
    return {
      field: 'workersToSelect',
      message: 'La cantidad no puede ser negativa',
    }
  }

  if (workersToSelect > totalWorkers) {
    return {
      field: 'workersToSelect',
      message: 'No puede seleccionar más trabajadores que el total',
    }
  }

  const percentage = calculatePercentage(workersToSelect, totalWorkers)
  if (percentage > MAX_THRESHOLD) {
    return {
      field: 'workersToSelect',
      message: `El porcentaje supera el límite del dispositivo (${MAX_THRESHOLD}%)`,
    }
  }

  return null
}

/**
 * Ejecuta el cálculo completo replicando la hoja Calculadora del Excel.
 */
export function calculateSelectorResult(
  input: CalculatorInput,
): CalculationResult {
  const validationError = validateCalculatorInput(input)
  if (validationError) {
    throw new Error(validationError.message)
  }

  const { totalWorkers, workersToSelect } = input
  const exactPercentage = calculatePercentage(workersToSelect, totalWorkers)
  const threshold = roundThreshold(exactPercentage)

  const combination = findCombinationByThreshold(threshold)
  if (!combination) {
    throw new Error(`No se encontró combinación para el umbral ${threshold}%`)
  }

  return {
    totalWorkers,
    workersToSelect,
    exactPercentage,
    threshold,
    estimatedWorkers: estimateSelectedWorkers(totalWorkers, threshold),
    switches: combination.switches,
    activeSwitchLabels: getActiveSwitchLabels(combination.switches),
  }
}
