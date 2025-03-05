import { motion } from 'framer-motion'

export interface SpinProps {
  size?: 'small' | 'default' | 'large'
  color?: string
  tip?: string
  spinning?: boolean
}

export default function CircleLoading(props: SpinProps) {
  const { size = 'default', color = '#1890ff', tip = '', spinning = true } = props

  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  const spinTransition = {
    repeat: Infinity,
    ease: 'linear',
    duration: 1,
  }

  if (!spinning) return null

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} ${color} border-2 border-solid border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      {tip && <div className={`mt-2 text-sm ${color}`}>{tip}</div>}
    </div>
  )
}
