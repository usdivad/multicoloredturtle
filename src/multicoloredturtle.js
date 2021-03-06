class Turtle {
    constructor() {
        this.organs = {};
    }

    addOrgan(name, organ) {
        this.organs[name] = organ;
    }

    getOrgan(name) {
        return this.organs[name];
    }

    redrawOrgans() {
        for (name in this.organs) {
            this.organs[name].redraw();
        }
    }

    hasOrgansOfSize(n) {
        // var hasOrgans = false;
        for (name in this.organs) {
            var organ = this.organs[name];
            if (!organ.collected && organ.anklebones.length == n) {
                return true;
            }
        }
        return false;
    }

    areAllOrgansCollected() {
        var numCollected = 0;
        var numOrgans = 0;
        for (name in this.organs) {
            var organ = this.organs[name];
            if (organ.collected) {
                numCollected += 1;
            }
            numOrgans += 1;
        }
        return (numCollected == numOrgans);
    }
}

class TurtleOrgan {
    constructor(name, posX, posY, fill, anklebones) {
        this.name = name;
        this.x = posX;
        this.y = posY;
        this.fill = fill;
        this.anklebones = anklebones; // List of Anklebones

        this.collected = false;
    }

    redraw() {
        if (!this.collected) {
            noStroke();
            fill(this.fill);
        }
        else {
            noFill();
            stroke("#d4b46a");
        }

        var isMouseover = false;

        // Do initial draw
        for (var i=0; i<this.anklebones.length; i++) {
            var anklebone = this.anklebones[i];
            var x = this.x + anklebone.x;
            var y = this.y + anklebone.y;
            var h = 20;

            ellipse(x, y, h);

            if (mouseX >= x-h && mouseY >= y-h &&
                mouseX <= x+h && mouseY <= y+h) {
                isMouseover = true;
            }
        }

        // Do mouse hover draw
        if (isMouseover) {
            for (var i=0; i<this.anklebones.length; i++) {
                var anklebone = this.anklebones[i];
                var x = this.x + anklebone.x;
                var y = this.y + anklebone.y;
                var h = 25;

                ellipse(x, y, h);
            }

            if (hasMouseDownOccurred && mouseIsPressed) {
                this.handlePlayerInteraction();
                hasMouseDownOccurred = false
            }

            currOrgan = this.name;
            currOrganFill = this.fill;
        }
        else {
            //currOrgan = "";
        }
    }

    isCollected() {
        return this.collected;
    }

    setCollected(collected) {
        this.collected = collected;
    }

    handlePlayerInteraction() {
        if (currDiceRoll < 1) {
            notifyPlayer("Please roll dice before choosing organs");
            return;
        }

        if (currDiceRoll == this.anklebones.length) {
            if (!this.collected) {
                if (currPlayerTurnAnklebones == 0) {
                    this.setCollected(true);
                    currPlayer.addOrgan(this.anklebones.length);
                    currPlayerTurnAnklebones += this.anklebones.length;
                }
                else {
                    notifyPlayer("You may only collect one organ per turn; to change your choice, put your selected organ back and then re-select");
                }
            }
            else {
                if (currPlayer.hasOrgan(this.anklebones.length) && currPlayerTurnAnklebones >= this.anklebones.length) {
                    this.setCollected(false);
                    currPlayer.removeOrgan(this.anklebones.length);

                    // Do debt first, then ankles
                    //if (currPlayerTurnDebt <= 0) {
                        currPlayerTurnAnklebones -= this.anklebones.length;
                    //}
                    //else {
                    //    currPlayerTurnDebt -= this.anklebones.length;
                    //}
                }
                else {
                    notifyPlayer("You don't have the anklebones for this organ type");
                }
            }
        }
        else {
            notifyPlayer("Sorry, this organ has " + this.anklebones.length + " anklebones, while you rolled a " + currDiceRoll);
        }
    }
}

class TurtleAnklebone {
    constructor(x, y) { // Offset from base organ
        this.x = x;
        this.y = y;
    }
}


class Player {
    constructor(name) {
        this.name = name;
        this.collectedOrgans = [];
    }

    hasOrgan(n) {
        var i = this.collectedOrgans.indexOf(n);
        return (i > -1);
    }

    addOrgan(n) {
        this.collectedOrgans.push(n);
    }

    removeOrgan(n) {
        var i = this.collectedOrgans.indexOf(n);
        if (i > -1) {
            this.collectedOrgans.splice(i, 1);
        }
    }

    getName() {
        return name;
    }
}


$(document).ready(function() {
    console.log("Alag Melkhii!");
});



// ================================
// Core loop

// Turtle
var turtle = new Turtle();
var currOrgan = "";
var currOrganFill = "#ffffff";

// Player, game logic
var player1 = new Player("Player 1");
var player2 = new Player("Player 2"); // TODO: Deal with more or fewer players
var currDiceRoll = 0;
var currPlayer = player1;
var hasMouseDownOccurred = false;
var hasPlayerRolledDice = false;
//var canPlayerEndTurn = false;
var currPlayerTurnAnklebones = 0;
var currPlayerTurnDebt = 0;
var justRolledDice = false;
var instructionsText = "";
var mode = "";

// Text
var bebas;
var myriad;
var textX = 960;
var textColor = "#484848";
var buttonColor = "#a3834c";
var buttonColorHover = "#315a66";
// var buttonTextColor = "#cfcfce";

var rollDiceButtonParams = {
    "x": textX-80-5,
    "y": 155,
    "w": 84,
    "h": 30
};

var endTurnButtonParams = {
    "x": textX-80-5,
    "y": 420,
    "w": 84,
    "h": 30
}

function preload() {
    bebas = loadFont("fonts/BebasKai-Regular.otf");
    myriad = loadFont("fonts/MyriadPro-Regular.otf");
}

function setup() {
    createCanvas(1100, 600);


    // TURTLE

    // Spine
    turtle.addOrgan("spine1", new TurtleOrgan("Spine", 400, 240, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine2", new TurtleOrgan("Spine", 400, 280, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine3", new TurtleOrgan("Spine", 400, 320, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine4", new TurtleOrgan("Spine", 400, 360, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine5", new TurtleOrgan("Spine", 400, 400, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine6", new TurtleOrgan("Spine", 400, 440, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));


    // Legs
    turtle.addOrgan("leg1", new TurtleOrgan("Leg", 240, 200, "#484848", [
            new TurtleAnklebone(30, 0),
            new TurtleAnklebone(-30, 0),
            new TurtleAnklebone(0, 30),
            new TurtleAnklebone(0, -30),
        ]));
    turtle.addOrgan("leg2", new TurtleOrgan("Leg", 560, 200, "#484848", [
            new TurtleAnklebone(30, 0),
            new TurtleAnklebone(-30, 0),
            new TurtleAnklebone(0, 30),
            new TurtleAnklebone(0, -30),
        ]));
    turtle.addOrgan("leg3", new TurtleOrgan("Leg", 240, 480, "#484848", [
            new TurtleAnklebone(30, 0),
            new TurtleAnklebone(-30, 0),
            new TurtleAnklebone(0, 30),
            new TurtleAnklebone(0, -30),
        ]));
    turtle.addOrgan("leg4", new TurtleOrgan("Leg", 560, 480, "#484848", [
            new TurtleAnklebone(30, 0),
            new TurtleAnklebone(-30, 0),
            new TurtleAnklebone(0, 30),
            new TurtleAnklebone(0, -30),
        ]));


    // Feet
    turtle.addOrgan("foot1", new TurtleOrgan("Foot", 180, 140, "#a39675", [
            new TurtleAnklebone(5, 5),
            new TurtleAnklebone(40, -10),
            new TurtleAnklebone(-10, 40),
            new TurtleAnklebone(80, -10),
            new TurtleAnklebone(-10, 80),
        ]));

    turtle.addOrgan("foot2", new TurtleOrgan("Foot", 620, 140, "#a39675", [
            new TurtleAnklebone(-5, 5),
            new TurtleAnklebone(-40, -10),
            new TurtleAnklebone(10, 40),
            new TurtleAnklebone(-80, -10),
            new TurtleAnklebone(10, 80),
        ]));

    turtle.addOrgan("foot3", new TurtleOrgan("Foot", 180, 540, "#a39675", [
            new TurtleAnklebone(5, -5),
            new TurtleAnklebone(40, 10),
            new TurtleAnklebone(-10, -40),
            new TurtleAnklebone(80, 10),
            new TurtleAnklebone(-10, -80),
        ]));

    turtle.addOrgan("foot4", new TurtleOrgan("Foot", 620, 540, "#a39675", [
            new TurtleAnklebone(-5, -5),
            new TurtleAnklebone(-40, 10),
            new TurtleAnklebone(10, -40),
            new TurtleAnklebone(-80, 10),
            new TurtleAnklebone(10, -80),
        ]));


    // Neck
    turtle.addOrgan("neck", new TurtleOrgan("Neck", 400, 180, "#821b18", [
            new TurtleAnklebone(-20, 0),
            new TurtleAnklebone(-20, 30),
            new TurtleAnklebone(-20, -30),
            new TurtleAnklebone(20, 0),
            new TurtleAnklebone(20, 30),
            new TurtleAnklebone(20, -30),
        ]));

    // Head
    turtle.addOrgan("head", new TurtleOrgan("Head", 400, 80, "#ffc80e", [
            new TurtleAnklebone(0, 0),
            new TurtleAnklebone(0, 30),
            new TurtleAnklebone(0, -30),
        ]));

    // Eyes and ears
    turtle.addOrgan("eyes", new TurtleOrgan("Eyes", 400, 40, "#026db3", [
            new TurtleAnklebone(45, 0),
            new TurtleAnklebone(-45, 0),
        ]));
    turtle.addOrgan("ears", new TurtleOrgan("Ears", 400, 100, "#ff7600", [
            new TurtleAnklebone(45, 0),
            new TurtleAnklebone(-45, 0),
        ]));

    // Tail
    turtle.addOrgan("tail", new TurtleOrgan("Tail", 400, 500, "#ffa80e", [
            new TurtleAnklebone(0, 0),
            new TurtleAnklebone(0, 30),
            new TurtleAnklebone(0, -30),
        ]));


    // Heart
    turtle.addOrgan("heart", new TurtleOrgan("Heart", 400, 300, "#aa005a", [
            new TurtleAnklebone(0, 0),
        ]));

    // Kidneys
    turtle.addOrgan("kidneys", new TurtleOrgan("Kidneys", 400, 380, "#fb9ecf", [
            new TurtleAnklebone(-20, 0),
            new TurtleAnklebone(20, 0),
        ]));

    // Bladder
    turtle.addOrgan("bladder", new TurtleOrgan("Bladder", 400, 420, "#429285", [
            new TurtleAnklebone(0, 0),
        ]));





    // PLAYER


}

function draw() {
    // Setup
    background("#ffe5aa"); // #d4b46a

    // Turtle
    currOrgan = "";
    currOrganFill = "#ffe5aa";
    turtle.redrawOrgans();

    // Scroll
    fill("#d4b46a");
    rect(0, 0, 80, 600);
    rect(1100-80, 0, 80, 600);


    // TEXT

    // Game headings
    textFont(bebas);
    fill(textColor);
    noStroke();
    textAlign(RIGHT);

    textSize(32);
    text("Alag Melkhii", textX, 50);

    textSize(24);
    text("(Multicolored Turtle)", textX, 75);

    if (turtle.areAllOrgansCollected()) {
        var winner = determineWinner();
        var endMsg = winner + " wins!";
        if (winner == "") {
            endMsg = "It's a tie!";
        }
        textFont(myriad);
        textSize(24);
        if (winner == "Player 1") {
            fill("#821b18");
            stroke("#821b18");
        }
        else {
            fill("#429285");
            stroke("#429285");
        }
        strokeWeight(1);
        text(endMsg, textX, 125);
        return;   
    }


    // Player text
    var turnMsg = currPlayer.name + "'s turn";
    textFont(myriad);
    textSize(20);
    if (currPlayer.name == "Player 1") {
        fill("#821b18");
        stroke("#821b18");
    }
    else {
        fill("#429285");
        stroke("#429285");
    }
    strokeWeight(1);
    text(turnMsg, textX, 125);
    fill(textColor);
    noStroke();

    // Roll dice
    if (!hasPlayerRolledDice) {
        var rollDiceButtonColor = textColor;
        // fill(buttonColor);

        if (isMouseOverRollDiceButton()) {
            rollDiceButtonColor = "#d4b46a";
        }

        stroke(rollDiceButtonColor);
        strokeWeight(3);
        noFill();
        rect(rollDiceButtonParams.x, rollDiceButtonParams.y, rollDiceButtonParams.w, rollDiceButtonParams.h);
        strokeWeight(1);
        noStroke();

        fill(rollDiceButtonColor);
        textFont(bebas);
        textSize(24);
        text("Roll Dice", textX-5, rollDiceButtonParams.y + 25);
    }
    else {
        textFont(myriad);
        textSize(18);
        text("You rolled a ", textX-15, 170);

        textFont(bebas);
        textSize(24);
        text("" + currDiceRoll, textX, 170);

        textFont(myriad);
        textSize(18);
        text("Sizes of your collected organs: ", textX, 215);

        textFont(bebas);
        textSize(24);
        var organSizes = currPlayer.collectedOrgans.join(", ");
        if (organSizes.length == 0) organSizes = "N/A";
        text(organSizes, textX, 250);


        // Instructions text
        // var instructionsText = "";
        if (!justRolledDice) {
            if (turtle.hasOrgansOfSize(currDiceRoll)) {
                currPlayerTurnAnklebones = 0;
                // currPlayerTurnDebt = currDiceRoll;
                //instructionsText = "There are still organs left of size " + currDiceRoll + ", so you can collect one";
                instructionsText = "You can collect an organ this turn";
                mode = "collect";
            }
            else if (currPlayer.hasOrgan(currDiceRoll)) {
                currPlayerTurnAnklebones = currDiceRoll;
                // currPlayerTurnDebt = currDiceRoll;
                // instructionsText = "There are no organs left of size " + currDiceRoll + ", so you must return one";
                instructionsText = "You must return an organ this turn";
                mode = "return";
            }
            else {
                currPlayerTurnAnklebones = currDiceRoll;
                // currPlayerTurnDebt = 0;
                // instructionsText = "There are no organs left of size " + currDiceRoll + ", and you don't have one; you can't do anything";
                instructionsText = "You are unable to act this turn";
                mode = "skip";
            }
            console.log(instructionsText);

            justRolledDice = true;
        }


        var textP2Offset = 20;

        textFont(myriad);
        textSize(18);
        stroke(textColor);
        strokeWeight(1);
        text(instructionsText, textX, 295 + textP2Offset);

        textFont(myriad);
        textSize(18);
        noStroke();
        text("Click on turtle organs to", textX, 340 + textP2Offset);
        text("collect/return them", textX, 365 + textP2Offset);
        

        if (canPlayerEndTurn()) {
            var endTurnButtonColor = textColor;
            // fill(buttonColor);

            if (isMouseOverEndTurnButton()) {
                endTurnButtonColor = "#d4b46a";
            }

            stroke(endTurnButtonColor);
            strokeWeight(3);
            noFill();
            rect(endTurnButtonParams.x, endTurnButtonParams.y, endTurnButtonParams.w, endTurnButtonParams.h);
            strokeWeight(1);
            noStroke();

            fill(endTurnButtonColor);
            textFont(bebas);
            textSize(24);
            text("End Turn", textX-5, endTurnButtonParams.y + 25);
        }
    }


    // Turtle text (bottom)
    // if (hasPlayerRolledDice) {
        textFont(myriad);
        textAlign(CENTER);
        textSize(18);
        //fill(currOrganFill); // TODO: Fix colors so that this works for all organs
        fill(textColor);
        noStroke();
        text(currOrgan, 400, 590);
    // }

    // Reset
    fill(textColor);
}

function mousePressed() {
    hasMouseDownOccurred = true;

    if (isMouseOverRollDiceButton()) {
        rollDice();
    }

    if (isMouseOverEndTurnButton()) {
        endTurn();
    }
}




// ========
// Utility functions and stuff

function notifyPlayer(msg) {
    alert(msg); // TODO: Make this a separate panel or something
}

function isMouseOverRollDiceButton() {
    return (mouseX >= rollDiceButtonParams.x && mouseY >= rollDiceButtonParams.y &&
            mouseX <= rollDiceButtonParams.x + rollDiceButtonParams.w && mouseY <= rollDiceButtonParams.y + rollDiceButtonParams.h &&
            !hasPlayerRolledDice);
}

function rollDice() {
    currDiceRoll = Math.floor(Math.random() * 6) + 1;
    // currDiceRoll = 1;
    hasPlayerRolledDice = true;
}

function canPlayerEndTurn() {
    // return (currPlayerTurnAnklebones == currDiceRoll || currPlayerTurnDebt == 0);
    if (mode == "collect") {
        return (currPlayerTurnAnklebones == currDiceRoll);
    }
    else if (mode == "return") {
        return (currPlayerTurnAnklebones == 0);
    }
    else {
        return true;
    }
}

function isMouseOverEndTurnButton() {
    return (mouseX >= endTurnButtonParams.x && mouseY >= endTurnButtonParams.y &&
            mouseX <= endTurnButtonParams.x + endTurnButtonParams.w && mouseY <= endTurnButtonParams.y + endTurnButtonParams.h &&
            canPlayerEndTurn());
}

function endTurn() {
    if (currPlayer.name == "Player 1") {
        currPlayer = player2;
    }
    else {
        currPlayer = player1;
    }

    currDiceRoll = 0;
    hasPlayerRolledDice = false;
    currPlayerTurnAnklebones = 0;
    currPlayerTurnDebt = 0;
    justRolledDice = false;
    mode = "";
}

function determineWinner() {
    var player1Score = player1.collectedOrgans.reduce(function(t,v) {return t+v;}, 0);
    var player2Score = player2.collectedOrgans.reduce(function(t,v) {return t+v;}, 0);

    if (player1Score > player2Score) {
        return player1.name;
    }
    else if (player2Score > player1Score) {
        return player2.name;
    }

    return "";
}



