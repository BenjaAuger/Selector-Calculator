import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { BrandLogo } from '../../components/BrandLogo'
import { useSelectorCalculator } from '../../application/useSelectorCalculator'
import { StepTotalWorkers } from './StepTotalWorkers'
import { StepWorkersToSelect } from './StepWorkersToSelect'
import { ResultSummary } from './ResultSummary'

interface CalculatorWizardProps {
  onShowTutorial: () => void
}

export function CalculatorWizard({ onShowTutorial }: CalculatorWizardProps) {
  const calculator = useSelectorCalculator()

  const wizardStepNumber =
    calculator.step === 'total' ? 1 : calculator.step === 'select' ? 2 : 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {calculator.step === 'landing' && (
        <div className="space-y-6 text-center">
          <div>
            <BrandLogo variant="hero" />
            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Calculadora del Selector Aleatorio
            </h1>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Determine qué interruptores activar en su dispositivo según la
              cantidad de trabajadores que desea seleccionar.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={calculator.startCalculator} fullWidth>
              Comenzar
            </Button>
            <Button variant="ghost" onClick={onShowTutorial}>
              Ver tutorial
            </Button>
          </div>
        </div>
      )}

      {(calculator.step === 'total' || calculator.step === 'select') && (
        <>
          <ProgressBar currentStep={wizardStepNumber} totalSteps={2} />

          {calculator.step === 'total' && (
            <StepTotalWorkers
              value={calculator.totalWorkers}
              error={
                calculator.error?.field === 'totalWorkers'
                  ? calculator.error.message
                  : undefined
              }
              onChange={calculator.setTotalWorkers}
              onNext={calculator.submitTotalWorkers}
              onBack={() => calculator.goToStep('landing')}
            />
          )}

          {calculator.step === 'select' && (
            <StepWorkersToSelect
              value={calculator.workersToSelect}
              totalWorkers={calculator.totalWorkers}
              error={
                calculator.error?.field === 'workersToSelect'
                  ? calculator.error.message
                  : undefined
              }
              onChange={calculator.setWorkersToSelect}
              onNext={calculator.submitWorkersToSelect}
              onBack={() => calculator.goToStep('total')}
            />
          )}
        </>
      )}

      {calculator.step === 'result' && calculator.result && (
        <ResultSummary
          key={`${calculator.result.totalWorkers}-${calculator.result.workersToSelect}-${calculator.result.threshold}`}
          result={calculator.result}
          onReset={calculator.reset}
        />
      )}
    </Card>
  )
}
