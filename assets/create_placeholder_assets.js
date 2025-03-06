// This script will generate placeholder assets for the game
// Run this in a browser console after loading Phaser or use a Node.js environment with Canvas support

// Function to create a colored rectangle
function createColorRect(width, height, color, filename) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Fill with color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    // Add some visual elements
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, width - 4, height - 4);
    
    // Add text label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = Math.floor(height / 4) + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(filename, width / 2, height / 2);
    
    console.log(`Created placeholder for ${filename}: ${width}x${height}`);
    return canvas.toDataURL('image/png');
}

// Function to create a sprite sheet
function createSpriteSheet(frameWidth, frameHeight, frames, color, filename) {
    const canvas = document.createElement('canvas');
    canvas.width = frameWidth * frames;
    canvas.height = frameHeight;
    const ctx = canvas.getContext('2d');
    
    // Fill each frame
    for (let i = 0; i < frames; i++) {
        // Base color
        ctx.fillStyle = color;
        ctx.fillRect(i * frameWidth, 0, frameWidth, frameHeight);
        
        // Frame number
        ctx.fillStyle = '#FFFFFF';
        ctx.font = Math.floor(frameHeight / 3) + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i + 1, i * frameWidth + frameWidth / 2, frameHeight / 2);
        
        // Border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(i * frameWidth + 1, 1, frameWidth - 2, frameHeight - 2);
    }
    
    console.log(`Created sprite sheet for ${filename}: ${frames} frames of ${frameWidth}x${frameHeight}`);
    return canvas.toDataURL('image/png');
}

// Generate background
const background = createColorRect(800, 400, '#87CEEB', 'background.png');

// Generate ground platform
const platform = createColorRect(200, 32, '#8B4513', 'platform.png');

// Generate health indicator
const health = createColorRect(32, 32, '#FF0000', 'health.png');

// Generate player sprite sheet (12 frames for movements and attack)
const player = createSpriteSheet(32, 48, 12, '#FFD700', 'player.png');

// Generate enemy sprite sheets
const ratRed = createSpriteSheet(32, 32, 4, '#FF0000', 'rat_red.png');
const ratBlue = createSpriteSheet(32, 32, 4, '#0000FF', 'rat_blue.png');

// Generate boss sprite sheet
const condor = createSpriteSheet(64, 64, 4, '#800080', 'condor.png');

// Instructions for downloading these assets
console.log(`
INSTRUCTIONS:
1. Right-click on each of these data URLs in the browser
2. Select "Save Image As"
3. Save with the filename provided
4. Place all files in the assets/ directory

background: ${background}

platform: ${platform}

health: ${health}

player: ${player}

rat_red: ${ratRed}

rat_blue: ${ratBlue}

condor: ${condor}
`);

// Notes about creating a simple background music file
console.log(`
For background_music.mp3, you'll need to:
1. Use a tool like Audacity or an online music generator
2. Create a short looping music clip
3. Export as MP3
4. Place in the assets/ directory
`); 