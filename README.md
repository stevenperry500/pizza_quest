# Pixel Pizza Quest

A 2D side-scrolling game built with Phaser.js where you play as a pizza delivery hero fighting through an office filled with rats to deliver your pizza to the final boss!

## Game Features

- 800x400 canvas size with physics engine and gravity
- Controls: Arrow keys for movement, spacebar for attacking
- Health system (5 hits before game over)
- Multiple enemy types (rats with different behaviors)
- Final boss (Condor) at the end of the game
- Linear progression across 5 screens
- Background music

## How to Play

1. Open `index.html` in a web browser to start the game
2. Use arrow keys to move and jump
3. Press spacebar to attack enemies
4. Progress through 5 screens to reach the final boss
5. Defeat the Condor boss to win!

## Development

This game uses Phaser 3 loaded via CDN. The structure is:
- `index.html`: Main HTML file that loads Phaser and the game
- `game.js`: Main game logic (player movement, enemies, etc.)
- `assets/`: Directory containing images and audio

## Placeholder Assets

Currently, the game uses placeholder assets. You'll need to replace these with actual sprites and sounds:

- `background.png`: Office background
- `player.png`: Main character sprite sheet
- `rat_red.png` & `rat_blue.png`: Enemy sprite sheets
- `condor.png`: Boss sprite sheet
- `platform.png`: Platform image
- `health.png`: Health indicator
- `background_music.mp3`: Background music

## Future Improvements

- Add more enemy types
- Implement score system
- Add power-ups
- Create better animations
- Add sound effects for actions
