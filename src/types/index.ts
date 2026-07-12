/**
 * Game Type Definitions
 */

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Bounds extends Position, Size {}

export type FishType = 'goldfish' | 'bluefish' | 'clownfish' | 'jellyfish' | 'seahorse' | 'glowing' | 'rare'

export interface Fish extends Position {
  id: string
  type: FishType
  size: number
  speed: number
  direction: number // angle in radians
  caught: boolean
  health: number
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
}

export interface GameState {
  score: number
  fishCaught: number
  level: number
  timePlayed: number
  completionPercentage: number
  achievements: Achievement[]
  paused: boolean
  gameOver: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  unlockedAt?: number
  icon: string
}

export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  repository?: string
  liveDemo?: string
  screenshot?: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  completed: string
  facts?: string[]
}

export interface StarCursorState {
  x: number
  y: number
  vx: number
  vy: number
  trail: Position[]
  particles: Particle[]
}

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

export interface GameConfig {
  canvas: {
    width: number
    height: number
    fps: number
  }
  game: {
    initialFishCount: number
    maxFishCount: number
    spawnRate: number
    difficultyMultiplier: number
  }
  cursor: {
    size: number
    glowSize: number
    trailLength: number
    easing: number
  }
  particles: {
    enabled: boolean
    maxParticles: number
    bubblesPerCatch: number
    sparklesPerCatch: number
  }
  audio: {
    enabled: boolean
    masterVolume: number
    musicVolume: number
    sfxVolume: number
  }
}
