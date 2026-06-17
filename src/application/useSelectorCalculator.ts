import { useCallback, useState } from 'react'
import { calculateSelectorResult, validateCalculatorInput } from '../domain/calculator'
import type { CalculationResult, ValidationError } from '../domain/types'

export type WizardStep = 'landing' | 'total' | 'select' | 'result'

interface CalculatorState {
  step: WizardStep
  totalWorkers: string
  workersToSelect: string
  result: CalculationResult | null
  error: ValidationError | null
}

const initialState: CalculatorState = {
  step: 'landing',
  totalWorkers: '',
  workersToSelect: '',
  result: null,
  error: null,
}

/**
 * Hook que orquesta el flujo del wizard y el cálculo del selector.
 */
export function useSelectorCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState)

  const setTotalWorkers = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      totalWorkers: value,
      error: null,
    }))
  }, [])

  const setWorkersToSelect = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      workersToSelect: value,
      error: null,
    }))
  }, [])

  const goToStep = useCallback((step: WizardStep) => {
    setState((prev) => ({ ...prev, step, error: null }))
  }, [])

  const startCalculator = useCallback(() => {
    setState((prev) => ({ ...prev, step: 'total', error: null }))
  }, [])

  const submitTotalWorkers = useCallback(() => {
    const total = Number(state.totalWorkers)
    const error = validateCalculatorInput({
      totalWorkers: total,
      workersToSelect: 0,
    })

    if (error?.field === 'totalWorkers') {
      setState((prev) => ({ ...prev, error }))
      return false
    }

    setState((prev) => ({ ...prev, step: 'select', error: null }))
    return true
  }, [state.totalWorkers])

  const submitWorkersToSelect = useCallback(() => {
    const total = Number(state.totalWorkers)
    const toSelect = Number(state.workersToSelect)

    const error = validateCalculatorInput({
      totalWorkers: total,
      workersToSelect: toSelect,
    })

    if (error) {
      setState((prev) => ({ ...prev, error }))
      return false
    }

    try {
      const result = calculateSelectorResult({
        totalWorkers: total,
        workersToSelect: toSelect,
      })

      setState((prev) => ({
        ...prev,
        step: 'result',
        result,
        error: null,
      }))
      return true
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: {
          field: 'workersToSelect',
          message: err instanceof Error ? err.message : 'Error al calcular',
        },
      }))
      return false
    }
  }, [state.totalWorkers, state.workersToSelect])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    ...state,
    setTotalWorkers,
    setWorkersToSelect,
    goToStep,
    startCalculator,
    submitTotalWorkers,
    submitWorkersToSelect,
    reset,
  }
}
