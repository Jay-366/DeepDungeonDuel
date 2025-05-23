import * as Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  // Game entities
  private player: Phaser.GameObjects.Sprite | null = null;
  private enemy: Phaser.GameObjects.Sprite | null = null;
  private background: Phaser.GameObjects.Image | null = null;
  
  // UI elements
  private playerHealthBar: {
    background: Phaser.GameObjects.Rectangle;
    healthBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  } | null = null;
  private enemyHealthBar: {
    background: Phaser.GameObjects.Rectangle;
    healthBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  } | null = null;
  private playerEnergyBar: {
    background: Phaser.GameObjects.Rectangle;
    energyBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  } | null = null;
  private enemyEnergyBar: {
    background: Phaser.GameObjects.Rectangle;
    energyBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  } | null = null;
  private actionButtons: Phaser.GameObjects.Container | null = null;
  private battleLog: Phaser.GameObjects.Text | null = null;
  private autoAttackText: Phaser.GameObjects.Text | null = null;
  
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

  // Bet information
  private betAmount: string = '0';
  private damageHistory: any[] = [
    // Initial sample data in case nothing gets recorded
    { agent: 'Eldric', action: 'Start Battle', amount: 0 },
    { agent: 'Blue Witch', action: 'Prepare', amount: 0 }
  ];

  constructor() {
    super('BattleScene');
  }

  preload() {
    // Load game assets
    this.load.image('bg-palace-hallway', '/background/vecteezy_royal-palace-hallway-with-stairs-at-night_24238333.jpg');
    this.load.image('bg-palace-corridor', '/background/vecteezy_ancient-palace-or-castle-corridor-interior_23878092.jpg');
    this.load.image('bg-castle-ghost', '/background/vecteezy_hall-interior-with-ghost-in-medieval-castle_15918445.jpg');
    this.load.image('bg-castle-dungeon', '/background/vecteezy_medieval-castle-dungeon-wall-game-cartoon-vector_25449378.jpg');
    this.load.image('player-character', '/assets/character1.png');
    this.load.image('enemy-character', '/assets/bluewitch.png');
  }

  create() {
    // Randomly select a background
    const backgrounds = [
      'bg-palace-hallway',
      'bg-palace-corridor',
      'bg-castle-ghost',
      'bg-castle-dungeon'
    ];
    const selectedBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, selectedBg);
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
        // Player turn logic - now handled by auto-attack
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
    
    // Create energy bars
    this.playerEnergyBar = this.createEnergyBar(120, 75, this.playerStats.energy, this.playerStats.maxEnergy);
    this.enemyEnergyBar = this.createEnergyBar(680, 75, this.enemyStats.energy, this.enemyStats.maxEnergy);
    
    // Create action buttons (still created but will be hidden)
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
    
    // Auto-attack text notification
    this.autoAttackText = this.add.text(400, 350, 'Auto-battling...', { 
      color: '#ffffff',
      fontSize: '16px',
      fontStyle: 'italic',
      backgroundColor: '#000000',
      padding: { x: 10, y: 10 },
      align: 'center',
    }).setOrigin(0.5);
    
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
    
    // Create the background container
    const background = this.add.rectangle(x, y, width, height, 0x000000);
    background.setStrokeStyle(2, 0xffffff);
    
    // Create the health bar with origin at left side
    const healthBar = this.add.rectangle(
      x - width / 2, // Position at the left edge of the background
      y, 
      width * health / maxHealth, 
      height - 4, 
      0xEF4444
    );
    
    // Set the origin to the left side of the health bar
    healthBar.setOrigin(0, 0.5);
    
    // Add health text
    const text = this.add.text(x, y, `${health}/${maxHealth}`, { 
      color: '#ffffff', 
      fontSize: '12px' 
    }).setOrigin(0.5);
    
    return { background, healthBar, text };
  }

  private updateHealthBar(healthBarObj: {
    background: Phaser.GameObjects.Rectangle;
    healthBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  }, currentHealth: number, maxHealth: number) {
    const width = 120;
    
    // Only update the width, not the position
    healthBarObj.healthBar.width = width * currentHealth / maxHealth;
    healthBarObj.text.setText(`${currentHealth}/${maxHealth}`);
  }

  private createEnergyBar(x: number, y: number, energy: number, maxEnergy: number) {
    const width = 120;
    const height = 10;
    
    // Create the background container
    const background = this.add.rectangle(x, y, width, height, 0x000000);
    background.setStrokeStyle(2, 0xffffff);
    
    // Create the energy bar with origin at left side
    const energyBar = this.add.rectangle(
      x - width / 2, // Position at the left edge of the background
      y, 
      width * energy / maxEnergy, 
      height - 4, 
      0x3B82F6  // Blue color for energy
    );
    
    // Set the origin to the left side of the energy bar
    energyBar.setOrigin(0, 0.5);
    
    // Add energy text
    const text = this.add.text(x, y, `EP:${energy}/${maxEnergy}`, { 
      color: '#ffffff', 
      fontSize: '10px' 
    }).setOrigin(0.5);
    
    return { background, energyBar, text };
  }

  private updateEnergyBar(energyBarObj: {
    background: Phaser.GameObjects.Rectangle;
    energyBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  }, currentEnergy: number, maxEnergy: number) {
    const width = 120;
    
    // Update the width, not the position
    energyBarObj.energyBar.width = width * currentEnergy / maxEnergy;
    energyBarObj.text.setText(`EP:${currentEnergy}/${maxEnergy}`);
  }

  private startBattle() {
    this.battleState = 'start';
    this.showMessage('Battle Start!');
    
    // Add to damage history
    this.damageHistory.push({
      agent: 'System',
      action: 'Battle Started',
      amount: 0
    });
    
    // Add initial message to chat interface
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', 'Battle Start! Prepare for combat.');
    }
    
    // After 1.5 seconds, transition to player turn
    this.time.delayedCall(1500, () => {
      this.battleState = 'playerTurn';
      this.showMessage('Your Turn!');
      
      if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
        (window as any).addBattleMessage('system', 'Your Turn! Auto-selecting action...');
      }
      
      // Hide action buttons since we're auto-attacking
      this.actionButtons?.setVisible(false);
      
      // Auto-select an action after a small delay
      this.time.delayedCall(1000, () => this.autoSelectAction());
    });
  }

  private autoSelectAction() {
    if (this.battleState !== 'playerTurn') return;
    
    // Randomly select an action, but avoid skill if not enough energy
    let randomAction;
    
    if (this.playerStats.energy < 20) {
      // Skip skill option if not enough energy
      randomAction = Math.random() < 0.5 ? 1 : 3; // Either Attack or Defend
    } else {
      randomAction = Math.floor(Math.random() * 3) + 1; // 1: Attack, 2: Skill, 3: Defend
    }
    
    // Display which action was selected
    let actionName = '';
    
    switch (randomAction) {
      case 1:
        actionName = 'Attack';
        this.onAttackAction();
        break;
      case 2:
        actionName = 'Skill';
        this.onSkillAction();
        break;
      case 3:
        actionName = 'Defend';
        this.onDefendAction();
        break;
    }
    
    // Update battle log to show selected action
    this.showMessage(`Auto-selecting: ${actionName}`);
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', `Auto-selecting: ${actionName}`);
    }
  }

  private onAttackAction() {
    if (this.battleState !== 'playerTurn') return;
    
    this.actionButtons?.setVisible(false);
    this.battleState = 'enemyTurn';
    
    // Calculate damage
    const damage = Math.max(5, this.playerStats.attack - this.enemyStats.defense / 2);
    
    // Update enemy health
    this.enemyStats.health = Math.max(0, this.enemyStats.health - damage);
    
    // Add to damage history
    this.damageHistory.push({
      agent: 'Eldric',
      action: 'Attack',
      amount: damage
    });
    
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
    
    // Add to damage history
    this.damageHistory.push({
      agent: 'Eldric',
      action: 'Skill Attack',
      amount: Math.floor(damage)
    });
    
    // Show skill animation and add to chat interface
    const message = `You used Skill for ${Math.floor(damage)} damage!`;
    this.showMessage(message);
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('player', message, 'skill');
    }
    
    // Update UI
    this.updateHealthBar(this.enemyHealthBar, this.enemyStats.health, this.enemyStats.maxHealth);
    this.updateEnergyBar(this.playerEnergyBar, this.playerStats.energy, this.playerStats.maxEnergy);
    
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
    
    // Update energy bar
    this.updateEnergyBar(this.playerEnergyBar, this.playerStats.energy, this.playerStats.maxEnergy);
    
    // Add to damage history
    this.damageHistory.push({
      agent: 'Eldric',
      action: 'Defend',
      amount: 0
    });
    
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
      
      // Add to damage history
      this.damageHistory.push({
        agent: 'Blue Witch',
        action: 'Attack',
        amount: damage
      });
      
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
          
          // Back to player turn with auto-selection
          this.time.delayedCall(1500, () => {
            this.battleState = 'playerTurn';
            this.showMessage('Your Turn!');
            
            if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
              (window as any).addBattleMessage('system', 'Your Turn! Auto-selecting action...');
            }
            
            // Auto-select an action after a small delay
            this.time.delayedCall(1000, () => this.autoSelectAction());
          });
        }
      });
    });
  }

  private battleVictory() {
    this.battleState = 'victory';
    this.showMessage('Victory!');
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', 'Victory! You have won the battle.');
    }
    
    // Get bet agent name
    const betAgentName = typeof window !== 'undefined' ? 
      localStorage.getItem('betAgentName') || '' : '';
    
    // Wait 3 seconds then show result
    this.time.delayedCall(3000, () => {
      if (typeof window !== 'undefined' && (window as any).goToBattleResult) {
        (window as any).goToBattleResult({
          winner: 'Eldric',
          loser: 'Blue Witch',
          bet: this.betAmount,
          odds: 1.5,
          history: this.damageHistory,
          betAgentName
        });
      }
    });
  }

  private battleDefeat() {
    this.battleState = 'defeat';
    this.showMessage('Defeat!');
    
    if (typeof window !== 'undefined' && (window as any).addBattleMessage) {
      (window as any).addBattleMessage('system', 'Defeat! You have lost the battle.');
    }
    
    // Get bet agent name
    const betAgentName = typeof window !== 'undefined' ? 
      localStorage.getItem('betAgentName') || '' : '';
    
    // Wait 3 seconds then show result
    this.time.delayedCall(3000, () => {
      if (typeof window !== 'undefined' && (window as any).goToBattleResult) {
        (window as any).goToBattleResult({
          winner: 'Blue Witch',
          loser: 'Eldric',
          bet: this.betAmount,
          odds: 1.5,
          history: this.damageHistory,
          betAgentName
        });
      }
    });
  }

  private showMessage(message: string) {
    // Update the in-game battle log text
    if (this.battleLog) {
      this.battleLog.setText(message);
    }
  }

  // Method to set bet amount from outside
  setBetAmount(amount: string) {
    this.betAmount = amount;
  }

  // Method to get damage history
  getDamageHistory() {
    return this.damageHistory;
  }
}
