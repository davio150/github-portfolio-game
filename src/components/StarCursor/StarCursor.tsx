import { useEffect, useRef, useState } from 'react'
import { Position } from '@types/index'
import { easing } from '@utils/easing'
import './StarCursor.css'

interface StarCursorProps {
  enabled?: boolean
}

export const StarCursor: React.FC<StarCursorProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cursorPos, setCursorPos] = useState<Position>({ x: 0, y: 0 })
  const targetPosRef = useRef<Position>({ x: 0, y: 0 })
  const trailRef = useRef<Position[]>([])
  const animationFrameRef = useRef<number>()
  const isMovingRef = useRef(false)
  const moveTimeoutRef = useRef<NodeJS.Timeout>()

  const CURSOR_SIZE = 24
  const GLOW_SIZE = 40
  const TRAIL_LENGTH = 8
  const EASING_FACTOR = 0.15

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }
      isMovingRef.current = true

      clearTimeout(moveTimeoutRef.current)
      moveTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false
      }, 100)
    }

    const handleWindowResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      // Smooth cursor movement
      const t = EASING_FACTOR
      const smoothed = {
        x: cursorPos.x + (targetPosRef.current.x - cursorPos.x) * t,
        y: cursorPos.y + (targetPosRef.current.y - cursorPos.y) * t,
      }
      setCursorPos(smoothed)

      // Update trail
      trailRef.current.unshift({ ...smoothed })
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.pop()
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw glow
      const glowGradient = ctx.createRadialGradient(
        smoothed.x,
        smoothed.y,
        0,
        smoothed.x,
        smoothed.y,
        GLOW_SIZE
      )
      glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)')
      glowGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.1)')
      glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)')

      ctx.fillStyle = glowGradient
      ctx.fillRect(
        smoothed.x - GLOW_SIZE,
        smoothed.y - GLOW_SIZE,
        GLOW_SIZE * 2,
        GLOW_SIZE * 2
      )

      // Draw trail
      trailRef.current.forEach((pos, index) => {
        const alpha = (1 - index / TRAIL_LENGTH) * 0.3
        ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, (CURSOR_SIZE / 2) * (1 - index / TRAIL_LENGTH), 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw main star
      drawStar(ctx, smoothed.x, smoothed.y, 5, CURSOR_SIZE / 2, CURSOR_SIZE / 4)

      // Add twinkle effect
      if (isMovingRef.current && Math.random() > 0.7) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        const sparkleX = smoothed.x + (Math.random() - 0.5) * 20
        const sparkleY = smoothed.y + (Math.random() - 0.5) * 20
        ctx.beginPath()
        ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let step = Math.PI / spikes

      ctx.fillStyle = '#FFD700'
      ctx.strokeStyle = '#FFF'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy - outerRadius)

      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const x = cx + Math.sin(i * step) * radius
        const y = cy - Math.cos(i * step) * radius
        ctx.lineTo(x, y)
      }

      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleWindowResize)

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleWindowResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(moveTimeoutRef.current)
    }
  }, [enabled, cursorPos])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="star-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
