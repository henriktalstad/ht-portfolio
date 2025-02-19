interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Container({ children, className = '', size = 'md' }: ContainerProps) {
  const maxWidthClass = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
  }[size]

  return (
    <div className={`mx-auto w-full px-6 md:px-8 ${maxWidthClass} ${className}`}>
      {children}
    </div>
  )
}
