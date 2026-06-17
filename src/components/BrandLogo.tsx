import { ALCOSAFE_LOGO_ALT, ALCOSAFE_LOGO_SRC } from '../constants/branding'

interface BrandLogoProps {
  className?: string
  variant?: 'header' | 'hero'
}

const sizeClasses: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  header: 'h-10 w-auto max-w-[180px] object-contain',
  hero: 'mx-auto h-20 w-auto max-w-xs object-contain sm:h-24',
}

export function BrandLogo({ className = '', variant = 'header' }: BrandLogoProps) {
  return (
    <img
      src={ALCOSAFE_LOGO_SRC}
      alt={ALCOSAFE_LOGO_ALT}
      className={`${sizeClasses[variant]} ${className}`}
    />
  )
}
