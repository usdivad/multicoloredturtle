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
            }
        }
    }

    isCollected() {
        return this.collected;
    }

    setCollected(collected) {
        this.collected = collected;
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

    hasOrgan(name) {

    }
}

$(document).ready(function() {
    console.log("Alag Melkhii!");
});



// ================================

var turtle = new Turtle();

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