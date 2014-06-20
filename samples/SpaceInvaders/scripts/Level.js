function Scene() {
    /**
     * Scene is a state of a game. Only the current state is handled by the 
     * loop. The game logic should be here. 
     *
     * Members : 
     * -
     */
    this.init = function() {};
    this.initRenderer = function() {};
    this.update = function() { };
    this.draw = function() {};
    this.exit = function() {};
}

// ally's bullets speed
A_BULLET_SPEED = -400;
// enemies' bullets speed
E_BULLET_SPEED = 400;
// ally's speed
A_SPEED = 320;

function Level() {
    /**
     * Level is the main scene, where the player attacks enemies. 
     *
     * Prototype : Scene
     * 
     * Members : 
     * background - outer space image
     * player - player's ship
     * bullets - array containing the bullets
     * canvas_* - different canvases to display
     */
    this.init = function() {
	this.initRenderer();
	this.background = new Background();
	this.background.init("bg", 0, 0, 0, 0);
	this.background.draw();
	this.player = new Player();
	this.player.init("player", 400, 560);
	this.bullets = new BulletPool();
	this.bullets.init(32, [-20, -20, 0]);
	this.enemy = new Enemy();
	this.enemy.init("enemy", 80, 60);
	// init controller
	this.controller = new Controller();
	this.controller.init(this);
	/*
	 * The two following functions are necessary because otherwise, 
	 * "controller.updateDown" is called with the Window as context.
	 * This is bad, because the window doesn't have any "scene"
	 */
	var callDown = function(e) {
	    var ctrl = this.controller;
	    return function(){return ctrl.updateDown.bind(ctrl);};
	};
	var callUp = function(e) {
	    var ctrl = this.controller;
	    return function(){return ctrl.updateUp.bind(ctrl);};
	};
	/*
	 * Now we are getting the redirected functions, called with
	 * "Controller" as context. We could also want to use the Scene.
	 */
	document.addEventListener("keydown", callDown.apply(this)(), false);
	document.addEventListener("keyup", callUp.apply(this)(), false);
	var spaceAction = function(){ 
	    this.bullets.spawn([this.player.x+15, this.player.y-9, A_BULLET_SPEED]);
	};
	var event = new Event();
	event.init(spaceAction, TRIGGER_PRESS);
	var left = new Event();
	left.init(function(){this.player.move(-A_SPEED);}, 
		  TRIGGER_MAINTAIN);
	var right = new Event();
	right.init(function(){this.player.move(A_SPEED);},
		   TRIGGER_MAINTAIN);
	this.controller.register("space", event);
	this.controller.register("left", left);
	this.controller.register("right", right);
    };
    this.initRenderer = function() {
	this.canvas_background = document.getElementById("canvas_background");
	this.canvas_enemies = document.getElementById("canvas_enemies");
	this.canvas_ally = document.getElementById("canvas_ally");
	this.canvas_bullets = document.getElementById("canvas_bullets");
	if ( this.canvas_background.getContext ) {
	    // initialize contexts
	    // background
	    this.context_background = this.canvas_background.getContext("2d");
	    Background.prototype.context = this.context_background;
	    Background.prototype.canvasWidth = this.canvas_background.width;
	    Background.prototype.canvasHeight = this.canvas_background.height;
	    this.context_enemies = this.canvas_enemies.getContext("2d");
	    // enemies
	    this.context_enemies = this.canvas_enemies.getContext("2d");
	    Enemy.prototype.context = this.context_enemies;
	    Enemy.prototype.canvasWidth = this.canvas_enemies.width;
	    Enemy.prototype.canvasHeight = this.canvas_enemies.height;	    
	    // ally
	    this.context_ally = this.canvas_ally.getContext("2d");
	    Player.prototype.context = this.context_ally;
	    Player.prototype.canvasWidth = this.canvas_ally.width;
	    Player.prototype.canvasHeight = this.canvas_ally.height;
	    // bullets
	    this.context_bullets = this.canvas_bullets.getContext("2d");
	    Bullet.prototype.context = this.context_bullets;
	    Bullet.prototype.canvasWidth = this.canvas_bullets.width;
	    Bullet.prototype.canvasHeight = this.canvas_bullets.height;
	}	
    };
    this.update = function() {
	Level.prototype.update();
	var commands = this.controller.getCommands();
	for (var i = 0; i < commands.length; i++) {
	    commands[i].call(this);
	}
	this.background.update();
	this.player.update();
	this.bullets.update();
//	for (b in this.bullets) {
//	    this.bullets[b].update();
//	}
    };
    this.draw = function() {
	// should be called only when its required to redraw the whole scene
	this.background.draw();
	this.player.draw();
	
    };
    this.exit = function() {
	this.player.exit();
	this.background.exit();
    };

    /**
     * Spawns a bullet at 'x','y' moving vertically at 'v'
     */
    this.spawnBullet = function(x, y, v) {
	var b = new Bullet();
	b.init(x, y, v);
	if (this.bullets[this.bullets.length-1] && 
	    this.bullets[this.bullets.length-1].active) {
	    this.bullets[this.bullets.length] = b;
	} else {	    
	    this.bullets[this.bullets.length-1] = b;
	}
    };

}
Level.prototype = new Scene();