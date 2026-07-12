import { useEffect, useRef, useState } from 'react'
import { Position } from '@types/index'

interface UseMousePositionOptions {
  smoothing?: number
  onMove?: (position: Position) => void
}

export const useMousePosition = (options?: UseMousePositionOptions) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const smoothingRef = useRef(options?.smoothing ?? 0.1)
  const lastPositionRef = useRef<Position>({ x: 0, y: 0 })
  const movementTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }

      // Apply smoothing
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

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(movementTimeoutRef.current)
    }
  }, [])

  return { position, isMoving }
}
