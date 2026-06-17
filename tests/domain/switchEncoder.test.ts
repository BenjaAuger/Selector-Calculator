import { describe, expect, it } from 'vitest'
import {
  encodeThresholdToSwitches,
  calculateSwitchValue,
  getActiveSwitchLabels,
  toggleSwitch,
} from '../../src/domain/switchEncoder'

describe('switchEncoder', () => {
  it('codifica umbral 18% como interruptores 16% + 2%', () => {
    const config = encodeThresholdToSwitches(18)

    expect(config).toEqual({
      col64: 0,
      col32: 0,
      col16: 1,
      col8: 0,
      col4: 0,
      col2: 1,
      col1: 0,
      col05: 0,
    })
  })

  it('suma ponderada coincide con el umbral', () => {
    expect(calculateSwitchValue(encodeThresholdToSwitches(18))).toBe(18)
    expect(calculateSwitchValue(encodeThresholdToSwitches(127.5))).toBe(127.5)
    expect(calculateSwitchValue(encodeThresholdToSwitches(0.5))).toBe(0.5)
  })

  it('devuelve etiquetas de interruptores activos', () => {
    expect(getActiveSwitchLabels(encodeThresholdToSwitches(18))).toEqual([
      '16%',
      '2%',
    ])
  })

  it('toggleSwitch cambia solo el interruptor indicado', () => {
    const config = encodeThresholdToSwitches(18)
    const toggled = toggleSwitch(config, 'col16')

    expect(toggled.col16).toBe(0)
    expect(toggled.col2).toBe(1)
    expect(calculateSwitchValue(toggled)).toBe(2)
  })
})
