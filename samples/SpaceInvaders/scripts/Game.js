var game = new Game();

/**
 * Initializes the game
 */
function init() {
    game.init();
}


/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
// TODO : don't need to check everytime, can just store the good API
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function(callback, 
		 element){
	    alert("request");
	    window.setTimeout(callback, 1000 / 60); // handle FPS
	};
})();


/**
 * Function to call every frame
 */
function loop() {
    game.loop();
    // TODO: check validation
    requestAnimFrame(loop);
}


/**
 * Encapsulation for general game infos.
 * scene : current scene, base for update and rendering. 
 */
function Game() {
    
    this.init = function() {
	this.scene = new Level();
	this.scene.init();
	requestAnimFrame(loop);
    };

    this.update = function() {
	this.scene.update();
    };

    this.draw = function() {
	this.scene.draw();
    };

    this.exit = function() {
	this.scene.exit();
    };

    /*
     * Called every frame, just computes the new state as a scene and renders it
     */
    this.loop = function() {
	this.update();
	this.draw();
    };
}


/*
 * Singleton holding all the images. Prevents images from being loaded twice. 
 */
var imageHolder = new function () {
    var nbImages = 1;
    // background image
    this.background = new Image();
    this.background.src = "assets/images/background.png";
    this.background.onload = imageLoaded_aux;
    // spritesheet
    this.spritesheet = new Image();
    this.spritesheet.src = "assets/images/spritesheet.png";
    this.spritesheet.onload = imageLoaded_aux;
    // load count
    var nbLoaded = 0;
    var imageLoaded_aux = function() {
	imageLoaded();
    };
    function imageLoaded() {
	nbLoaded++;
	if (nbLoaded == nbImages) {
	    window.init();
	}
    }
};
