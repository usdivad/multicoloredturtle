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

            for (var i=0; i<this.anklebones.length; i++) {
                var anklebone = this.anklebones[i];
                var x = this.x + anklebone.x;
                var y = this.y + anklebone.y;


                ellipse(x, y, 25);
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

$(document).ready(function() {
    console.log("Alag Melkhii!");
});



// ================================

var turtle = new Turtle();

function setup() {
    createCanvas(800, 600);


    turtle.addOrgan("spine1", new TurtleOrgan(300, 300, "#4b9130", [
            new TurtleAnklebone(0, 75),
            new TurtleAnklebone(0, 45),
            new TurtleAnklebone(0, 15),
            new TurtleAnklebone(0, -15),
            new TurtleAnklebone(0, -45),
            new TurtleAnklebone(0, -75),
        ]));

    turtle.addOrgan("spine2", new TurtleOrgan(330, 300, "#4b9130", [
            new TurtleAnklebone(0, 75),
            new TurtleAnklebone(0, 45),
            new TurtleAnklebone(0, 15),
            new TurtleAnklebone(0, -15),
            new TurtleAnklebone(0, -45),
            new TurtleAnklebone(0, -75),
        ]));

    turtle.addOrgan("spine3", new TurtleOrgan(360, 300, "#4b9130", [
            new TurtleAnklebone(0, 75),
            new TurtleAnklebone(0, 45),
            new TurtleAnklebone(0, 15),
            new TurtleAnklebone(0, -15),
            new TurtleAnklebone(0, -45),
            new TurtleAnklebone(0, -75),
        ]));

    turtle.addOrgan("spine4", new TurtleOrgan(440, 300, "#4b9130", [
            new TurtleAnklebone(0, 75),
            new TurtleAnklebone(0, 45),
            new TurtleAnklebone(0, 15),
            new TurtleAnklebone(0, -15),
            new TurtleAnklebone(0, -45),
            new TurtleAnklebone(0, -75),
        ]));

    turtle.addOrgan("spine5", new TurtleOrgan(470, 300, "#4b9130", [
            new TurtleAnklebone(0, 75),
            new TurtleAnklebone(0, 45),
            new TurtleAnklebone(0, 15),
            new TurtleAnklebone(0, -15),
            new TurtleAnklebone(0, -45),
            new TurtleAnklebone(0, -75),
        ]));

    turtle.addOrgan("spine6", new TurtleOrgan(500, 300, "#4b9130", [
            new TurtleAnklebone(0, 75),
            new TurtleAnklebone(0, 45),
            new TurtleAnklebone(0, 15),
            new TurtleAnklebone(0, -15),
            new TurtleAnklebone(0, -45),
            new TurtleAnklebone(0, -75),
        ]));

}

function draw() {
    background("#ffe5aa"); // #d4b46a

    turtle.redrawOrgans();
}