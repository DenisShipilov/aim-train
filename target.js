
function Target(index, otherTargets) {
  this.spawnDelay = index * 30;
  this.spawnCount = 0;
  this.pos;
  this.radius = 0;
  this.endRadius = 40;
  this.visible = false;
  this.red = random(255);
  this.green = random(255);
  this.blue = random(255);
  this.maximumRadius = 30;
  this.timeAlive = 0;
  this.otherTargets = otherTargets;

  this.lerpIncrement = 0.01;
  this.incrementing = true;
  this.hasRespawned = false;
  this.previousPos;


  this.update = function() {
    this.hasRespawned = false;
    this.timeAlive++;
    if (this.spawnCount >= this.spawnDelay) {
      this.visible = true;
    }
    if (this.visible) {
      this.radius = lerp(this.radius, this.endRadius, this.lerpIncrement);

      if (this.radius >= this.endRadius-1) {
        console.log("I'm STILL IN HERE");
        this.endRadius = 0;
        this.lerpIncrement = 0.1;
        this.incrementing = false;
      }

      if (!this.incrementing && this.radius <= this.endRadius+2) {
        this.respawn(false);
      }
    } else {
      this.spawnCount++;
    }


  }

  this.display = function() {
    if (this.visible) {
      fill(this.red, this.green, this.blue);
      ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }

  }

  this.respawn = function(hasBeenClicked) {
    this.previousPos = this.pos;
    let hasFoundPosition = false
    while(!hasFoundPosition) {
      hasFoundPosition = this.hasFoundTargetPosition(null);
    }
    if (!hasBeenClicked) {
      this.hasRespawned = true;
    }

    this.radius = 0;
    this.endRadius = 30;
    this.timeAlive = 0;
    this.lerpIncrement = 0.01;
    this.incrementing = true;

  }



  this.hide = function() {
    this.visible = false;
  }

  this.show = function() {
    this.visible = true;
  }

  this.hasFoundTargetPosition = function(index) {
    let position = createVector(random(this.maximumRadius, width-this.maximumRadius), random(this.maximumRadius, height-this.maximumRadius));
    for (let i = 0; i < this.otherTargets.length; i++) {
      if (dist(position.x, position.y, this.otherTargets[i].pos.x, this.otherTargets[i].pos.y) < this.otherTargets[i].radius * 2) {
        return false;
      }
    }

    this.pos = position;
    if (index !== undefined) {
      this.otherTargets[index] = this;
    }
    return true;
  }



}
