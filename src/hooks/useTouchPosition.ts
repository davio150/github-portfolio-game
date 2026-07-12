import { useEffect, useRef, useState } from 'react'
import { Position } from '@types/index'

interface UseTouchPositionOptions {
  smoothing?: number
  onMove?: (position: Position) => void
}

export const useTouchPosition = (options?: UseTouchPositionOptions) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const smoothingRef = useRef(options?.smoothing ?? 0.1)
  const lastPositionRef = useRef<Position>({ x: 0, y: 0 })
  const movementTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const newPosition = { x: touch.clientX, y: touch.clientY }

        const smoothedPosition = {
          x: lastPositionRef.current.x + (newPosition.x - lastPositionRef.current.x) * smoothingRef.current,
          y: lastPositionRef.current.y + (newPosition.y - lastPositionRef.current.y) * smoothingRef.current,
        }

        setPosition(smoothedPosition)
        lastPositionRef.current = smoothedPosition

        setIsMoving(true)
        clearTimeout(movementTimeoutRef.current)

        movementTimeoutRef.current = setTimeout(() => {
          setIsMoving(false)
        }, 100)

        options?.onMove?.(smoothedPosition)
      }
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      clearTimeout(movementTimeoutRef.current)
    }
  }, [])

  return { position, isMoving }
}
