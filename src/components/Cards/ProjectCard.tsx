import { useEffect, useRef, useState } from 'react'
import { Position } from '@types/index'
import './ProjectCard.css'

export interface ProjectCardProps {
  title: string
  description: string
  stack: string[]
  repository?: string
  liveDemo?: string
  difficulty: 'easy' | 'medium' | 'hard'
  completed: string
  facts?: string[]
  onClose: () => void
  isVisible: boolean
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  stack,
  repository,
  liveDemo,
  difficulty,
  completed,
  facts,
  onClose,
  isVisible,
}) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setAnimate(true)
    } else {
      setAnimate(false)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className={`project-card-overlay ${animate ? 'active' : ''}`} onClick={onClose}>
      <div className="project-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          <button className="card-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="card-content">
          {/* Description */}
          <p className="card-description">{description}</p>

          {/* Tech Stack */}
          <div className="card-section">
            <h3 className="section-title">Tech Stack</h3>
            <div className="tech-stack">
              {stack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="card-section">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Difficulty</span>
                <span className={`difficulty ${difficulty}`}>{difficulty}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Completed</span>
                <span className="info-value">{new Date(completed).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Facts */}
          {facts && facts.length > 0 && (
            <div className="card-section">
              <h3 className="section-title">Did you know?</h3>
              <ul className="facts-list">
                {facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer with Links */}
        <div className="card-footer">
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className="card-button repo-button"
            >
              📂 Repository
            </a>
          )}
          {liveDemo && (
            <a href={liveDemo} target="_blank" rel="noopener noreferrer" className="card-button demo-button">
              🚀 Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
