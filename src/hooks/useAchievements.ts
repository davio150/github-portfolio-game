import { useCallback, useState } from 'react'
import { ACHIEVEMENTS, AchievementKey } from '@data/achievements'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number
}

interface UseAchievementsReturn {
  achievements: Achievement[]
  unlockedAchievements: Achievement[]
  checkAndUnlockAchievements: (stats: {
    fishCaught: number
    score: number
    raritieCaught: string[]
  }) => AchievementKey | null
  getAchievementProgress: () => number
}

export const useAchievements = (): UseAchievementsReturn => {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set())

  const checkAndUnlockAchievements = useCallback(
    (stats: { fishCaught: number; score: number; raritieCaught: string[] }): AchievementKey | null => {
      let newlyUnlocked: AchievementKey | null = null

      Object.entries(ACHIEVEMENTS).forEach(([key, achievement]) => {
        if (unlockedIds.has(achievement.id)) return // Already unlocked

        let isUnlocked = false
        if (key === 'RARE_CATCH' || key === 'LEGENDARY_CATCH') {
          isUnlocked = achievement.condition(stats.raritieCaught)
        } else if (key === 'SPEEDSTER') {
          // Speedster requires special timing logic
          return
        } else {
          isUnlocked = achievement.condition(stats.fishCaught || stats.score)
        }

        if (isUnlocked) {
          setUnlockedIds((prev) => new Set(prev).add(achievement.id))
          newlyUnlocked = key as AchievementKey
        }
      })

      return newlyUnlocked
    },
    [unlockedIds]
  )

  const achievements: Achievement[] = Object.entries(ACHIEVEMENTS).map(([_, achievement]) => ({
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    icon: achievement.icon,
    unlocked: unlockedIds.has(achievement.id),
    unlockedAt: unlockedIds.has(achievement.id) ? Date.now() : undefined,
  }))

  const unlockedAchievements = achievements.filter((a) => a.unlocked)

  const getAchievementProgress = useCallback(() => {
    return (unlockedAchievements.length / achievements.length) * 100
  }, [achievements.length, unlockedAchievements.length])

  return {
    achievements,
    unlockedAchievements,
    checkAndUnlockAchievements,
    getAchievementProgress,
  }
}
