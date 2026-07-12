# GitHub Portfolio Game 🎮🐟

A simple CATCHING FISH clone built in JavaScript for learning mouse click and pointer swipe events.

## 🎯 Features

- **Interactive Star Cursor**: Smooth, glowing animated star that follows your mouse
- **Fish Catching Mechanic**: Click or hover over swimming fish to catch them
- **Project Information Cards**: Each fish reveals a project, skill, or achievement
- **Underwater Theme**: Beautiful ocean background with animations and effects
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Score System**: Track caught fish, achievements, and completion percentage
- **Particle Effects**: Bubbles, sparkles, and water effects on catch
- **Multiple Fish Types**: Different fish with unique behaviors and rarity levels
- **Progressive Difficulty**: Levels with increasing fish speed and quantity
- **Accessibility**: Keyboard navigation, reduced-motion support, ARIA labels

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Zustand** - State management

## 📁 Project Structure

```
src/
├── assets/              # Images, SVGs, sounds
├── components/          # React components
│   ├── Fish/           # Fish component and variants
│   ├── StarCursor/     # Custom cursor implementation
│   ├── Ocean/          # Ocean background and environment
│   ├── UI/             # HUD and UI elements
│   └── Cards/          # Information cards
├── hooks/              # Custom React hooks
├── animations/         # Animation utilities and GSAP configs
├── utils/              # Helper functions
├── data/               # Game data (projects, fish, achievements)
├── types/              # TypeScript type definitions
├── styles/             # Global styles
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/davio150/github-portfolio-game.git
cd github-portfolio-game

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# The game will open at http://localhost:5173
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📦 Deployment

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repository name:

```typescript
export default defineConfig({
  base: '/github-portfolio-game/',
  // ...
})
```

2. Build and deploy:

```bash
# Build the project
npm run build

# Push the dist folder to GitHub Pages
# (Configure your repository settings to deploy from /dist)
```

3. In repository settings, enable GitHub Pages and select the `main` branch with `/dist` folder.

## 🎮 How to Play

1. **Move your mouse** - The golden star cursor follows your movement
2. **Catch fish** - Click on or hover near swimming fish to catch them
3. **Learn about projects** - Each caught fish reveals a project or skill card
4. **Earn points** - Build your score and unlock achievements
5. **Progress through levels** - Fish get faster and more challenging
6. **Find rare fish** - Discover hidden rare fish for special rewards

## ⚙️ Customization

### Add Your Projects

Edit `src/data/projects.json`

### Customize Fish

Edit `src/data/fish.ts` to create new fish types with unique behaviors.

### Adjust Game Settings

Modify `src/data/gameConfig.ts` to tune difficulty, spawn rates, and particle effects.

## 🎵 Sound Design

To add sound effects:

1. Place audio files in `src/assets/sounds/`
2. Import and use the audio manager in components
3. Configure volume and mute settings in the UI

## ♿ Accessibility

- Respects `prefers-reduced-motion` media query
- Full keyboard navigation support
- ARIA labels on all interactive elements
- High color contrast
- Screen reader friendly

## 📊 Performance

- **Lighthouse Score**: Targets 90+
- **FPS**: Maintains 60 FPS on most devices
- **Bundle Size**: Optimized with code splitting
- **Mobile**: Touch-friendly and responsive

## 🐛 Debugging

Enable debug mode for development:

```typescript
// In src/App.tsx
const DEBUG = true;
```

This displays fish hitboxes, particle systems, and game state.

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Contact

For questions or feedback, reach out via:
- GitHub Issues
- Email
- Social Media

---

**Made with ❤️ and 🐟**
