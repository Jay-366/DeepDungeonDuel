import Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  // Game entities
  private player: Phaser.GameObjects.Sprite | null = null;
  private enemy: Phaser.GameObjects.Sprite | null = null;
  private background: Phaser.GameObjects.Image | null = null;
  
  // UI elements
  private playerHealthBar: any;
  private enemyHealthBar: any;
  private actionButtons: Phaser.GameObjects.Container | null = null;
  private battleLog: Phaser.GameObjects.Text | null = null;
  
  // Game state
  private currentTurn: 'player' | 'enemy' = 'player';
  private battleState: 'start' | 'playerTurn' | 'enemyTurn' | 'victory' | 'defeat' = 'start';
  private playerStats = {
    health: 100,
    maxHealth: 100,
    attack: 20,
    defense: 10,
    energy: 100,
    maxEnergy: 100
  };
  private enemyStats = {
    health: 80,
    maxHealth: 80,
    attack: 15,
    defense: 5,
    energy: 80,
    maxEnergy: 80
  };

  constructor() {
    super('BattleScene');
  }

  preload() {
    // Load game assets
    this.load.image('battle-background', '/assets/dungeonbackgroun1.jpg');
    this.load.image('player-character', '/assets/character1.png');
    this.load.image('enemy-character', '/assets/bluewitch.png');
  }

  create() {
    // Create background
    this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'battle-background');
    this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
    // Create player character (businessman)
    this.player = this.add.sprite(150, 280, 'player-character');
    this.player.setScale(0.4);
    
    // Create enemy character (witch)
    this.enemy = this.add.sprite(650, 280, 'enemy-character');
    this.enemy.setScale(0.4);
    
    // Create UI elements
    this.createUI();
    
    // Start battle sequence
    this.startBattle();
  }

  update() {
    // Update game logic here
    switch (this.battleState) {
      case 'playerTurn':
        // Player turn logic
        break;
      case 'enemyTurn':
        // Enemy turn logic
        break;
    }
  }

  private createUI() {
    // Create health bars
    this.playerHealthBar = this.createHealthBar(120, 50, this.playerStats.health, this.playerStats.maxHealth);
    this.enemyHealthBar = this.createHealthBar(680, 50, this.enemyStats.health, this.enemyStats.maxHealth);
    
    // Create action buttons
    this.actionButtons = this.add.container(400, 350);
    
    const attackButton = this.add.rectangle(0, 0, 120, 40, 0x7C3AED).setInteractive();
    const attackText = this.add.text(0, 0, 'Attack', { 
      color: '#ffffff', 
      fontSize: '16px' 
    }).setOrigin(0.5);
    
    const skillButton = this.add.rectangle(140, 0, 120, 40, 0x7C3AED).setInteractive();
    const skillText = this.add.text(140, 0, 'Skill', { 
      color: '#ffffff', 
      fontSize: '16px' 
    }).setOrigin(0.5);
    
    const defendButton = this.add.rectangle(-140, 0, 120, 40, 0x7C3AED).setInteractive();
    const defendText = this.add.text(-140, 0, 'Defend', { 
      color: '#ffffff', 
      fontSize: '16px' 
    }).setOrigin(0.5);
    
    this.actionButtons.add([attackButton, attackText, skillButton, skillText, defendButton, defendText]);
    
    // Add event listeners to buttons
    attackButton.on('pointerdown', () => this.onAttackAction());
    skillButton.on('pointerdown', () => this.onSkillAction());
    defendButton.on('pointerdown', () => this.onDefendAction());
    
    // Add battle log
    this.battleLog = this.add.text(400, 140, '', { 
      color: '#ffffff', 
      fontSize: '18px',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
  }

  private createHealthBar(x: number, y: number, health: number, maxHealth: number) {
    const width = 120;
    const height = 20;
    
    const background = this.add.rectangle(x, y, width, height, 0x000000);
    background.setStrokeStyle(2, 0xffffff);
    
    const healthBar = this.add.rectangle(
      x - width / 2 + (width * health / maxHealth) / 2, 
      y, 
      width * health / maxHealth, 
      height - 4, 
      0xA855F7
    );
    
    const text = this.add.text(x, y, `${health}/${maxHealth}`, { 
      color: '#ffffff', 
      fontSize: '12px' 
    }).setOrigin(0.5);
    
    return { background, healthBar, text };
  }

  private updateHealthBar(healthBarObj: any, currentHealth: number, maxHealth: number) {
    const width = 120;
    
    healthBarObj.healthBar.width = width * currentHealth / maxHealth;
    healthBarObj.healthBar.x = healthBarObj.background.x - width / 2 + (width * currentHealth / maxHealth) / 2;
    healthBarObj.text.setText(`${currentHealth}/${maxHealth}`);
  }

  private startBattle() {
    this.battleState = 'start';
    this.showMessage('Battle Start!');
    
    // Add initial message to chat interface
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', 'Battle Start! Prepare for combat.');
    }
    
    // After 1.5 seconds, transition to player turn
    this.time.delayedCall(1500, () => {
      this.battleState = 'playerTurn';
      this.showMessage('Your Turn!');
      
      if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
        (window as any).addBattleMessage('system', 'Your Turn! Choose an action.');
      }
      
      this.actionButtons?.setVisible(true);
    });
  }

  private onAttackAction() {
    if (this.battleState !== 'playerTurn') return;
    
    this.actionButtons?.setVisible(false);
    this.battleState = 'enemyTurn';
    
    // Calculate damage
    const damage = Math.max(5, this.playerStats.attack - this.enemyStats.defense / 2);
    
    // Update enemy health
    this.enemyStats.health = Math.max(0, this.enemyStats.health - damage);
    
    // Show attack animation and add to chat interface
    const message = `You dealt ${damage} damage!`;
    this.showMessage(message);
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('player', message, 'attack');
    }
    
    // Shake the enemy
    this.tweens.add({
      targets: this.enemy,
      x: this.enemy ? this.enemy.x + 10 : 0,
      duration: 50,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        // Update health bar
        this.updateHealthBar(this.enemyHealthBar, this.enemyStats.health, this.enemyStats.maxHealth);
        
        // Add damage message for enemy
        if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
          (window as any).addBattleMessage('enemy', `Took ${damage} damage!`, 'damage');
        }
        
        // Check for victory
        if (this.enemyStats.health <= 0) {
          this.battleVictory();
          return;
        }
        
        // Enemy turn after a delay
        this.time.delayedCall(1500, () => this.enemyTurn());
      }
    });
  }

  private onSkillAction() {
    if (this.battleState !== 'playerTurn') return;
    
    this.actionButtons?.setVisible(false);
    this.battleState = 'enemyTurn';
    
    // Calculate damage (higher damage but costs energy)
    const damage = Math.max(8, this.playerStats.attack * 1.5 - this.enemyStats.defense / 2);
    
    // Update stats
    this.playerStats.energy = Math.max(0, this.playerStats.energy - 20);
    this.enemyStats.health = Math.max(0, this.enemyStats.health - damage);
    
    // Show skill animation and add to chat interface
    const message = `You used Skill for ${Math.floor(damage)} damage!`;
    this.showMessage(message);
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('player', message, 'skill');
    }
    
    // Update UI
    this.updateHealthBar(this.enemyHealthBar, this.enemyStats.health, this.enemyStats.maxHealth);
    
    // Add damage message for enemy
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('enemy', `Took ${Math.floor(damage)} damage from skill attack!`, 'damage');
    }
    
    // Check for victory
    if (this.enemyStats.health <= 0) {
      this.battleVictory();
      return;
    }
    
    // Enemy turn after a delay
    this.time.delayedCall(1500, () => this.enemyTurn());
  }

  private onDefendAction() {
    if (this.battleState !== 'playerTurn') return;
    
    this.actionButtons?.setVisible(false);
    this.battleState = 'enemyTurn';
    
    // Increase defense temporarily
    this.playerStats.defense *= 1.5;
    
    // Restore some energy
    this.playerStats.energy = Math.min(this.playerStats.maxEnergy, this.playerStats.energy + 10);
    
    // Show defend message and add to chat interface
    const message = 'You are defending!';
    this.showMessage(message);
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('player', message, 'defend');
    }
    
    // Enemy turn after a delay
    this.time.delayedCall(1500, () => this.enemyTurn());
  }

  private enemyTurn() {
    this.battleState = 'enemyTurn';
    this.showMessage("Enemy's Turn!");
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', "Enemy's Turn!");
    }
    
    // Enemy attack logic
    this.time.delayedCall(1000, () => {
      // Calculate damage
      const damage = Math.max(3, this.enemyStats.attack - this.playerStats.defense / 2);
      
      // Update player health
      this.playerStats.health = Math.max(0, this.playerStats.health - damage);
      
      // Show attack animation and add to chat interface
      const message = `Enemy dealt ${damage} damage!`;
      this.showMessage(message);
      
      if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
        (window as any).addBattleMessage('enemy', `I attack for ${damage} damage!`, 'attack');
      }
      
      // Shake the player
      this.tweens.add({
        targets: this.player,
        x: this.player ? this.player.x - 10 : 0,
        duration: 50,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          // Update health bar
          this.updateHealthBar(this.playerHealthBar, this.playerStats.health, this.playerStats.maxHealth);
          
          // Add damage message for player
          if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
            (window as any).addBattleMessage('player', `Took ${damage} damage!`, 'damage');
          }
          
          // Reset defense if player was defending
          this.playerStats.defense = 10;
          
          // Check for defeat
          if (this.playerStats.health <= 0) {
            this.battleDefeat();
            return;
          }
          
          // Back to player turn
          this.time.delayedCall(1500, () => {
            this.battleState = 'playerTurn';
            this.showMessage('Your Turn!');
            
            if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
              (window as any).addBattleMessage('system', 'Your Turn! Choose an action.');
            }
            
            this.actionButtons?.setVisible(true);
          });
        }
      });
    });
  }

  private battleVictory() {
    this.battleState = 'victory';
    this.showMessage('Victory!');
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', 'Victory! You defeated the enemy.', 'victory');
    }
    
    // Show victory screen
    const victoryText = this.add.text(400, 200, 'You Won!', { 
      color: '#FFDD00', 
      fontSize: '32px',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    const continueButton = this.add.rectangle(400, 260, 160, 50, 0x7C3AED).setInteractive();
    const continueText = this.add.text(400, 260, 'Continue', { 
      color: '#ffffff', 
      fontSize: '18px' 
    }).setOrigin(0.5);
    
    continueButton.on('pointerdown', () => {
      // Navigate back to main game or next battle
      this.scene.start('BattleScene'); // For testing, just restart the scene
    });
  }

  private battleDefeat() {
    this.battleState = 'defeat';
    this.showMessage('Defeat!');
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', 'Defeat! You were defeated by the enemy.', 'defeat');
    }
    
    // Show defeat screen
    const defeatText = this.add.text(400, 200, 'You Lost!', { 
      color: '#FF0000', 
      fontSize: '32px',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    const retryButton = this.add.rectangle(400, 260, 160, 50, 0x7C3AED).setInteractive();
    const retryText = this.add.text(400, 260, 'Try Again', { 
      color: '#ffffff', 
      fontSize: '18px' 
    }).setOrigin(0.5);
    
    retryButton.on('pointerdown', () => {
      // Restart the battle
      this.scene.restart();
    });
  }

  private showMessage(message: string) {
    // Update the in-game battle log text
    if (this.battleLog) {
      this.battleLog.setText(message);
    }
  }
}
