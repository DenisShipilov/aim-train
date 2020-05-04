let aimTimer;
let score;
let numberOfStaticsHit = 0;
let recentScores;
let greeting, button, input, select;
let hasGameStarted = false;
let numberOfClicksWhileGameStarted = 0;
let currentStrategy;
const NUMBER_OF_TARGETS = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(13);

    input = createInput();
    input.position(width / 2 - 250, height / 2);

    button = createButton('Play');
    button.position(width / 2 - 250, height / 2 + 80);
    button.mousePressed(userHasInputName);

    select = createSelect();
    select.position(width / 2 - 250, height / 2 + 150);
    select.option("Static target firing", "static");
    select.option("Moving target aiming", "moving");
}

function userHasInputName() {
    button.style("visibility", "hidden");
    input.style("visibility", "hidden");
    select.style("visibility", "hidden");
    recentScores = new RecentScores(input.value());
    hasGameStarted = true;

    initCurrentStrategy();
    restartGame();
}

function restartGame() {
    currentStrategy.run();
}

function draw() {
    if(hasGameStarted) {
        currentStrategy.draw();
    }
}

function mousePressed() {
    if(hasGameStarted) {
        currentStrategy.mousePressed();
    }

}

function initCurrentStrategy() {
    const item = select.value();
    switch (item) {
        case "static" : {
            currentStrategy = new TargetAimStatic();
        }
        break;
        case "moving": {
            currentStrategy = new TargetAimMoving();
        }
        break;
    }
}