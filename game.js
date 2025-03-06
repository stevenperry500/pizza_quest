// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Global variables
let player;
let enemies;
let boss;
let platforms;
let cursors;
let gameOver = false;
let health = 5;
let healthText;
let currentScreen = 1;
let totalScreens = 5;
let backgroundMusic;
let attackKey;

// Initialize the game
const game = new Phaser.Game(config);

// Preload assets
function preload() {
    // Load images
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('health', 'assets/health.png');
    
    // Load sprite sheets
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('rat_red', 'assets/rat_red.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('rat_blue', 'assets/rat_blue.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('condor', 'assets/condor.png', { frameWidth: 64, frameHeight: 64 });
    
    // Load audio
    this.load.audio('bgm', 'assets/background_music.mp3');
}

// Create game elements
function create() {
    // Add background
    this.add.image(400, 200, 'background');
    
    // Add background music
    backgroundMusic = this.sound.add('bgm', { loop: true, volume: 0.5 });
    try {
        backgroundMusic.play();
    } catch (error) {
        console.log('Background music could not be played. Testing without music.');
    }
    
    // Add platforms
    platforms = this.physics.add.staticGroup();
    
    // Main ground platform
    platforms.create(400, 380, 'ground').setScale(2).refreshBody();
    
    // Some floating platforms
    platforms.create(600, 250, 'ground');
    platforms.create(200, 200, 'ground');
    platforms.create(750, 150, 'ground');
    
    // Add player
    player = this.physics.add.sprite(100, 300, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 15,
        repeat: 0
    });
    
    // Set up collisions
    this.physics.add.collider(player, platforms);
    
    // Create enemies
    enemies = this.physics.add.group();
    
    // Add some rats
    const redRat = enemies.create(600, 200, 'rat_red');
    redRat.setBounce(0.2);
    redRat.setCollideWorldBounds(true);
    redRat.setVelocityX(-50);
    redRat.type = 'red';
    
    const blueRat = enemies.create(300, 150, 'rat_blue');
    blueRat.setBounce(0.2);
    blueRat.setCollideWorldBounds(true);
    blueRat.setVelocityX(50);
    blueRat.type = 'blue';
    
    // Enemy animations
    this.anims.create({
        key: 'rat_red_move',
        frames: this.anims.generateFrameNumbers('rat_red', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'rat_blue_move',
        frames: this.anims.generateFrameNumbers('rat_blue', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    // Set up enemy animations
    enemies.getChildren().forEach(enemy => {
        enemy.anims.play(`rat_${enemy.type}_move`, true);
        this.physics.add.collider(enemy, platforms);
    });
    
    // Final boss (not visible until reaching final screen)
    boss = this.physics.add.sprite(700, 200, 'condor');
    boss.setVisible(false);
    boss.setActive(false);
    boss.setBounce(0.2);
    boss.setCollideWorldBounds(true);
    this.physics.add.collider(boss, platforms);
    
    // Boss animation
    this.anims.create({
        key: 'condor_fly',
        frames: this.anims.generateFrameNumbers('condor', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    // Add health display
    healthText = this.add.text(16, 16, 'Health: ' + health, { fontSize: '32px', fill: '#fff' });
    
    // Set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Collisions between player and enemies
    this.physics.add.overlap(player, enemies, hitEnemy, null, this);
    this.physics.add.overlap(player, boss, hitBoss, null, this);
}

// Update game state
function update() {
    if (gameOver) {
        return;
    }
    
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    
    // Jump
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    
    // Attack
    if (Phaser.Input.Keyboard.JustDown(attackKey)) {
        player.anims.play('attack', true);
        // Attack logic would go here (checking for enemies in range)
    }
    
    // Update enemies
    enemies.getChildren().forEach(enemy => {
        // Simple AI: change direction when hitting bounds
        if (enemy.body.touching.right || enemy.body.blocked.right) {
            enemy.setVelocityX(-50);
        } else if (enemy.body.touching.left || enemy.body.blocked.left) {
            enemy.setVelocityX(50);
        }
        
        // Flip enemy sprite based on direction
        if (enemy.body.velocity.x > 0) {
            enemy.flipX = true;
        } else if (enemy.body.velocity.x < 0) {
            enemy.flipX = false;
        }
    });
    
    // Boss movement (if visible)
    if (boss.visible) {
        boss.anims.play('condor_fly', true);
        
        // Simple boss AI: follow player
        if (boss.x < player.x) {
            boss.setVelocityX(70);
            boss.flipX = false;
        } else {
            boss.setVelocityX(-70);
            boss.flipX = true;
        }
        
        // Boss occasionally swoops
        if (Phaser.Math.Between(0, 100) < 2) {
            boss.setVelocityY(Phaser.Math.Between(-200, 200));
        }
    }
    
    // Screen transition
    if (player.x > 780 && currentScreen < totalScreens) {
        currentScreen++;
        player.x = 20;
        
        // If final screen, show the boss
        if (currentScreen === totalScreens) {
            enemies.clear(true, true);
            boss.setVisible(true);
            boss.setActive(true);
        } else {
            // Respawn enemies for the new screen
            respawnEnemies(this);
        }
    }
}

// Handle collision with enemies
function hitEnemy(player, enemy) {
    // Only take damage if not attacking
    if (player.anims.currentAnim.key !== 'attack') {
        takeDamage();
    } else {
        // Defeat enemy if attacking
        enemy.disableBody(true, true);
    }
}

// Handle collision with boss
function hitBoss(player, boss) {
    // Only take damage if not attacking
    if (player.anims.currentAnim.key !== 'attack') {
        takeDamage();
    } else {
        // Boss takes multiple hits
        // Implement boss health logic here
    }
}

// Take damage function
function takeDamage() {
    health--;
    healthText.setText('Health: ' + health);
    
    if (health <= 0) {
        gameOver = true;
        player.setTint(0xff0000);
        player.anims.play('turn');
    }
}

// Respawn enemies for a new screen
function respawnEnemies(scene) {
    enemies.clear(true, true);
    
    // Add random number of enemies
    const numEnemies = Phaser.Math.Between(2, 4);
    
    for (let i = 0; i < numEnemies; i++) {
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 300);
        const type = Phaser.Math.Between(0, 1) ? 'red' : 'blue';
        
        const enemy = enemies.create(x, y, 'rat_' + type);
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocityX(Phaser.Math.Between(-50, 50));
        enemy.type = type;
        
        // Start animation
        enemy.anims.play(`rat_${type}_move`, true);
        scene.physics.add.collider(enemy, platforms);
    }
} 