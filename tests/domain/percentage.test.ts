import { describe, expect, it } from 'vitest'
import { roundThreshold, calculatePercentage } from '../../src/domain/percentage'

describe('percentage', () => {
  it('calcula porcentaje exacto (B2/B1*100)', () => {
    expect(calculatePercentage(25, 138)).toBeCloseTo(18.11594203, 5)
  })

  it('redondea con MROUND a 0.5 (caso Excel 18.11594203 → 18)', () => {
    expect(roundThreshold(18.11594203)).toBe(18)
  })

  it('redondea 18.3 → 18.5', () => {
    expect(roundThreshold(18.3)).toBe(18.5)
  })

  it('redondea 18.2 → 18', () => {
    expect(roundThreshold(18.2)).toBe(18)
  })

  it('redondea 0 → 0', () => {
    expect(roundThreshold(0)).toBe(0)
  })
})
