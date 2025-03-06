# Pixel Pizza Quest

A 2D platformer game built with Phaser.js where you control a pizza delivery character navigating through multiple screens of challenges.

## Game Overview

Pixel Pizza Quest is a fast-paced platformer where you:
- Navigate through 5 progressively difficult screens
- Defeat enemies using projectiles
- Jump across platforms
- Face a final boss on the 5th screen

## Features

- Platformer physics with jumping and collision detection
- Multiple enemy types with different behaviors
- Projectile-based combat system
- Health tracking and game over state
- Screen-based level progression
- Final boss battle

## How to Play

1. Use arrow keys to move left/right and jump
2. Press spacebar to shoot projectiles
3. Reach the right side of each screen to advance to the next level
4. Defeat all enemies for bonus points
5. Face and defeat the final boss (Condor) on the 5th screen

## Browser Compatibility

The game includes multiple versions to ensure compatibility across browsers:
- `safari_phaser_game.html`: Optimized for Safari with Canvas renderer fallback
- `fallback_test.html`: DOM-based version with no Canvas/WebGL requirements
- `minimal_test.html`: Diagnostic version for testing
- `canvas_test.html`: Basic Canvas version for testing

## Development

This game was created as part of a hackathon project using Phaser 3.55.2.

### Running Locally

1. Clone the repository
2. Run a local server:
   ```
   python3 server.py
   ```
3. Access the game at http://localhost:8000/safari_phaser_game.html

## License

MIT 