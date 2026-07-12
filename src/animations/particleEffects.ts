import { Position } from '@types/index'

export interface Particle extends Position {
  id: string
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  type: 'bubble' | 'sparkle' | 'dust'
}

export const createBubbles = (x: number, y: number, count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `bubble-${Date.now()}-${i}`,
    x,
    y,
    vx: (Math.random() - 0.5) * 3,
    vy: -Math.random() * 2 - 1,
    life: 1,
    maxLife: 2 + Math.random() * 1,
    size: Math.random() * 4 + 2,
    color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
    type: 'bubble' as const,
  }))
}

export const createSparkles = (x: number, y: number, count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `sparkle-${Date.now()}-${i}`,
    x,
    y,
    vx: (Math.random() - 0.5) * 5,
    vy: (Math.random() - 0.5) * 5,
    life: 1,
    maxLife: 0.6 + Math.random() * 0.4,
    size: Math.random() * 2 + 1,
    color: `rgba(255, 215, 0, ${Math.random() * 0.8 + 0.2})`,
    type: 'sparkle' as const,
  }))
}

export const createDust = (x: number, y: number, count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `dust-${Date.now()}-${i}`,
    x,
    y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 1,
    maxLife: 1 + Math.random() * 1,
    size: Math.random() * 3 + 1,
    color: `rgba(147, 112, 219, ${Math.random() * 0.6 + 0.2})`,
    type: 'dust' as const,
  }))
}

export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[]
): Particle[] => {
  return particles.filter((p) => {
    p.x += p.vx
    p.y += p.vy
    p.life -= 1 / 60 // Assuming 60 FPS
    p.vy += 0.1 // Slight gravity

    if (p.life <= 0) {
      return false
    }

    const alpha = (p.life / p.maxLife) * 0.8
    ctx.fillStyle = p.color.replace('1)', `${alpha})`)
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()

    return true
  })
}
