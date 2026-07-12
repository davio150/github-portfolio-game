import { Position } from '@types/index'

/**
 * Calculate Euclidean distance between two positions
 */
export const distance = (p1: Position, p2: Position): number => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Calculate squared distance (faster, used for comparisons)
 */
export const distanceSquared = (p1: Position, p2: Position): number => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return dx * dx + dy * dy
}

/**
 * Check if a point is within a circular collision area
 */
export const isWithinRadius = (point: Position, center: Position, radius: number): boolean => {
  return distanceSquared(point, center) <= radius * radius
}

/**
 * Check collision between two circles
 */
export const checkCircleCollision = (
  p1: Position,
  r1: number,
  p2: Position,
  r2: number
): boolean => {
  const minDistance = r1 + r2
  return distanceSquared(p1, p2) <= minDistance * minDistance
}
