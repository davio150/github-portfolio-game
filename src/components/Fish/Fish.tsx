import { useEffect, useRef, useState } from 'react'
import { Fish as FishType, Position } from '@types/index'
import { distance } from '@utils/distance'
import './Fish.css'

interface FishProps {
  fish: FishType
  cursorPos: Position
  onCatch: (fishId: string) => void
  containerWidth: number
  containerHeight: number
}

export const Fish: React.FC<FishProps> = ({
  fish,
  cursorPos,
  onCatch,
  containerWidth,
  containerHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [position, setPosition] = useState<Position>({ x: fish.x, y: fish.y })
  const fishDataRef = useRef({ ...fish })
  const animationFrameRef = useRef<number>()
  const directionChangeTimeoutRef = useRef<NodeJS.Timeout>()

  const CATCH_RADIUS = fish.size + 20
  const ESCAPE_DISTANCE = 100
  const DIRECTION_CHANGE_INTERVAL = 3000 + Math.random() * 2000

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      const fishData = fishDataRef.current
      const distToCursor = distance(fishData, cursorPos)

      // Escape behavior
      if (distToCursor < ESCAPE_DISTANCE) {
        const angle = Math.atan2(fishData.y - cursorPos.y, fishData.x - cursorPos.x)
        fishData.direction = angle
      }

      // Update position
      fishData.x += Math.cos(fishData.direction) * fishData.speed
      fishData.y += Math.sin(fishData.direction) * fishData.speed

      // Bounce off edges
      if (fishData.x - fish.size < 0 || fishData.x + fish.size > containerWidth) {
        fishData.direction = Math.PI - fishData.direction
        fishData.x = Math.max(fish.size, Math.min(containerWidth - fish.size, fishData.x))
      }
      if (fishData.y - fish.size < 0 || fishData.y + fish.size > containerHeight) {
        fishData.direction = -fishData.direction
        fishData.y = Math.max(fish.size, Math.min(containerHeight - fish.size, fishData.y))
      }

      setPosition({ x: fishData.x, y: fishData.y })

      // Check catch
      if (distToCursor < CATCH_RADIUS && !fish.caught) {
        onCatch(fish.id)
        return
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Random direction changes
    const changeDirection = () => {
      if (!fish.caught) {
        fishDataRef.current.direction += (Math.random() - 0.5) * Math.PI * 0.5
        directionChangeTimeoutRef.current = setTimeout(
          changeDirection,
          DIRECTION_CHANGE_INTERVAL
        )
      }
    }

    directionChangeTimeoutRef.current = setTimeout(
      changeDirection,
      DIRECTION_CHANGE_INTERVAL
    )

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (directionChangeTimeoutRef.current) {
        clearTimeout(directionChangeTimeoutRef.current)
      }
    }
  }, [fish, cursorPos, onCatch, containerWidth, containerHeight])

  return (
    <div
      className={`fish fish-${fish.type} ${fish.rarity}`}
      style={{
        position: 'absolute',
        left: `${(position.x / containerWidth) * 100}%`,
        top: `${(position.y / containerHeight) * 100}%`,
        transform: `translate(-50%, -50%) rotate(${fishDataRef.current.direction * (180 / Math.PI)}deg)`,
        cursor: 'pointer',
      }}
      onClick={() => onCatch(fish.id)}
      title="Catch me!"
    >
      <svg
        width={fish.size * 2}
        height={fish.size * 2}
        viewBox="0 0 100 100"
        className="fish-svg"
      >
        {/* Fish body */}
        <ellipse cx="50" cy="50" rx="35" ry="25" className="fish-body" />
        {/* Fish eye */}
        <circle cx="65" cy="45" r="4" className="fish-eye" />
        {/* Fish tail */}
        <polygon points="20,50 0,30 5,50 0,70" className="fish-tail" />
      </svg>
    </div>
  )
}
