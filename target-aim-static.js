function TargetAimStatic() {

    let targets = [];
    let userClicks = [];

    this.run = function () {
        for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
            let hasDone = false;
            while(!hasDone) {
                let newTarget = new Target(i, targets);
                hasDone = newTarget.hasFoundTargetPosition(i);
            }
        }
        aimTimer = new AimTimer();
        score = new Score();
    };

    this.draw = function () {
            background(0);

            aimTimer.display();
            score.display();
            recentScores.display();

            for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
                if (targets[i].hasRespawned) {
                    userClicks.push(new MissedTarget(targets[i].previousPos.x, targets[i].previousPos.y, 3));
                    score.score -= 3;

                }
                targets[i].update();
                targets[i].display();

            }

            if (frameCount % 60 === 0) {
                aimTimer.time--;
                if (aimTimer.time <= 0) {
                    recentScores.addScore(score.score);
                    restartGame();
                }
            }
            this.displayUserClicks();
    };

    this.displayUserClicks = function () {
        for (let i = userClicks.length - 1; i >= 0; i--) {
            userClicks[i].update();
            userClicks[i].display();
            if (!userClicks[i].isVisible) {
                userClicks.splice(i, 1);
            }
        }
    };

    this.mousePressed = function () {
        console.log(hasGameStarted);
        if (hasGameStarted) {
            numberOfClicksWhileGameStarted++;
        }
        if (numberOfClicksWhileGameStarted > 1) {
            let hasHitStaticTarget = this.processUserClickedStaticTarget();
            if (!hasHitStaticTarget) {
                this.processedMissedTarget();
            }
        }

    };

    this.processUserClickedMovingTarget = function () {
        let hasHitATarget = false;
        let distance = dist(mouseX, mouseY, movingTarget.pos.x, movingTarget.pos.y);
        if (distance < movingTarget.radius) {
            hasHitATarget = true;
            score.score += 8;
            userClicks.push(new HitTarget(mouseX, mouseY, 8));
            movingTarget.beenClicked();
        }
        return hasHitATarget;
    };

    this.processUserClickedStaticTarget = function () {
        let hasHitATarget = false;
        for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
            let distance = dist(mouseX, mouseY, targets[i].pos.x, targets[i].pos.y);
            if (distance < targets[i].radius) {
                hasHitATarget = true;
                console.log(targets[i].timeAlive);
                userClicks.push(new HitTarget(mouseX, mouseY, Math.floor(600 / targets[i].timeAlive)));
                score.score += Math.floor(600 / targets[i].timeAlive);
                targets[i].respawn(true);
                numberOfStaticsHit++;
            }
        }
        return hasHitATarget;
    };

    this.processedMissedTarget = function () {
        score.score -= 5;
        userClicks.push(new MissedTarget(mouseX, mouseY, 5));
    }
}