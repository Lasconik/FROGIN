/**
 * Scene is a state of a game. Only the current state is handled by the loop. 
 * The game logic should be here. 
 */
function Scene() {
    this.init = function() {};
    this.initRenderer = function() {};
    this.update = function() { };
    this.draw = function() {};
    this.exit = function() {};
}

/**
 * Level is the main scene, where the player attacks enemies
 */
function Level() {
    this.init = function() {
	this.initRenderer();
	this.background = new Background();
	this.background.init("bg", 0, 0, 0, 0);
	this.player = new Player();
	this.player.init("player", 30, 60);
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
	    // ally
	    this.context_ally = this.canvas_ally.getContext("2d");
	    Player.prototype.context = this.context_ally;
	    Player.prototype.canvasWidth = this.canvas_ally.width;
	    Player.prototype.canvasHeight = this.canvas_ally.height;
	    // bullets
	    this.context_bullets = this.canvas_bullets.getContext("2d");
	}	
    };
    this.update = function() {
	Level.prototype.update();
	this.background.update();
	this.player.update();
    };
    this.draw = function() {
	this.background.draw();
	this.player.draw();
    };
    this.exit = function() {
	this.player.exit();
	this.background.exit();
    };
}
Level.prototype = new Scene();