import { create } from 'zustand'
import { GameState, Achievement } from '@types/index'

interface GameStore extends GameState {
  updateScore: (points: number) => void
  incrementFishCaught: () => void
  setLevel: (level: number) => void
  setTimePlayed: (time: number) => void
  setCompletionPercentage: (percentage: number) => void
  unlockAchievement: (achievement: Achievement) => void
  setPaused: (paused: boolean) => void
  setGameOver: (gameOver: boolean) => void
  resetGame: () => void
}

const initialState: GameState = {
  score: 0,
  fishCaught: 0,
  level: 1,
  timePlayed: 0,
  completionPercentage: 0,
  achievements: [],
  paused: false,
  gameOver: false,
}

export const useGameState = create<GameStore>((set) => ({
  ...initialState,

  updateScore: (points) =>
    set((state) => ({
      score: state.score + points,
    })),

  incrementFishCaught: () =>
    set((state) => ({
      fishCaught: state.fishCaught + 1,
    })),

  setLevel: (level) =>
    set(() => ({
      level,
    })),

  setTimePlayed: (time) =>
    set(() => ({
      timePlayed: time,
    })),

  setCompletionPercentage: (percentage) =>
    set(() => ({
      completionPercentage: percentage,
    })),

  unlockAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, { ...achievement, unlocked: true, unlockedAt: Date.now() }],
    })),

  setPaused: (paused) =>
    set(() => ({
      paused,
    })),

  setGameOver: (gameOver) =>
    set(() => ({
      gameOver,
    })),

  resetGame: () =>
    set(() => initialState),
}))
