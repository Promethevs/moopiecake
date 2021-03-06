/**
 * Source object
 */

/**
 * Source constructor
 * 
 * @param Number
 *            x - x coordinate
 * @param Number
 *            y - y coordinate
 */
function Source(x, y) {
	/**
	 * x coord
	 */
	this.x = x;
	/**
	 * y coord
	 */
	this.y = y;

	/**
	 * queue containing all elements
	 */
	this.elems = new Queue();

	this.editing = false;
	
	/**
	 * spawn new ball
	 */
	this.spawnNew = function() {
		this.elems.enqueue(new Ball(this.x, this.y));
	};
	/**
	 * spawns new ball with a random speed vector
	 */
	this.spawnRand = function() {
		this.spawnNew();
		this.elems.last.val.speed.x += (Math.random() * 10) - 5;
		this.elems.last.val.speed.y += (Math.random() * -10) - 5;
	};

	/**
	 * deletes the first ball if it has moved off screen
	 */
	this.moveOffScreen = function() {
		var elem = this.elems.peek();
		if (elem != undefined && elem.y >= height + elem.radius)
			this.elems.dequeue();
	};

	/**
	 * move all balls
	 */
	this.moveAll = function() {
		for (var elem = this.elems.first; elem != null; elem = elem.next) {
			elem.val.move();
		}
	};

	/**
	 * apply gravity on all balls
	 */
	this.gravityOnAll = function() {
		for (var elem = this.elems.first; elem != null; elem = elem.next) {
			elem.val.gravity();
		}
	};

	/**
	 * draw the Source
	 */
	this.draw = function() {
		var radius = 8;
		if(this.editing===true)
			radius = 10;
		ctx.beginPath();
		ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.strokeStyle = "black";
		ctx.stroke();
	};

	/**
	 * draw all balls ejected from the source
	 */
	this.drawAllBalls = function() {
		for (var elem = this.elems.first; elem != null || elem != undefined; elem = elem.next) {
			elem.val.draw();
		}
	};
}