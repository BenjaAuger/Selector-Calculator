import { describe, expect, it } from 'vitest'
import { calculateSelectorResult, validateCalculatorInput } from '../../src/domain/calculator'

describe('calculator integration', () => {
  it('caso Excel: 138 trabajadores, 25 a seleccionar', () => {
    const result = calculateSelectorResult({
      totalWorkers: 138,
      workersToSelect: 25,
    })

    expect(result.exactPercentage).toBeCloseTo(18.11594203, 5)
    expect(result.threshold).toBe(18)
    expect(result.estimatedWorkers).toBe(25)
    expect(result.activeSwitchLabels).toEqual(['16%', '2%'])
    expect(result.switches.col16).toBe(1)
    expect(result.switches.col2).toBe(1)
  })

  it('rechaza total de trabajadores inválido', () => {
    const error = validateCalculatorInput({
      totalWorkers: 0,
      workersToSelect: 5,
    })

    expect(error?.field).toBe('totalWorkers')
  })

  it('rechaza seleccionar más que el total', () => {
    const error = validateCalculatorInput({
      totalWorkers: 10,
      workersToSelect: 15,
    })

    expect(error?.message).toContain('más trabajadores que el total')
  })

  it('caso 0 seleccionados → umbral 0%', () => {
    const result = calculateSelectorResult({
      totalWorkers: 100,
      workersToSelect: 0,
    })

    expect(result.threshold).toBe(0)
    expect(result.activeSwitchLabels).toEqual([])
  })
})
