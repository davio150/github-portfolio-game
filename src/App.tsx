import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Initialize game
    console.log('Game initialized')
  }, [])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-ocean-900 to-ocean-800 relative overflow-hidden">
      {/* Main Game Container */}
      <div className="w-full h-full relative">
        {/* Ocean Background */}
        <div className="absolute inset-0 bg-ocean-800 opacity-50"></div>
        
        {/* Game Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">🐟 GitHub Portfolio Game</h1>
            <p className="text-xl mb-8 opacity-80">Coming Soon...</p>
            <button
              onClick={() => setCount((count) => count + 1)}
              className="px-8 py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-bold rounded-lg transition-colors"
            >
              Start Game ({count})
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
