import { useState } from 'react'
import { CalculatorWizard } from '../features/calculator/CalculatorWizard'
import { TutorialOverlay } from '../features/tutorial/TutorialOverlay'
import { BrandLogo } from '../components/BrandLogo'
import { TUTORIAL_STORAGE_KEY } from '../domain/constants'

export function HomePage() {
  const [tutorialKey, setTutorialKey] = useState(0)

  const handleShowTutorial = () => {
    localStorage.removeItem(TUTORIAL_STORAGE_KEY)
    setTutorialKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <BrandLogo variant="header" />
          </div>
          <button
            onClick={handleShowTutorial}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Ayuda
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <CalculatorWizard onShowTutorial={handleShowTutorial} />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        Calculadora del Selector Aleatorio · Configuración de interruptores
      </footer>

      <TutorialOverlay key={tutorialKey} onComplete={() => undefined} />
    </div>
  )
}
