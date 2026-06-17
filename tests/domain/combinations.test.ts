import { describe, expect, it } from 'vitest'
import {
  COMBINATION_TABLE,
  generateAllCombinations,
  findCombinationByThreshold,
} from '../../src/domain/combinations'
import { calculateSwitchValue } from '../../src/domain/switchEncoder'

describe('combinations', () => {
  it('genera exactamente 256 combinaciones únicas', () => {
    const combinations = generateAllCombinations()
    const values = combinations.map((c) => c.value)
    const uniqueValues = new Set(values)

    expect(combinations).toHaveLength(256)
    expect(uniqueValues.size).toBe(256)
  })

  it('cubre rango 0% – 127.5% en pasos de 0.5', () => {
    const values = COMBINATION_TABLE.map((c) => c.value)

    expect(Math.min(...values)).toBe(0)
    expect(Math.max(...values)).toBe(127.5)
    expect(values).toContain(0.5)
    expect(values).toContain(18)
  })

  it('cada combinación tiene valor igual a suma de pesos activos', () => {
    for (const row of COMBINATION_TABLE) {
      expect(calculateSwitchValue(row.switches)).toBe(row.value)
    }
  })

  it('encuentra combinación para umbral 18 (caso Excel)', () => {
    const row = findCombinationByThreshold(18)

    expect(row).toBeDefined()
    expect(row!.switches.col16).toBe(1)
    expect(row!.switches.col2).toBe(1)
    expect(row!.value).toBe(18)
  })
})
