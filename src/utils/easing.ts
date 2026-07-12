/**
 * Easing functions for smooth animations
 */

export const easing = {
  linear: (t: number): number => t,
  
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => 1 + (t - 1) ** 3,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2)),

  easeInQuart: (t: number): number => t ** 4,
  easeOutQuart: (t: number): number => 1 - (t - 1) ** 4,
  easeInOutQuart: (t: number): number => t < 0.5 ? 8 * t ** 4 : 1 - 8 * (t - 1) ** 4,

  easeInQuint: (t: number): number => t ** 5,
  easeOutQuint: (t: number): number => 1 + (t - 1) ** 5,
  easeInOutQuint: (t: number): number => t < 0.5 ? 16 * t ** 5 : 1 + 16 * (t - 1) ** 5,

  easeInExpo: (t: number): number => (t === 0 ? 0 : 2 ** (10 * t - 10)),
  easeOutExpo: (t: number): number => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
  easeInOutExpo: (t: number): number =>
    t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2,

  easeInCirc: (t: number): number => 1 - Math.sqrt(1 - t ** 2),
  easeOutCirc: (t: number): number => Math.sqrt(1 - (t - 1) ** 2),
  easeInOutCirc: (t: number): number =>
    t < 0.5 ? (1 - Math.sqrt(1 - (2 * t) ** 2)) / 2 : (Math.sqrt(1 - (-2 * t + 2) ** 2) + 1) / 2,
}

export type EasingFunction = (t: number) => number
