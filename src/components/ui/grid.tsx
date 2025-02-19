interface GridProps {
  children: React.ReactNode
  className?: string
}

export function Grid({ children, className = '' }: GridProps) {
  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {children}
    </div>
  )
}
