function TargetMoving(previousPos, initialRadius) {

    this.maximumRadius = 30;
    this.pos;
    this.velocity;
    this.radius = initialRadius != null ? initialRadius : 40;
    this.visible = false;
    this.colour = [random(255), random(255), random(255)];

    {
        let position = createVector(random(this.maximumRadius, width - this.maximumRadius), random(this.maximumRadius, height - this.maximumRadius));
        this.pos = position;
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(3.5);
    }

    this.update = function () {
        this.visible = true;

        if(this.pos.x > width - this.radius || this.pos.x < this.radius) {
            this.velocity.x *= -1;
        }
        if(this.pos.y > height - this.radius || this.pos.y < this.radius) {
            this.velocity.y *= -1;
        }
        this.pos.add(this.velocity);
    }

    this.display = function () {
        if (this.visible) {
            noStroke();
            fill(this.colour[0], this.colour[1], this.colour[2]);
            ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        }
    }

}
