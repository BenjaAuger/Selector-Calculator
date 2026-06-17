import { SWITCH_ORDER, SWITCH_WEIGHTS } from './constants'
import type { CombinationRow, SwitchConfiguration } from './types'

/**
 * Genera las 256 combinaciones únicas (0% – 127.5% en pasos de 0.5).
 * Equivalente a la hoja Combinaciones del Excel.
 */
export function generateAllCombinations(): CombinationRow[] {
  const combinations: CombinationRow[] = []

  for (let i = 0; i < 256; i++) {
    const bits = i
      .toString(2)
      .padStart(8, '0')
      .split('')
      .map((b) => Number(b) as 0 | 1)

    const switches = {} as SwitchConfiguration
    let value = 0

    SWITCH_ORDER.forEach((switchId, index) => {
      switches[switchId] = bits[index]
      value += SWITCH_WEIGHTS[switchId] * bits[index]
    })

    combinations.push({ switches, value })
  }

  return combinations.sort((a, b) => a.value - b.value)
}

/** Tabla precalculada de combinaciones (uso interno) */
export const COMBINATION_TABLE = generateAllCombinations()

/**
 * Busca la combinación exacta para un umbral dado.
 * Equivalente Excel: INDEX/MATCH($B$5, Combinaciones!$I:$I, 0)
 */
export function findCombinationByThreshold(
  threshold: number,
): CombinationRow | undefined {
  return COMBINATION_TABLE.find((row) => row.value === threshold)
}
