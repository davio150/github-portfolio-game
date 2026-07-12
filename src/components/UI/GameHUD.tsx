import { useGameState } from '@hooks/useGameState'
import './GameHUD.css'

export const GameHUD: React.FC = () => {
  const { score, fishCaught, level, completionPercentage } = useGameState()

  return (
    <div className="game-hud">
      <div className="hud-item">
        <span className="hud-icon">⭐</span>
        <span className="hud-value">{score}</span>
      </div>
      <div className="hud-item">
        <span className="hud-icon">🐟</span>
        <span className="hud-value">{fishCaught}</span>
      </div>
      <div className="hud-item">
        <span className="hud-icon">📍</span>
        <span className="hud-value">Level {level}</span>
      </div>
      <div className="hud-item">
        <span className="hud-icon">📊</span>
        <span className="hud-value">{Math.round(completionPercentage)}%</span>
      </div>
    </div>
  )
}
