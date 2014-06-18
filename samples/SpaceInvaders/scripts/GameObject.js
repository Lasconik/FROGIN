function GameObject() {
    /**
     * GameObject are objects held by the scene. They can be updated and 
     * should be drawn.
     *
     * Members : 
     * name - identifier to describe the object with ease
     * graphics - thing to draw
     */
    this.init = function(name) {
	this.name = name;
    };
    this.update = function() {
    };
    this.clear = function() {
	if (this.width && this.height) {
	    console.log("has width and height : "+this.width+"x"+this.height);
	    this.context.clearRect(this.x, this.y, this.width, this.height);
	}else{	    
	    console.log("clearing all canvas");
	    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
    };
    this.draw = function() {
	this.clear();
	this.graphics.draw(this.context, this.x, this.y);
    };
    this.drawRelative = function() {
	this.clear();
	this.graphics.draw(this.context, 0, 0);
    };
    this.exit = function() {};
}


function Background() {
    /**
     * Background is the bottom layer of levels. 
     *
     * Prototype : GameObject     
     *
     * Members : 
     * x, y - position on the canvas
     * speedX, speedY - movement
     * graphics - imageClip
     */
    this.init = function(name, x, y, sX, sY) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.speedX = sX;
	this.speedY = sY;
	this.graphics = new Sprite();
	this.graphics.init(imageHolder.background);
    };
    this.update = function() {
	this.x += this.speedX;
	this.y += this.speedY;
	if (this.y <= -600 || this.y > 600) {
	    this.y = 0;
	}
    };
    this.draw = function() {
	this.graphics.draw(this.context, this.x, this.y);
	this.graphics.draw(this.context, this.x, this.y - this.canvasHeight);
	this.graphics.draw(this.context, this.x, this.y + this.canvasHeight);
    };
}
Background.prototype = new GameObject();


function Player() {
    /**
     * Player represents the player's ship.
     *
     * Prototype : GameObject
     *
     * Members : 
     * -
     */
    this.init = function(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
//	this.width = 32;
//	this.height = 32;
	console.log(document.getElementById("canvas_ally"));
	this.graphics = new Clip();
	this.graphics.init(imageHolder.spritesheet, 
			   128, 96, 
			   32, 32);	
	document.getElementById("canvas_ally").style.left = this.x+'px';
	document.getElementById("canvas_ally").style.top = this.y+'px';
	this.drawRelative();
    }
    this.update = function() {
	Player.prototype.update();
    }
    this.move = function(x) {
	// checking if ship would go out of bounds
	if ( (this.x == 0 && x < 0) || 
	     (this.x == 800-32 && x > 0))
	    return;
	this.x += x;	
	document.getElementById("canvas_ally").style.left = this.x+'px';
	document.getElementById("canvas_ally").style.top = this.y+'px';
	this.drawRelative();
    }
}
Player.prototype = new GameObject();


function Enemy() {
    /**
     * Enemy represents an enemy
     *
     * Prototype : GameObject
     *
     * Members : 
     * -
     */
    this.init = function(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.graphics = new Clip();
	this.graphics.init(imageHolder.spritesheet, 0, 0, 32, 32);
    }
    this.update = function() {
	Enemy.prototype.update();
    }
}
Enemy.prototype = new GameObject();


function Bullet() {
    /**
     * Bullet represents a bullet : ally or enemy
     *
     * Prototype : GameObject
     *
     * Members :
     * speed - vertical speed. Allies : up, enemies : down
     */
    this.init = function(x, y, s) {
	this.name = "bullet";
	this.x = x;
	this.y = y;
	this.speed = s;
	this.graphics = new Clip();
	if (s > 0) {
	    // speed is >0 = heading to the bottom = enemy bullet
	    this.graphics.init(imageHolder.spritesheet,
			       175, 16,
			       2, 8);
	} else {
	    // speed is <0 = heading to the top = ally bullet
	    this.graphics.init(imageHolder.spritesheet, 
			      175, 0,
			      2, 8);
	}
	this.draw();
    }
    this.update = function() {
	this.y += this.speed;
	this.draw();
    }
}
Bullet.prototype = new GameObject();
