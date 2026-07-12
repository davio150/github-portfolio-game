import { useState } from 'react'
import './AchievementsPanel.css'

export interface AchievementItem {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number
}

export interface AchievementsPanelProps {
  achievements: AchievementItem[]
  isOpen: boolean
  onClose: () => void
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  achievements,
  isOpen,
  onClose,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const progress = (unlockedCount / achievements.length) * 100

  return (
    <>
      {isOpen && <div className="achievements-overlay" onClick={onClose} />}
      <div className={`achievements-panel ${isOpen ? 'open' : ''}`}>
        <div className="achievements-header">
          <h2>🏆 Achievements</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-text">
              {unlockedCount} / {achievements.length} Unlocked
            </span>
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-badge">
                <span className="badge-icon">{achievement.icon}</span>
              </div>
              <div className="achievement-info">
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
