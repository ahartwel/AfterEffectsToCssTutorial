var counter = 0;
//setup audio context

var ctx = new window.AudioContext();


var majorScale = [130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493];
var indScale = [65.41, 69.30, 77.78, 82.41, 98, 103.83, 116.54];

//set up the stage and insert the renderer
var stage = new PIXI.Stage(0x000000);
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null, false, true);

var player = new Person(200, 200);
//add the renderer
function loaded() {
    document.body.appendChild(renderer.view);
    window.addEventListener("keydown", keyPressed, false);
}

var mute = false;
var tempo = 120.0;
//create a gravity center point
var grav = [];



for (var i = 0; i <= 0; i++) {
   
        grav[i] = new GRAVITYCLUSTER(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * 100 + 50, i);
   

}



function getNewGearPos(gX, gY, gR) {
    var newPos = [];
    var newX, newY;

    newX = gX + (Math.cos(toRadians(Math.random() * 90)) * gR);
    newY = gY + (Math.cos(toRadians(Math.random() * 90)) * gR);

    newPos.x = newX;
    newPos.y = newY;

    return newPos;
}





var beat = 0;

//set up keyboard events




requestAnimFrame(animate);

function animate() {
    requestAnimFrame(animate);
    beat++;
    if (beat >= tempo) {
        beat = 0;

        for (var i = 0; i < grav.length; i++) {

            grav[i].getPlacement();


        }

    }

    var xAdd = Math.random() * 10;
    var yAdd = Math.random() * 10;
    for (var i = 0; i < grav.length; i++) {
        grav[i].display();
        //grav[i].mute();
    }
    player.display();
    player.update();
    player.activeGrav();


    if (mute) {
        muteIt();
    }

    renderer.render(stage);




}




//keyboard stuff -----------------------------------------------------------------



function touche(evt) {
    evt.preventDefault();
    player.gravity = -.015;
    player.jumping = true;


    //changeNote

    for (var z = 0; z < grav.length; z++) {
        var noteTo = 0;
        for (var i = 0; i < grav[z].amount; i++) {

            if ((grav[z].plat[i].r % 360 <= grav[z].plat[noteTo].r)) {
                noteTo = i;

                if (i == player.activeG) {
                    //  grav[z].gainNode.gain.value=.4;             
                }
                grav[z].osc.frequency.value = indScale[Math.floor(grav[z].plat[i].l / (200) * 6)];
                grav[z].osc2.frequency.value = indScale[Math.floor(grav[z].plat[i].d / (300) * 6)];
            }
        }
    }




}
window.addEventListener('load', function () { // on page load

    document.body.addEventListener("touchstart", touche, false);
}, false);

function keyPressed(e) {
    switch (e.keyCode) {
    case 37: //left
        console.log("left");
        grav[player.activeG].rotateLeft();
        break;
    case 38: //up
        var strength = ((1 - (dist(grav[player.activeG].cX, grav[player.activeG].cY, player.xPos, player.yPos) / grav[player.activeG].diameter)) * -.015) - .005;
        console.log(strength);


        player.gravity = strength;
        player.jumping = true;


        //changeNote

        for (var z = 0; z < grav.length; z++) {
            var noteTo = 0;
            for (var i = 0; i < grav[z].amount; i++) {

                if ((grav[z].plat[i].r % 360 <= grav[z].plat[noteTo].r)) {
                    noteTo = i;

                    if (i == player.activeG) {
                        //  grav[z].gainNode.gain.value=.4;             
                    }
                    grav[z].osc.frequency.value = majorScale[Math.floor(grav[z].plat[i].l / (200) * 13)];
                    grav[z].osc2.frequency.value = majorScale[Math.floor(grav[z].plat[i].d / (300) * 13)];
                }
            }
        }




        break;
    case 39: //right
        grav[player.activeG].rotateRight();
        break;
    case 40:
        //down

        break;

    case 32:
        if (mute) {
            mute = false;
        } else {
            mute = true;
        }

        break;

    }
}




function muteIt() {

    for (var i = 0; i < grav.length; i++) {

        grav[i].gainNode.gain.value = 0;


    }
}
//---------------------------------------------------------------------------
//----------------------------------------------------------------------



//player Class ------------------------------------------------------------------------
//------------------------------------------------------------------------------------

function Person(x, y) {

    //set up methods
    this.xPos = x;
    this.yPos = y;
    this.w = 10;
    this.h = 10;
    this.collision = false;
    this.jumping = false;
    this.rSpeed = 0;
    this.gravity = .005;
    this.jump = 0;
    this.activeG = 0;

    this.player = new PIXI.Graphics();

    this.player.beginFill(0xFFFFF)
    this.player.lineStyle(0, 0xFFFFF);
    this.player.drawCircle(0, 0, this.w)
    this.player.position.set(this.xPos, this.yPos);
    this.player.endFill;

    stage.addChild(this.player);

    this.display = function () {
        this.player.clear();
        this.player.beginFill(0xFFFFF)
        this.player.lineStyle(0, 0xFFFFF);
        //this.player.pivot.set(10,10);
        this.player.drawCircle(0, 0, this.w)
        this.player.position.set(this.xPos, this.yPos);
        this.player.endFill;

    };

    this.update = function () {

        if (this.collision == false) {
            this.xPos = lerp(this.xPos, grav[this.activeG].cX, this.gravity);
            this.yPos = lerp(this.yPos, grav[this.activeG].cY, this.gravity);
            this.moveRight(this.rSpeed);
        }
        if (this.jumping) {
            if (this.gravity <= .005) {
                this.gravity += .0005;
                this.xPos = lerp(this.xPos, grav[this.activeG].cX, this.gravity);
                this.yPos = lerp(this.yPos, grav[this.activeG].cY, this.gravity);

            }


        }

        if (this.rSpeed >= 0) {
            this.rSpeed -= .0005;
        }


        if (this.xPos < .2 * window.innerWidth) {
            this.addOffset(Math.abs(this.xPos - (.2 * window.innerWidth)), 0);
        } else if (this.xPos > .8 * window.innerWidth) {
            this.addOffset(-1 * Math.abs(this.xPos - (.8 * window.innerWidth)), 0);
        }

        if (this.yPos < .2 * window.innerHeight) {
            this.addOffset(0, Math.abs(this.yPos - (.2 * window.innerHeight)));
        } else if (this.yPos > .8 * window.innerHeight) {
            this.addOffset(0, -1 * Math.abs(this.yPos - (.8 * window.innerHeight)));
        }

        this.collision = false;
    };

    this.jumpUp = function (amount) {


        this.xPos = lerp(grav[this.activeG].cX, this.xPos, 1.1);
        this.yPos = lerp(grav[this.activeG].cY, this.yPos, 1.1);
    };

    this.onCollision = function (degAmount) {
        this.moveRight(degAmount);

        this.collision = true;
        this.rSpeed = degAmount;

    };

    this.moveRight = function (degAmount) {


        var xS = this.xPos - grav[this.activeG].cX;
        var yS = this.yPos - grav[this.activeG].cY;

        var x2 = xS * (Math.cos(toRadians(degAmount))) - yS * (Math.sin(toRadians(degAmount)));
        var y2 = xS * (Math.sin(toRadians(degAmount))) + yS * (Math.cos(toRadians(degAmount)));

        this.xPos = grav[this.activeG].cX + x2;
        this.yPos = grav[this.activeG].cY + y2;




    };


    this.activeGrav = function () {
        var shortest = dist(grav[this.activeG].cX, grav[this.activeG].cY, this.xPos, this.yPos);

        for (var i = 0; i < grav.length; i++) {
            if (dist(grav[i].cX, grav[i].cY, this.xPos, this.yPos) <= shortest - 10) {
                this.activeG = i;
            }

        }


    };


    this.addOffset = function (x, y) {
        for (var i = 0; i < grav.length; i++) {
            grav[i].cX += x;
            grav[i].cY += y;
        }
        this.xPos += x;
        this.yPos += y;

    };


}

//------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------




//gravityCenter class ---------------------------------------------------------------
//------------------------------------------------------------------------------------


function GRAVITYCLUSTER(centerX, centerY, amount, idizzle) {
    this.cX = centerX;
    this.cY = centerY;
    this.plat = [];
    this.id = idizzle;
    this.amount = amount;
    this.diameter = window.innerWidth * 2.5;
    this.radius = this.diameter / 2;


    for (var i = 0; i < amount; i++) {
        this.plat[i] = new Platforms(this.cX, this.cY, this.diameter, idizzle);
    }
    this.beatPlace = Math.floor(Math.random() * tempo);
    console.log(this.beatPlace);
    this.volumeLower = Math.random() * .03 + .007;

    this.osc = ctx.createOscillator();
    this.gainNode = ctx.createGain();
    this.osc2 = ctx.createOscillator();


    this.osc.connect(this.gainNode);
    this.osc2.connect(this.gainNode);
    this.gainNode.connect(ctx.destination);


    this.gainNode.gain.value = .2;
    //this.osc.type = "square";
    this.osc.frequency.value = 440;
    this.osc.start();

    this.osc2.type = "square";
    this.osc2.frequency.value = 440;
    this.osc2.start();

    this.display = function () {
        for (var i = 0; i < this.amount; i++) {
            this.plat[i].collisionDetection();
            this.plat[i].update();


        }



        if (this.gainNode.gain.value >= 0.05) {
            this.gainNode.gain.value -= this.volumeLower;
        }


        if (beat == this.beatPlace) {
            console.log("shit");
            this.gainNode.gain.value = .4;
        }

    }


    this.getPlacement = function () {
        var d = dist(this.cX, this.cY, player.xPos, player.yPos);
        var p = d / window.innerWidth;
        if (p > 1) {
            p = 1;
        };

        this.beatPlace = Math.floor(p * tempo);

    }

    this.rotateRight = function () {

        for (var i = 0; i < this.amount; i++) {
            this.plat[i].rSpeed += .12;
        }

    }

    this.rotateLeft = function () {
        for (var i = 0; i < this.amount; i++) {
            this.plat[i].rSpeed -= .12;
        }

    }

    this.mute = function () {
        this.gainNode.gain.value = 0;

    };


}









//platforms class -------------------------------------------------------------------
//-------------------------------------------------------------------

function Platforms(cx, cy, diameter, gravId) {
    //setting up the properties
    this.centerX = cx; //the center of the cluster
    this.centerY = cy;
    this.d = Math.random() * (diameter - 15) + 15; //distance from the center
    this.l = Math.random() * (500 - 20) + 20; //length of platform
    this.r = Math.random() * 360; //rotation around center;
    this.rSpeed = .2; //the speed its gonna rotate at;
    this.fillColl = ""; //fill color of the platform
    this.timer = 0; //timer for the fade from blue
    this.opac = 1; //opacity for fade from blue
    this.colorSwitch = false; //should it switch to blue?
    this.xPos = this.centerX + Math.cos(toRadians(this.r)) * this.d;
    this.yPos = this.centerY + Math.sin(this.r * this.d);
    this.gravId = gravId;
    this.wiggle = false;
    this.impactWiggle = 15;
    this.pointOfImpact = 0;
    //initial draw of the ledge
    /* this.ledge = new PIXI.Graphics();
    this.ledge.beginFill(0xFFFFFFF);
    this.ledge.pivot.set(.5 * this.l, 1);
    this.ledge.lineStyle(3, 0xFFFFFFF);
    this.ledge.drawRect(0, 0, this.l, 2);
    this.ledge.endFill();
    this.ledge.position.x = this.xPos;
    this.ledge.position.y = this.yPos;

    stage.addChild(this.ledge);
*/

    this.lineOne = new PIXI.Graphics();
    this.lineOne.lineStyle(5, 0xFFF);
    this.lineOne.moveTo(-.5 * this.l, 0);

    var leng = Math.floor(Math.random() * 6 + 2);
    for (var i = 1; i <= leng; i++) {
        var randomH = Math.random() * 8 - 4;
        this.lineOne.lineTo(((i / (leng + 1)) * this.l) - (.5 * this.l), 0);
    }
    this.lineOne.lineTo(.5 * this.l, 0);
    stage.addChild(this.lineOne);
    /*
    this.lineTwo = new PIXI.Graphics();
    this.lineTwo.lineStyle(5, 0xFFFF);
    this.lineTwo.moveTo(0, 0);
    this.lineTwo.lineTo(5, 5);

    stage.addChild(this.lineOne);
    stage.addChild(this.lineTwo);
*/
    //setting up the methods

    //update properties
    this.update = function () {

        this.xPos = grav[this.gravId].cX + Math.cos(toRadians(this.r)) * this.d;
        this.yPos = grav[this.gravId].cY + Math.sin(toRadians(this.r)) * this.d;

        /*
        this.ledge.rotation = toRadians(this.r + 90);
        this.ledge.position.x = this.xPos;
        this.ledge.position.y = this.yPos;
        */


        this.lineOne.clear();
        this.lineOne.lineStyle(5, 0xFFF);
        this.lineOne.moveTo(-.5 * this.l, 0);

        var leng = Math.floor(Math.random() * 15);
        for (var i = 1; i <= leng; i++) {
            if (this.wiggle == false) {
                var max = grav[this.gravId].gainNode.gain.value * 8;
            } else {
                this.impactWiggle -= .5;
                var max = this.impactWiggle;



                if (this.impactWiggle <= 2) {
                    this.wiggle = false;
                }
            }

            if (dist(i / (leng + 1), 0, this.pointOfImpact, 0) <= .13) {

                var randomH = Math.random() * max;
            } else {
                var randomH = Math.random() * max - (max);

            }
            this.lineOne.lineTo(((i / (leng + 1)) * this.l) - (.5 * this.l), randomH);
        }
        this.lineOne.lineTo(.5 * this.l, 0);
        this.lineOne.position.set(this.xPos, this.yPos);
        this.lineOne.rotation = toRadians(this.r + 90);
        this.addRotation(this.rSpeed);



    };

    this.addRotation = function (rot) {
        this.r += rot;
        if (this.r >= 360) {
            this.r = this.r % 360;
        }
        if (this.r <= 0) {
            this.r = this.r % 360;
        }


    }

    this.collisionDetection = function () {
        var lineX = grav[this.gravId].cX + Math.cos(toRadians(this.r)) * this.d;
        var lineY = grav[this.gravId].cY + Math.sin(toRadians(this.r)) * this.d;

        var aX = lineX + (Math.cos(toRadians(this.r + 90)) * (.51 * this.l));
        var aY = lineY + (Math.sin(toRadians(this.r + 90)) * (.51 * this.l));

        var bX = lineX - (Math.cos(toRadians(this.r + 90)) * (.51 * this.l));
        var bY = lineY - (Math.sin(toRadians(this.r + 90)) * (.51 * this.l));

        /*  
     this.lineTwo.clear();
        this.lineOne.clear();
        
     
    this.lineOne.lineStyle(5,0xFF);
    this.lineOne.moveTo(aX,aY);
    this.lineOne.lineTo(lineX,lineY);
    
   
    this.lineTwo.lineStyle(5,0xFFFF);
    this.lineTwo.moveTo(bX,bY);
    this.lineTwo.lineTo(lineX,lineY);
     */


        //if (this.r>-180) {
        //if (((player.xPos<=aX)&&(player.xPos>=bX)) || (player.yPos<=aY)&&(player.yPos>=bY)) {
        var d = dist(bX, bY, player.xPos, player.yPos);
        var c = dist(aX, aY, player.xPos, player.yPos);
        var x = lerp(bX, aX, d / (d + c));
        var y = lerp(bY, aY, d / (d + c));
        if (dist(player.xPos, player.yPos, x, y) <= player.w) {
            player.onCollision(this.rSpeed);
            //grav[this.gravId].gainNode.gain.value=.6;
            this.wiggle = true;
            this.impactWiggle = 5;
            this.pointOfImpact = d / (d + c);

        }


        //}

        /*
    } 
    else {
      if (((player.xPos>=aX)&&(player.xPos<=bX)) || (player.yPos>=aY)&&(player.yPos<=bY)) {
        var d = dist(bX, bY, player.xPos, player.yPos)-15;
        var c = dist(aX, aY, player.xPos, player.yPos);
        var x = lerp(bX, aX, d/(d+c));
        var y = lerp(bY, aY, d/(d+c));
        if (dist(player.xPos, player.yPos, x, y)<=player.w) {
        player.moveRight(this.rSpeed);
          player.collision=true;
            
            console.log(this.r);
            
        }
      }
    }
    
    */

    };


}


//------------------------------------------------------------------
//-------------------------------------------------------------------







function toRadians(angle) {
    return angle * (Math.PI / 180);
}


function dist(x1, y1, x2, y2) {

    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);

    var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    return d;

}

function lerp(a, b, t) {
    var x = a + t * (b - a);
    return x;
}