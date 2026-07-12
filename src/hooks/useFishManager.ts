import { useCallback, useRef, useState } from 'react'
import { Fish, FishType } from '@types/index'

const FISH_TYPES: FishType[] = ['goldfish', 'bluefish', 'clownfish', 'jellyfish', 'seahorse', 'glowing', 'rare']
const RARITY_WEIGHTS = {
  common: 0.6,
  uncommon: 0.25,
  rare: 0.12,
  legendary: 0.03,
}

const getRandomRarity = (): 'common' | 'uncommon' | 'rare' | 'legendary' => {
  const rand = Math.random()
  if (rand < RARITY_WEIGHTS.legendary) return 'legendary'
  if (rand < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS.rare) return 'rare'
  if (rand < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS.rare + RARITY_WEIGHTS.uncommon) return 'uncommon'
  return 'common'
}

const getRandomType = (): FishType => {
  return FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)]
}

interface UseFishManagerOptions {
  containerWidth: number
  containerHeight: number
  initialFishCount?: number
  maxFishCount?: number
}

export const useFishManager = (options: UseFishManagerOptions) => {
  const {
    containerWidth,
    containerHeight,
    initialFishCount = 3,
    maxFishCount = 15,
  } = options

  const [fish, setFish] = useState<Fish[]>(
    Array.from({ length: initialFishCount }, (_, i) => ({
      id: `fish-${i}`,
      type: getRandomType(),
      x: Math.random() * (containerWidth - 100) + 50,
      y: Math.random() * (containerHeight - 100) + 50,
      size: Math.random() * 15 + 20,
      speed: Math.random() * 2 + 1,
      direction: Math.random() * Math.PI * 2,
      caught: false,
      health: 100,
      rarity: getRandomRarity(),
    }))
  )

  const spawnTimeoutRef = useRef<NodeJS.Timeout>()

  const spawnFish = useCallback(() => {
    if (fish.length < maxFishCount) {
      const newFish: Fish = {
        id: `fish-${Date.now()}`,
        type: getRandomType(),
        x: Math.random() * (containerWidth - 100) + 50,
        y: Math.random() * (containerHeight - 100) + 50,
        size: Math.random() * 15 + 20,
        speed: Math.random() * 2 + 1,
        direction: Math.random() * Math.PI * 2,
        caught: false,
        health: 100,
        rarity: getRandomRarity(),
      }

      setFish((prev) => [...prev, newFish])
    }
  }, [fish.length, maxFishCount, containerWidth, containerHeight])

  const catchFish = useCallback((fishId: string) => {
    setFish((prev) => prev.filter((f) => f.id !== fishId))
  }, [])

  const resetFish = useCallback(() => {
    setFish(
      Array.from({ length: initialFishCount }, (_, i) => ({
        id: `fish-${i}`,
        type: getRandomType(),
        x: Math.random() * (containerWidth - 100) + 50,
        y: Math.random() * (containerHeight - 100) + 50,
        size: Math.random() * 15 + 20,
        speed: Math.random() * 2 + 1,
        direction: Math.random() * Math.PI * 2,
        caught: false,
        health: 100,
        rarity: getRandomRarity(),
      }))
    )
  }, [initialFishCount, containerWidth, containerHeight])

  return {
    fish,
    spawnFish,
    catchFish,
    resetFish,
  }
}
