import { SWITCH_ORDER, SWITCH_WEIGHTS } from './constants'
import type { SwitchConfiguration, SwitchId, SwitchState } from './types'

const EPSILON = 1e-9

/**
 * Codifica un umbral en la combinación de interruptores ON/OFF.
 * Algoritmo greedy equivalente a INDEX/MATCH sobre hoja Combinaciones.
 */
export function encodeThresholdToSwitches(threshold: number): SwitchConfiguration {
  let remaining = threshold
  const config = {} as SwitchConfiguration

  for (const switchId of SWITCH_ORDER) {
    const weight = SWITCH_WEIGHTS[switchId]
    if (remaining >= weight - EPSILON) {
      config[switchId] = 1
      remaining = Math.round((remaining - weight) * 1000) / 1000
    } else {
      config[switchId] = 0
    }
  }

  return config
}

/**
 * Calcula el valor total (suma ponderada) de una configuración de interruptores.
 */
export function calculateSwitchValue(config: SwitchConfiguration): number {
  return SWITCH_ORDER.reduce(
    (sum, switchId) => sum + SWITCH_WEIGHTS[switchId] * config[switchId],
    0,
  )
}

/**
 * Alterna el estado de un interruptor y devuelve una nueva configuración.
 */
export function toggleSwitch(
  config: SwitchConfiguration,
  switchId: SwitchId,
): SwitchConfiguration {
  return {
    ...config,
    [switchId]: config[switchId] === 1 ? 0 : 1,
  }
}

/**
 * Devuelve las etiquetas de los interruptores activos (ej. ["16%", "2%"]).
 */
export function getActiveSwitchLabels(config: SwitchConfiguration): string[] {
  return SWITCH_ORDER.filter((id) => config[id] === 1).map(
    (id) => `${SWITCH_WEIGHTS[id]}%`,
  )
}

/**
 * Convierte configuración a array de estados en orden de peso descendente.
 */
export function switchesToArray(config: SwitchConfiguration): SwitchState[] {
  return SWITCH_ORDER.map((id) => config[id])
}
