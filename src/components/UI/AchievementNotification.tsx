import { useEffect, useState } from 'react'
import './AchievementNotification.css'

export interface AchievementNotificationProps {
  icon: string
  name: string
  description: string
  isVisible: boolean
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  icon,
  name,
  description,
  isVisible,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!show) return null

  return (
    <div className={`achievement-notification ${show ? 'show' : ''}`}>
      <div className="achievement-icon">{icon}</div>
      <div className="achievement-content">
        <h3 className="achievement-name">{name}</h3>
        <p className="achievement-description">{description}</p>
      </div>
      <div className="achievement-glow"></div>
    </div>
  )
}
