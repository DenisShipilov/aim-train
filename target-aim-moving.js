function TargetAimMoving() {
    let target;

    this.fadeBackground = function() {
        fill(0, 13);
        noStroke();
        rect(0, 0, width, height);
    };

    this.run = function () {
        target = new TargetMoving();
        aimTimer = new AimTimer();
        score = new Score();
    };

    this.draw = function () {

        this.fadeBackground();

        aimTimer.display();
        score.display();
        recentScores.display();

        target.update();
        target.display();

        if (frameCount % 60 === 0) {
            aimTimer.time--;
            if (aimTimer.time <= 0) {
                recentScores.addScore(score.score);
                restartGame();
            }
        }
        this.processCursorOnTarget();
    };

    this.mousePressed = function () {
        console.log(hasGameStarted);
        return false;
    };

    this.processCursorOnTarget = function () {
        let cursorOnTarget = false;
        let distance = dist(mouseX, mouseY, target.pos.x, target.pos.y);
        if (distance < target.radius) {
            cursorOnTarget = true;
            if (frameCount % 20 == 0) {
                let increment = 8;
                score.score += increment;
                this.displayScore(mouseX, mouseY, increment)

            }
        }
    };

    this.displayScore = function (x, y, increment) {
        fill(100, 255, 100);
        textSize(40);
        text("+ " + increment, x + target.radius, y + target.radius);
    }

}