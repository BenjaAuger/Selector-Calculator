export interface TutorialStep {
  title: string
  description: string
  icon: string
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: '🎯',
    title: '¿Qué es esta calculadora?',
    description:
      'Esta herramienta le ayuda a configurar el selector aleatorio de su empresa. Según la cantidad de trabajadores y cuántos desea seleccionar, calcula el porcentaje y le indica qué interruptores activar en el dispositivo físico.',
  },
  {
    icon: '👥',
    title: 'Paso 1: Total de trabajadores',
    description:
      'Ingrese el número total de trabajadores de su empresa. Este es el universo completo de personas entre las que se realizará la selección aleatoria.',
  },
  {
    icon: '✅',
    title: 'Paso 2: Trabajadores a seleccionar',
    description:
      'Indique cuántos trabajadores desea seleccionar aproximadamente. La calculadora convertirá esta cantidad en un porcentaje y lo ajustará al valor más cercano que permite el dispositivo.',
  },
  {
    icon: '⚙️',
    title: 'Paso 3: Configurar interruptores',
    description:
      'El resultado muestra un panel interactivo con 8 interruptores (64%, 32%, 16%, 8%, 4%, 2%, 1% y 0.5%). Puede hacer clic en cada uno para activarlo o desactivarlo; el umbral y la estimación se actualizan al instante. Los que queden en verde (ON) son los que debe configurar en el dispositivo físico.',
  },
]
