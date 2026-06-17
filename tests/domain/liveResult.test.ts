import { describe, expect, it } from 'vitest'
import { toggleSwitch, calculateSwitchValue } from '../../src/domain/switchEncoder'
import {
  deriveResultFromSwitches,
  isSwitchConfigurationEqual,
} from '../../src/domain/liveResult'
import { calculateSelectorResult } from '../../src/domain/calculator'

describe('toggleSwitch', () => {
  it('alterna un interruptor de OFF a ON y viceversa', () => {
    const base = calculateSelectorResult({
      totalWorkers: 138,
      workersToSelect: 25,
    })

    const toggledOff = toggleSwitch(base.switches, 'col16')
    expect(toggledOff.col16).toBe(0)
    expect(calculateSwitchValue(toggledOff)).toBe(2)

    const toggledOn = toggleSwitch(toggledOff, 'col64')
    expect(toggledOn.col64).toBe(1)
    expect(calculateSwitchValue(toggledOn)).toBe(66)
  })
})

describe('deriveResultFromSwitches', () => {
  it('recalcula umbral y trabajadores estimados al cambiar interruptores', () => {
    const base = calculateSelectorResult({
      totalWorkers: 100,
      workersToSelect: 25,
    })

    const manualSwitches = toggleSwitch(base.switches, 'col64')
    const live = deriveResultFromSwitches(base, manualSwitches)

    expect(live.threshold).toBe(calculateSwitchValue(manualSwitches))
    expect(live.estimatedWorkers).toBe(Math.round((100 * live.threshold) / 100))
    expect(live.activeSwitchLabels).toContain('64%')
  })
})

describe('isSwitchConfigurationEqual', () => {
  it('detecta configuraciones iguales y distintas', () => {
    const a = calculateSelectorResult({
      totalWorkers: 138,
      workersToSelect: 25,
    }).switches

    const b = { ...a }
    const c = toggleSwitch(a, 'col1')

    expect(isSwitchConfigurationEqual(a, b)).toBe(true)
    expect(isSwitchConfigurationEqual(a, c)).toBe(false)
  })
})
