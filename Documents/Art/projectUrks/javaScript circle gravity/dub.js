//make bassline its own class and then make it so their is a bass drum thud on impact instead of a full bass note, it gets to muddy with each pillar having its own bass


var ctx = new window.AudioContext();
var majorScale = [130.81,146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66,329.63,349.23, 392, 440, 493];

   var stage = new PIXI.Stage(0x000000);
   var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    var wobbler = new wobble();
   var beat = 150;
   var timer = 0;
   var test = [];
   var x = 0;
   var b = -1;
   var y = 0;
   for (var i = 0; i < 2; i++) {

       console.log(y);
       test[i] = new Legs(x, i);
       y -= .5 * window.innerHeight;

       x += 50 + test[i].w;


   }

   var y = -window.innerHeight;
   for (var i = 2; i < 4; i++) {

       console.log(y);
       test[i] = new Legs(x, i);
       y += .5 * window.innerHeight;

       x += 50 + test[i].w;


   }

   requestAnimFrame(animate);

   function loaded() {

       document.body.appendChild(renderer.view);



   }


   function animate() {
       requestAnimFrame(animate);

       for (var i = 0; i < 4; i++) {
           test[i].moveIt();
          
       }
 wobbler.update();

       timer++;
       if (timer >= beat) {
           timer = 0;
       }


       renderer.render(stage);


   }




function wobble() {
    
     this.freq2 =  majorScale[Math.floor( Math.random()*10 )]/2;
       this.freq1 = 1/16*this.freq2;
       
       this.osc = ctx.createOscillator();
       this.gainNode = ctx.createGain();
       this.gain2 = ctx.createGain();
       this.osc2 = ctx.createOscillator();


      

       this.gainNode.gain.value = 60;
       this.gain2.gain.value=0;
       //this.osc.type = "triangle";
       this.osc.frequency.value = this.freq1;
      

       //this.osc2.type = "saw";
       this.osc2.frequency.value = this.freq2;
       
        this.osc.connect(this.gainNode);
    this.osc.connect(this.osc2.frequency);
       this.gainNode.connect(this.osc2.frequency);
       this.osc2.connect(this.gain2);
       this.gain2.connect(ctx.destination);
       
       this.osc.start();
       this.osc2.start();

     this.update = function() {
           
        if (this.gain2.gain.value>=.005) {
         this.gain2.gain.value=lerp(this.gain2.gain.value,.005,.005);   
        }
           
       };
    
    
    
    
    
}



    function Legs(x, id) {
       this.xPos = x;
       this.yPos = -window.innerHeight;
       this.h = window.innerHeight;
       this.w = Math.random() * (300 - 50) + 50;
       console.log(id);
       this.placement = id / 3;


       this.speed = (1 / (this.placement * beat)) * window.innerHeight;

       switch (id) {
       case 0:
        
           this.xPos = 0;
           this.yPos =0;
          
           this.speed = Math.floor(window.innerHeight * (-1 / beat));
           console.log("shiiiiit" + this.speed);
               break;

       case 1:
           this.xPos = .25 * window.innerWidth;
           this.yPos = -.5 * window.innerHeight;
           this.speed =Math.floor(window.innerHeight * (-1 / beat));
 console.log("shiiiiit" + this.speed);
           break;

       case 2:
           this.xPos = .5 * window.innerWidth;
           this.yPos = -window.innerHeight;
           this.speed =Math.floor(window.innerHeight * (1 / beat))+1;

 console.log("shiiiiit" + this.speed);
           break;

       case 3:
           this.xPos = .75 * window.innerWidth;
           this.yPos = -.5 * window.innerHeight;
           this.speed =Math.floor(window.innerHeight * (1 / beat))+1;
 console.log("shiiiiit" + this.speed);


           break;

       }

        this.yPos = Math.random()*-window.innerHeight;
       
       console.log(this.speed);
       this.state = "upAndDown";

       this.leg = new PIXI.Graphics();
       this.leg.beginFill(0xFFFFFFF);
       this.leg.drawRect(0, 0, this.w, this.h);
       this.leg.endFill();
       this.leg.position.x = this.xPos;
       this.leg.position.y = this.yPos;
       console.log("shit" + this.leg.pivot.x + " " + this.leg.pivot.y);
       stage.addChild(this.leg);

       
       
      
       

       this.moveIt = function () {

           this.leg.clear();
           this.leg.beginFill(0xFFFFFF);
           this.leg.lineStyle(5, 0xFFFFFF);
           this.leg.drawRect(0, 0, this.w, this.h);
           this.leg.endFill();

           this.leg.position.set(this.xPos, this.yPos);

           this.xPos+=1;
           
           if (this.xPos>=window.innerWidth) {
            this.xPos -=window.innerWidth + 300; 
            //this.yPos = ((Math.random()*-window.innerHeight)/-window.innerHeight*-4)/4 * window.innerHeight;
           }
           
           
           if (this.state == "upAndDown") {
               if (this.yPos <= -window.innerHeight) {
                  // this.yPos = -window.innerHeight;
                          wobbler.osc.frequency.value=1/64 *majorScale[9- Math.floor( this.w/300 *9 )];             //wobbler.gain2.gain.value=.05;
                   this.speed = Math.floor(window.innerHeight * (1 / beat))+1;
               } else  if (this.yPos >= 0) {
                   console.log(this.yPos);
                   //this.yPos = 0;
                   this.speed = Math.floor(window.innerHeight * (-1 / beat));
                   wobbler.gain2.gain.value=.55;
                   wobbler.osc2.frequency.value=majorScale[9- Math.floor( this.w/300 *9 )]/2;
                   wobbler.osc.frequency.value=1/8
                   8 * wobbler.osc2.frequency.value;
               } 
               
                this.yPos += this.speed;
           }

       };


      


   }

    //platformsClass
   function Platforms(cx, cy) {
       this.box = new PIXI.Graphics();
       this.centerX = cx,
       this.centerY = cy,

       this.left = false;
       this.down = false;
       this.justStarted = true;
       this.l = Math.random() * (300 - 50) + 50,
       this.drawIt = function () {

           this.box.beginFill(0xFFFFFFF);
           this.box.lineStyle(5, 0xFFFFFFF);
           this.box.drawRect(0, 0, 400, 300);
           this.box.endFill();
           this.box.position.x = this.centerX;
           this.box.position.y = this.centerY;
           stage.addChild(this.box);

       };

       this.dimmer = function () {
           this.box.alpha -= Math.random() * .03;

           if (this.box.alpha <= 0) this.box.alpha = .8;
       };

       this.moveIt = function () {
           if (this.down) {
               this.box.position.y += Math.random() * 8;
           } else {
               this.box.position.y -= Math.random() * 8;
           }

           if (this.left) {
               this.box.position.x -= Math.random() * 8;
           } else {
               this.box.position.x += Math.random() * 8;
           }

           if (this.box.position.x <= 0) {
               this.left = false;
           } else if (this.box.position.x >= window.innerWidth) {
               this.left = true;
           }

           if (this.box.position.y < 0) {
               this.down = true;
           } else if (this.box.position.y >= window.innerHeight) {
               this.down = false;
           }
       }

   }



    //connectingLineFunction
   function connector() {
       this.conLine = new PIXI.Graphics();


       this.drawShape = function () {
           this.conLine.lineStyle(10, 0xFF);
           this.conLine.moveTo(platform[0].box.position.x, platform[0].box.position.y);
           for (i = 1; i < platform.length; i++) {
               this.conLine.lineTo(platform[i].box.position.x, platform[i].box.position.y);
           }

           stage.addChild(this.conLine);
       }

       this.animate = function () {
           this.conLine.clear();
           this.conLine.lineStyle(10, 0xFF);
           this.conLine.alpha = .5;
           this.conLine.moveTo(platform[0].box.position.x + 200, platform[0].box.position.y + 150);
           for (i = 1; i < platform.length; i++) {
               this.conLine.lineTo(platform[i].box.position.x + 200, platform[i].box.position.y + 150);
           }

       }

   }




function lerp(a, b, t) {
 var x = a+t * (b - a);
    return x;    
}