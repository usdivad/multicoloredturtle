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
}

class TurtleOrgan {
    constructor(posX, posY, fill, anklebones) {
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
        }
    }

    isCollected() {
        return this.collected;
    }

    setCollected(collected) {
        this.collected = collected;
    }

    handlePlayerInteraction() {
        if (currDiceRoll == this.anklebones.length) {
            if (!this.collected) {
                this.setCollected(true);
                currPlayer.addOrgan(this.anklebones.length);
            }
            else {
                if (currPlayer.hasOrgan(this.anklebones.length)) {
                    this.setCollected(false);
                    currPlayer.removeOrgan(this.anklebones.length);
                }
                else {
                    notifyPlayer("You don't have the anklebones for this organ");
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
    constructor() {
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
}


$(document).ready(function() {
    console.log("Alag Melkhii!");
});



// ================================
// Core loop

var turtle = new Turtle();

var player1 = new Player();
var player2 = new Player(); // TODO: Deal with more or fewer players
var currDiceRoll = 6;
var currPlayer = player1;
var hasMouseDownOccurred = false;

function setup() {
    createCanvas(800, 600);


    turtle.addOrgan("spine1", new TurtleOrgan(400, 240, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine2", new TurtleOrgan(400, 280, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine3", new TurtleOrgan(400, 320, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine4", new TurtleOrgan(400, 360, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine5", new TurtleOrgan(400, 400, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

    turtle.addOrgan("spine6", new TurtleOrgan(400, 440, "#4b9130", [
            new TurtleAnklebone(120, 0),
            new TurtleAnklebone(90, 0),
            new TurtleAnklebone(60, 0),
            new TurtleAnklebone(-60, 0),
            new TurtleAnklebone(-90, 0),
            new TurtleAnklebone(-120, 0),
        ]));

}

function draw() {
    background("#ffe5aa"); // #d4b46a

    turtle.redrawOrgans();
}

function mousePressed() {
    hasMouseDownOccurred = true;
}




// ========

function notifyPlayer(msg) {
    alert(msg); // TODO: Make this a separate panel or something
}
