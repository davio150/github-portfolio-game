/**
 * Achievement Definitions
 */

export const ACHIEVEMENTS = {
  FIRST_CATCH: {
    id: 'first-catch',
    name: '🐟 First Catch',
    description: 'Catch your first fish',
    icon: '🐟',
    condition: (fishCaught: number) => fishCaught >= 1,
  },
  TEN_FISH: {
    id: 'ten-fish',
    name: '🎣 Fisher',
    description: 'Catch 10 fish',
    icon: '🎣',
    condition: (fishCaught: number) => fishCaught >= 10,
  },
  FIFTY_FISH: {
    id: 'fifty-fish',
    name: '🏆 Master Fisher',
    description: 'Catch 50 fish',
    icon: '🏆',
    condition: (fishCaught: number) => fishCaught >= 50,
  },
  HUNDRED_FISH: {
    id: 'hundred-fish',
    name: '👑 Legendary Fisher',
    description: 'Catch 100 fish',
    icon: '👑',
    condition: (fishCaught: number) => fishCaught >= 100,
  },
  RARE_CATCH: {
    id: 'rare-catch',
    name: '✨ Rare Catch',
    description: 'Catch a rare fish',
    icon: '✨',
    condition: (raritieCaught: string[]) => raritieCaught.includes('rare'),
  },
  LEGENDARY_CATCH: {
    id: 'legendary-catch',
    name: '🌟 Legendary Catch',
    description: 'Catch a legendary fish',
    icon: '🌟',
    condition: (raritieCaught: string[]) => raritieCaught.includes('legendary'),
  },
  THOUSAND_POINTS: {
    id: 'thousand-points',
    name: '💰 1000 Points',
    description: 'Reach 1000 points',
    icon: '💰',
    condition: (score: number) => score >= 1000,
  },
  SPEEDSTER: {
    id: 'speedster',
    name: '⚡ Speedster',
    description: 'Catch 5 fish in 60 seconds',
    icon: '⚡',
    condition: () => false, // Requires timed tracking
  },
}

export type AchievementKey = keyof typeof ACHIEVEMENTS
