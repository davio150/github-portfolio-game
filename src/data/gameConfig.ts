import { GameConfig } from '@types/index'

export const gameConfig: GameConfig = {
  canvas: {
    width: 1280,
    height: 720,
    fps: 60,
  },
  game: {
    initialFishCount: 3,
    maxFishCount: 15,
    spawnRate: 2000, // ms
    difficultyMultiplier: 1.1,
  },
  cursor: {
    size: 24,
    glowSize: 40,
    trailLength: 10,
    easing: 0.15,
  },
  particles: {
    enabled: true,
    maxParticles: 200,
    bubblesPerCatch: 8,
    sparklesPerCatch: 12,
  },
  audio: {
    enabled: true,
    masterVolume: 1,
    musicVolume: 0.5,
    sfxVolume: 0.7,
  },
}
