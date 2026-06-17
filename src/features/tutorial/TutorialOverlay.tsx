import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { TUTORIAL_STORAGE_KEY } from '../../domain/constants'
import { TUTORIAL_STEPS } from './tutorialSteps'

interface TutorialOverlayProps {
  onComplete: () => void
}

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(
    () => !localStorage.getItem(TUTORIAL_STORAGE_KEY),
  )

  const handleClose = (persist: boolean) => {
    if (persist) {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')
    }
    setIsVisible(false)
    onComplete()
  }

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      handleClose(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  if (!isVisible) return null

  const step = TUTORIAL_STEPS[currentStep]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <Card className="max-w-lg w-full">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-primary-600">
            Tutorial · {currentStep + 1}/{TUTORIAL_STEPS.length}
          </span>
          <button
            onClick={() => handleClose(false)}
            className="text-sm text-slate-400 hover:text-slate-600"
            aria-label="Cerrar tutorial"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 text-center">
          <span className="text-5xl" role="img" aria-hidden="true">
            {step.icon}
          </span>
          <h2 className="mt-4 text-xl font-bold text-slate-900">{step.title}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{step.description}</p>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-primary-600 w-6' : 'bg-slate-200 w-2'
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => handleClose(true)}
            className="order-3 sm:order-1"
          >
            No mostrar de nuevo
          </Button>
          <div className="flex gap-2 order-1 sm:order-2">
            {currentStep > 0 && (
              <Button variant="secondary" onClick={handlePrevious}>
                Anterior
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1 sm:flex-none">
              {currentStep < TUTORIAL_STEPS.length - 1 ? 'Siguiente' : 'Comenzar'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
