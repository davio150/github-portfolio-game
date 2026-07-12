import { useEffect, useRef, useState } from 'react'
import { Position } from '@types/index'
import { StarCursor } from '@components/StarCursor/StarCursor'
import { Fish } from '@components/Fish/Fish'
import { OceanBackground } from '@components/Ocean/OceanBackground'
import { GameHUD } from '@components/UI/GameHUD'
import { useFishManager } from '@hooks/useFishManager'
import { useGameState } from '@hooks/useGameState'
import { createBubbles, createSparkles, drawParticles, Particle } from '@animations/particleEffects'
import './App.css'

function App() {
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const [cursorPos, setCursorPos] = useState<Position>({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const particleFrameRef = useRef<number>()
  const spawnIntervalRef = useRef<NodeJS.Timeout>()

  const gameState = useGameState()
  const { fish, catchFish, spawnFish, resetFish } = useFishManager({
    containerWidth: containerSize.width,
    containerHeight: containerSize.height,
    initialFishCount: 3 + gameState.level,
    maxFishCount: 8 + gameState.level * 2,
  })

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        setCursorPos({ x: touch.clientX, y: touch.clientY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Particle rendering
  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = containerSize.width
    canvas.height = containerSize.height

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setParticles((prevParticles) => drawParticles(ctx, prevParticles))
      particleFrameRef.current = requestAnimationFrame(renderParticles)
    }

    particleFrameRef.current = requestAnimationFrame(renderParticles)

    return () => {
      if (particleFrameRef.current) {
        cancelAnimationFrame(particleFrameRef.current)
      }
    }
  }, [containerSize])

  // Fish spawning
  useEffect(() => {
    const spawnFishPeriodically = () => {
      if (fish.length < 8 + gameState.level * 2) {
        spawnFish()
      }
    }

    spawnIntervalRef.current = setInterval(spawnFishPeriodically, 3000)

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
      }
    }
  }, [fish.length, gameState.level, spawnFish])

  // Handle fish catch
  const handleCatchFish = (fishId: string) => {
    const caughtFish = fish.find((f) => f.id === fishId)
    if (!caughtFish) return

    // Update game state
    const points = caughtFish.rarity === 'legendary' ? 50 : caughtFish.rarity === 'rare' ? 25 : 10
    gameState.updateScore(points)
    gameState.incrementFishCaught()

    // Create particle effects
    const bubbles = createBubbles(caughtFish.x, caughtFish.y, 8)
    const sparkles = createSparkles(caughtFish.x, caughtFish.y, 12)
    setParticles((prev) => [...prev, ...bubbles, ...sparkles])

    // Remove fish
    catchFish(fishId)
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        resetFish()
        gameState.resetGame()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [resetFish])

  return (
    <div className="app" ref={gameContainerRef}>
      {/* Ocean Background */}
      <OceanBackground />

      {/* Game Container */}
      <div className="game-container">
        {/* Star Cursor */}
        <StarCursor enabled={true} />

        {/* Fish Container */}
        <div className="fish-container">
          {fish.map((f) => (
            <Fish
              key={f.id}
              fish={f}
              cursorPos={cursorPos}
              onCatch={handleCatchFish}
              containerWidth={containerSize.width}
              containerHeight={containerSize.height}
            />
          ))}
        </div>

        {/* Particle Canvas */}
        <canvas
          ref={particleCanvasRef}
          className="particle-canvas"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50,
            pointerEvents: 'none',
          }}
        />

        {/* Game HUD */}
        <GameHUD />

        {/* Debug Info */}
        <div className="debug-info">
          <p>Fish: {fish.length}</p>
          <p>FPS: ~60</p>
          <p>Press R to reset</p>
        </div>
      </div>
    </div>
  )
}

export default App
