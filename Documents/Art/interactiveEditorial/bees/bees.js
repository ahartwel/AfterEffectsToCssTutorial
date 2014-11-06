 
        
        function Bee() {
         this.beeImage = new beeImage("rgb(255,200,0)");
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.beeImage.bodyCanvas.width * 2.3;
            this.canvas.height = this.beeImage.bodyCanvas.height * 2.3;
            
            this.context = this.canvas.getContext('2d');
            
             this.canvas2 = document.createElement('canvas');
            this.canvas2.width = this.beeImage.bodyCanvas.width * 2.3;
            this.canvas2.height = this.beeImage.bodyCanvas.height * 2.3;
            
            this.context2 = this.canvas.getContext('2d');
            
            
            this.xPos = Math.random()*window.innerWidth;
            this.yPos = Math.random()*window.innerHeight;
            
            
            this.xSpeed = Math.random() * 14 - 7;
            this.ySpeed = Math.random() * 14 - 7;
            
            this.newXSpeed = Math.random() * 14 - 7;
            this.newYSpeed = Math.random() * 14 - 7;
            
            
            this.xChanger = Math.random() * 200;
            this.yChanger = Math.random() * 200;
            
            
            this.bodyX = (this.canvas.width - this.beeImage.bodyCanvas.width)/2;
            this.bodyY = (this.canvas.height - this.beeImage.bodyCanvas.height)/2;
            
            this.context.drawImage(this.beeImage.bodyCanvas, this.bodyX, this.bodyY);
            
            
            this.angle = degrees( Math.atan(this.ySpeed/ this.xSpeed ) );
           
            
            this.state = "fly";
            
            this.wingAngles = [];
            
            var startAngle = 0;
            
            this.numberOfSquares = 15;
            
            this.angleDown = [];
            
            this.piecesX = [];
            this.piecesY = [];
            
            for (var i = 0; i<2;i++) {
                this.wingAngles[i] = startAngle;
                this.wingAngles[i+3] = startAngle;
                this.angleDown[i] = true;
                startAngle+= 5;
                
            }
            
            this.draw = function() {
                if (this.state=="fly" || this.state=="sorround") {
                beesContext.save();
                beesContext.translate(this.xPos, this.yPos);
                beesContext.rotate(radians(this.angle));
                beesContext.drawImage(this.canvas, -.5* this.canvas.width, -.5*this.canvas.height);
                beesContext.drawImage(this.canvas2, -.5* this.canvas.width, -.5*this.canvas.height);
                
                    
                    beesContext.restore();
                this.drawWings();
                } else if (this.state=="die") {
                      beesContext.save();
                beesContext.translate(this.xPos, this.yPos);
                 for (var i = 0; i<= this.numberOfSquares;i++) {
                   this.piecesX[i]+= Math.random()*5-2.5; 
                    this.piecesY[i]+= Math.random()*5-2.5; 
                       beesContext.drawImage(this.canvas, Math.random()*this.canvas.width,Math.random()*this.canvas.height,Math.random()*45,Math.random()*45, -.5* this.canvas.width + this.piecesX[i], -.5*this.canvas.height + this.piecesY[i],Math.random()*45,Math.random()*45);
                     
                 }
                     // beesContext.drawImage(this.canvas, -.5* this.canvas.width, -.5*this.canvas.height);
                     beesContext.restore();
                    
                }
            }
            
            
            this.flapWings = function() {
               for (var i = 0; i <this.wingAngles.length;i++) {  
                if (this.angleDown[i]) {
                 this.wingAngles[i]-=6;
                    if (this.wingAngles[i]<-15) {
                     this.angleDown[i]=false;
                       
                    }
                    
                } else {
                   this.wingAngles[i]+=6;
                    if (this.wingAngles[i]>25) {
                     this.angleDown[i]=true;   
                     
                    }  
                }
                   
                   
               }
                
            }
            
            
            this.changeColor = function() {
                
             this.beeImage = new beeImage("rgb(175,90,0)");   
               this.canvas.width = this.beeImage.bodyCanvas.width * 2.3;
            this.canvas.height = this.beeImage.bodyCanvas.height * 2.3;
            
           
            
           
            this.canvas2.width = this.beeImage.bodyCanvas.width * 2.3;
            this.canvas2.height = this.beeImage.bodyCanvas.height * 2.3;
             this.bodyX = (this.canvas.width - this.beeImage.bodyCanvas.width)/2;
            this.bodyY = (this.canvas.height - this.beeImage.bodyCanvas.height)/2;
           
            }
            
            
            this.drawWings = function() {
                
                this.context2.clearRect(0,0,this.canvas.width, this.canvas.height);
                
                 this.context2.drawImage(this.beeImage.bodyCanvas, this.bodyX, this.bodyY);
                for (var i = 0; i <this.wingAngles.length/2;i++) {
                    
                this.context.save();
                     this.context2.translate(this.bodyX + (this.beeImage.bodyCanvas.width/2), this.bodyY + (this.beeImage.bodyCanvas.height/2));
                     
              
                    this.context2.rotate(radians(this.wingAngles[i]));
                    this.context2.translate(.5* this.beeImage.wingCanvas.width,0);
                    this.context2.drawImage(this.beeImage.wingCanvas,-.3* this.beeImage.wingCanvas.width, -(.65*this.beeImage.wingCanvas.height));
                    this.context2.restore();
                    
                    
                     this.context2.save();
                     this.context2.translate(this.bodyX + (this.beeImage.bodyCanvas.width/2), this.bodyY + (this.beeImage.bodyCanvas.height/2));
              
                    this.context2.rotate(radians(-1 * this.wingAngles[i]));
                    this.context2.translate(-.2* this.beeImage.wingCanvas.width,0);
                    
                    this.context2.drawImage(this.beeImage.wingCanvas,-.8* this.beeImage.wingCanvas.width , -(.65*this.beeImage.wingCanvas.height));
                    this.context2.restore();
                
                }              
                                
                
                
            }
            
            this.update = function() {
                
                
                if (Math.abs(this.xSpeed)>15) {
                 this.xSpeed=this.xSpeed/2;   
                }
                if (Math.abs(this.ySpeed)>15) {
                 this.ySpeed=this.ySpeed/2;   
                }
                
                if (this.state=="fly" || this.state=="sorround") {
             this.xPos += this.xSpeed;   
             this.yPos += this.ySpeed;   
                this.bounds();
                
                    if (this.state=="fly") {
                this.xChanger--;
                this.yChanger--;
                    }
               
                this.directionBounds();
                
                
                this.xSpeed = lerp(this.xSpeed, this.newXSpeed,.003);
                this.ySpeed = lerp(this.ySpeed, this.newYSpeed,.003);
                
                //this.ySpeed += Math.random() * 2 - 1;
                
                this.angle = lerp(this.angle,degrees( Math.atan2(this.ySpeed, this.xSpeed ) )+90, .5);
                this.flapWings();
                
                this.collisionDetect();
                    
                   
                    
                } else if (this.state=="die") {
                    if (Math.random()<.3) {
                     this.numberOfSquares--;   
                    }
                 
                    if (this.numberOfSquares==0) {
                        this.xPos = Math.random()*window.innerWidth;
                        this.yPos = Math.random()*window.innerHeight;
                        //this.state="fly";
                           // this.numberOfSquares=Math.floor( Math.random()*10+10 );
                        }
                      
                     this.xPos += this.xSpeed/3;   
             this.yPos += this.ySpeed/3;
                    
                    
                    }
                    
                    
                
            }
            
            this.bounds = function() {
                
                 if (this.xPos>window.innerWidth+25) {
                    
                 this.xPos = -25;   
                } else if (this.xPos<-25) {
                    
                 this.xPos = window.innerWidth + 25;   
                } 
                
                if (this.yPos>window.innerHeight+25) {
                    
                 this.yPos = -25;   
                } else if (this.yPos<-25) {
                    
                 this.yPos = window.innerHeight + 25;   
                }
                
                
                
            }
            
            
            this.resetDeath = function() {
              
                this.state="fly";
                this.numberOfSquares=Math.floor( Math.random()*10+10 );
                
                
            }
            
            
            this.collisionDetect = function() {
              for (var i = 0; i <hornet.length; i ++) {
                if (dist(this.xPos, this.yPos, hornet[i].xPos, hornet[i].yPos) < hornet[i].canvas.width) {
                    if (hornet[i].deathSize<=0) {
                    this.state="fly";    
                    }
                    
                    if (this.state=="sorround") {
                      
                            hornet[i].numberAttached++;
                           if (dist(this.xPos, this.yPos, hornet[i].xPos, hornet[i].yPos) > hornet[i].canvas.width/2) {
                            this.xPos = lerp(this.xPos, hornet[i].xPos,.2);
                            this.yPos = lerp(this.yPos, hornet[i].yPos,.2);
                               this.xSpeed=0;
                               this.ySpeed=0;
                               
                               
                                var xs = hornet[i].xPos - this.xPos;
                                var ys = hornet[i].yPos - this.yPos;
               
                
                //this.ySpeed += Math.random() * 2 - 1;
                
                this.angle = lerp(this.angle,degrees( Math.atan2(ys, xs) )+270, .5);
                               
                               
                           }
                           
                           
                        
                        } else {
                   // console.log("collision!");
                     var angle = Math.atan( (this.yPos - hornet[i].yPos), (this.xPos - hornet[i].yPos)  );
                
                    
                       this.xSpeed = Math.cos(angle) * Math.abs ( hornet[i].xSpeed) * 1.5;
                 
                         this.ySpeed = Math.sin(angle) * Math.abs ( hornet[i].ySpeed) * 1.5;                                    
                        }   
                        
                    
                    
                        if (hornet[i].state=="seek") {
                                this.xSpeed = Math.cos(angle) * Math.abs ( hornet[i].xSpeed) * .8;
                 
                         this.ySpeed = Math.sin(angle) * Math.abs ( hornet[i].ySpeed) * .8;                     
                              
                          }
                    
                        
                    
                     if (dist(this.xPos, this.yPos, hornet[i].xPos, hornet[i].yPos) < hornet[i].canvas.width/2 && hornet[i].state=="seek") {
                        this.state="die"; 
                         
                         for (var p = 0; p<15;p++) {
                          this.piecesX[p]=0;
                             this.piecesY[p]=0;
                             
                         }
                         
                         hornet[i].hasTarget=false;
                     }
                
                   
                    
                         }
                         
                         }
                
                
            };
            
            
            this.directionBounds = function() {
             if (this.xChanger<=0) {
                  this.newXSpeed = Math.random() * 30 - 15;
                  this.xChanger = Math.random() * 200+60;
                 //this.angle = degrees( Math.atan(this.ySpeed/ this.xSpeed ) ) +90;
             }
                
                if (this.yChanger<=0) {
                   this.newYSpeed = Math.random() * 14 - 7;
                  this.yChanger = Math.random() * 200+60; 
                   // this.angle = degrees( Math.atan(this.ySpeed/ this.xSpeed ) ) + 90;
                }
                
                
            }
            
            
        }
        
        
        
        function beeImage(colour) {
           this.bodyCanvas = document.createElement('canvas');
            
            var randomness = justRight();
            
         this.bodyCanvas.height = (.045*window.innerWidth) * randomness;
         this.bodyCanvas.width = (.03*window.innerWidth) * randomness;
            
            this.context = this.bodyCanvas.getContext('2d');
              
           
            
            
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.shadowBlur = 10;
            this.context.shadowColor = "rgba(0,0,0,.3)";
            this.context.fillStyle = "none";
            this.context.arc(.5*this.bodyCanvas.width, .5*this.bodyCanvas.height, .4*this.bodyCanvas.width, 0, 2 *Math.PI, false);
            this.context.fill();
            
            this.context.save();
            this.context.beginPath();
            this.context.arc(.5*this.bodyCanvas.width, .5*this.bodyCanvas.height, .4*this.bodyCanvas.width, 0, 2 *Math.PI, false);
            this.context.clip();
            
            this.context.beginPath();
            
            this.context.arc(.5*this.bodyCanvas.width, .5*this.bodyCanvas.height, .4*this.bodyCanvas.height, 0, 2 *Math.PI, false);
            this.context.fillStyle = colour;
            this.context.fill();
            
            
            this.context.beginPath();
            var x =0;
            var y=.10*this.bodyCanvas.height;
            var stripeWidth = (.08*this.bodyCanvas.height) * justRight();
            while(y<this.bodyCanvas.height) {
                
             this.context.rect(x,y,this.bodyCanvas.width, stripeWidth);
                y+= 2 * stripeWidth;
                
                
            }
            this.context.fillStyle = "rgb(0,0,0)";
            this.context.fill();
            
            this.context.restore();
            
            randomness = justRight();
            var yOff = .15 * randomness;
            var yOff2 = .28 * randomness;
            
            this.context.beginPath();
              this.context.moveTo(.4*this.bodyCanvas.width, .3*this.bodyCanvas.height);
            this.context.lineTo(.3*this.bodyCanvas.width, yOff*this.bodyCanvas.height);
            this.context.lineTo(.3*this.bodyCanvas.width, yOff2*this.bodyCanvas.height);
            
            this.context.strokeStyle="black";
            this.context.lineWidth = 2;
            this.context.stroke();
            
            
            this.context.beginPath();
              this.context.moveTo(.6*this.bodyCanvas.width, .3*this.bodyCanvas.height);
            this.context.lineTo(.7*this.bodyCanvas.width,  yOff*this.bodyCanvas.height);
            this.context.lineTo(.7*this.bodyCanvas.width,  yOff2*this.bodyCanvas.height);
            
          
            this.context.stroke();
            
            
            
            
            this.wingCanvas = document.createElement('canvas');
            this.wingCanvas.width = this.bodyCanvas.width*.8;
            this.wingCanvas.height = this.bodyCanvas.width*.8;
            
            this.wingContext = this.wingCanvas.getContext('2d');
            
            
            this.wingContext.fillStyle = "rgba(255,255,255,.2)";
            this.wingContext.arc(.5*this.wingCanvas.width, .5*this.wingCanvas.height,.4*this.wingCanvas.width,0,Math.PI * 2, false);
            this.wingContext.fill();
            
            
          
            
            
            
        }
        
        



function hornetImage() {
    this.canvas = document.createElement('canvas'); 
    var randomness = justRight();
            while (randomness<1.1) {
                randomness = justRight();
            }
         this.canvas.height = (.15*window.innerWidth) * randomness;
         this.canvas.width = (.08*window.innerWidth) * randomness;
            
            this.context = this.canvas.getContext('2d');
    
           
            
        randomness = justRight();
    this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.shadowBlur = 10;
            this.context.shadowColor = "rgba(0,0,0,.3)";
            this.context.fillStyle = "none";
            this.context.arc(.5*this.canvas.width, .7*this.canvas.height, .25*this.canvas.width, 0, 2 *Math.PI, false);
              this.context.arc(.5*this.canvas.width, .82*this.canvas.height, .08*this.canvas.height, 0, 2 *Math.PI, false);
            this.context.save();
            this.context.fill();
           
            this.context.clip();
            
            this.context.beginPath();
    
               this.context.arc(.5*this.canvas.width, .7*this.canvas.height, .25*this.canvas.width, 0, 2 *Math.PI, false);
    
              this.context.arc(.5*this.canvas.width, .82*this.canvas.height, .08*this.canvas.height, 0, 2 *Math.PI, false);
    
    
            this.context.fillStyle = "rgb(247,152,57)";
            this.context.fill();
            
            
            this.context.beginPath();
            var x =0;
            var y=.05*this.canvas.height;
            var stripeWidth = (.03*this.canvas.height) * justRight();
            while(y<this.canvas.height) {
                
             this.context.rect(x,y,this.canvas.width, stripeWidth);
                y+= 2 * stripeWidth;
                
                
            }
            this.context.fillStyle = "rgb(0,0,0)";
            this.context.fill();
            
            this.context.restore();
            
    
            this.head = document.createElement('canvas');
            this.head.width = this.canvas.width;
            this.head.height = .6*this.canvas.height;
            
            this.hContext = this.head.getContext('2d');
    
            
           
         
    this.hContext.beginPath();
        this.hContext.fillStyle = "rgb(0,0,0)";
            this.hContext.rect(.45*this.head.width,0.53*this.head.height ,.1*this.head.width,this.head.height);
            this.hContext.fill();
    
    
         this.hContext.beginPath();
    
               this.hContext.arc(.5*this.head.width, .5*this.head.height, .12*this.head.height, 0, 2 *Math.PI, false);
    this.hContext.arc(.5*this.head.width, .4*this.head.height, .06*this.head.height, 0, 2 *Math.PI, false);
            this.hContext.fillStyle = "rgb(247,152,57)";
            this.hContext.fill();    
      this.hContext.beginPath();
     this.hContext.arc(.43*this.head.width, .43*this.head.height, .02*this.head.height, 0, 2 *Math.PI, false);
    this.hContext.arc(.57*this.head.width, .43*this.head.height, .02*this.head.height, 0, 2 *Math.PI, false);
               this.hContext.fillStyle = "rgb(0,0,0)";
            this.hContext.fill();    
    
    
    
    
    
    
    
         
            
            this.wingCanvas = document.createElement('canvas');
            this.wingCanvas.width = this.canvas.width*.8;
            this.wingCanvas.height = this.canvas.width*.8;
            
            this.wingContext = this.wingCanvas.getContext('2d');
            
            
            this.wingContext.fillStyle = "rgba(255,255,255,.2)";
            this.wingContext.arc(.5*this.wingCanvas.width, .5*this.wingCanvas.height,.4*this.wingCanvas.width,0,Math.PI * 2, false);
            this.wingContext.fill();
            
    
    
    
}




function Hornets() {
    
        this.image = new hornetImage();   
        
        this.canvas = document.createElement('canvas');
        
        this.canvas.width = this.image.canvas.width*1.5;
        this.canvas.height = this.image.canvas.height*1.5;
    
        this.context=  this.canvas.getContext('2d');
    
        this.xPos = Math.random() * window.innerWidth;
        this.yPos = Math.random() * window.innerHeight;
    
    
            this.state="fly";
            this.target=0;
            this.hasTarget=false;
    
         this.xSpeed = Math.random() * 14 - 7;
            this.ySpeed = Math.random() * 14 - 7;
            
            this.newXSpeed = Math.random() * 14 - 7;
            this.newYSpeed = Math.random() * 14 - 7;
            
            
            this.xChanger = Math.random() * 200;
            this.yChanger = Math.random() * 200;
    
            
            this.numberAttached=0;
    
            this.heatTimer=0;
    
                this.bodyX = this.canvas.width/2;
            this.bodyY = this.canvas.height/2;
            
    
     /*   this.context.drawImage(this.image.canvas,this.image.canvas.width/4,this.canvas.height - this.image.canvas.height);
        this.context.drawImage(this.image.head,this.image.canvas.width/4,this.canvas.height - this.image.canvas.height); */
    
        this.r = 0;
    
        this.headR = 0;
        this.oldR = 0;
        
        // this.r = degrees( Math.atan(this.ySpeed/ this.xSpeed ) );
    
    //this.headR = this.r
    this.angle = 0;
        this.context.save();
    
        this.context.translate(.5 * this.image.canvas.width, .5 * this.image.canvas.height);
        this.context.rotate(radians(this.r));
        this.context.drawImage(this.image.canvas,0,-.5 * this.image.canvas.height);
    this.context.translate(0, .3 * this.image.head.height);     
    this.context.rotate(radians(-this.r));
             
        this.context.rotate(radians(this.headR));
      
    this.context.drawImage(this.image.head,0 ,-this.image.head.height);
    
        this.context.restore();
    
    this.deathSize=1;
    
    this.draw = function() {
        if (this.dead!==true) {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        
         this.context.save();
    
        this.context.translate(-.2 * this.image.canvas.width, 0);
        this.context.translate(.5 * this.image.canvas.width, .5 * this.image.canvas.height);
        this.context.rotate(radians(this.r));
        this.context.drawImage(this.image.canvas,0,-.5 * this.image.canvas.height);
    this.context.translate(0, .3 * this.image.head.height);     
    this.context.rotate(radians(-this.r));
             this.context.translate(.5*this.image.head.width ,0 );  
        this.context.rotate(radians(this.headR*13));
      
    this.context.drawImage(this.image.head,-.5*this.image.head.width ,-this.image.head.height);
    
        this.context.restore();
    
        this.drawWings();
        
        
         beesContext.save();
                beesContext.translate(this.xPos, this.yPos);
                beesContext.rotate(radians(this.angle-270));
                
                 
               if (this.state=="death") {
         beesContext.drawImage(this.canvas,-.5 * this.canvas.width * this.deathSize,-.5*this.canvas.height * this.deathSize,this.canvas.width * this.deathSize, this.canvas.height * this.deathSize)
            
        } else {
          beesContext.drawImage(this.canvas,-.5 * this.canvas.width,-.5*this.canvas.height)   
        }
        
                 beesContext.restore();
              beesContext.beginPath();
       
                 beesContext.arc(this.xPos, this.yPos, (this.canvas.width/2) , 0, 2 * Math.PI, false);
        
        var grd = context.createRadialGradient(this.xPos, this.yPos, 0, this.xPos, this.yPos, (this.canvas.width/2));
      // light blue
        if (this.heatTimer<30) {
      grd.addColorStop(0, 'rgba(255,0,0,.5');
        } else {
            if (this.heatTimer<90) {
          grd.addColorStop(.3, 'rgba(255,0,0,.5');  
            } else {
             grd.addColorStop(.6, 'rgba(255,0,0,.5');   
                
            }
        }
      // dark blue
        var stop2 = (this.numberAttached/15);
        if (stop2>1) {
         stop2=1;   
        }
        if (stop2>=.3) {
         this.heatTimer++;   
        }
      grd.addColorStop(stop2, 'rgba(0,0,0,0)');
                 beesContext.fillStyle=grd;
                 beesContext.fill();
        
        
        
        
        }
    };
    
    
    
    this.dead= false;
    
    this.update = function() {
        if (this.heatTimer>=275) {
         this.state="death"; 
            this.deathSize-=.005
            if (this.deathSize<=0) {
             this.deathSize=0; 
                this.dead=true;
            }
        }
       
          if (Math.abs(this.xSpeed)>25) {
                 this.xSpeed=this.xSpeed/2;   
                }
                if (Math.abs(this.ySpeed)>25) {
                 this.ySpeed=this.ySpeed/2;   
                }
        
        
        this.flapWings();
        
        if (this.numberAttached<=2) {
        this.xPos += this.xSpeed;   
             this.yPos += this.ySpeed;   
        }
            this.bounds();
                
                this.xChanger--;
                this.yChanger--;
               
                this.directionBounds();
                
                
                this.xSpeed = lerp(this.xSpeed, this.newXSpeed,.003);
                this.ySpeed = lerp(this.ySpeed, this.newYSpeed,.003);
                
        
            this.oldR = this.angle;
          this.angle = lerp(this.angle,degrees( Math.atan2(this.ySpeed, this.xSpeed ) ), .5);
          this.headR = lerp(degrees( Math.atan2(this.ySpeed, this.xSpeed ) ) - this.oldR,0,.1);
        //this.rHead = degrees( Math.atan(this.ySpeed/ this.xSpeed ) );
        //this.r = .2*this.headR
      // this.headR = lerp(this.headR, this.r,.001);
        
        if (this.headR>-.003 && this.headR<.003) {
         this.headR = 0;   
        }
        
        
         if (this.r>-.03 && this.r<.03) {
         this.r = 0;   
        }
        
        
        if (this.state=="seek") {
            if (this.hasTarget==false) {
              
                for (var i = 0; i<bees.length;i++) {
                   if (bees[i].state=="fly") {
                    if (dist(this.xPos, this.yPos,bees[i].xPos,bees[i].yPos)<=dist(this.xPos, this.yPos,bees[this.target].xPos,bees[this.target].yPos)) {
                        this.target=i;
                        
                        }
                       
                   }
                    
                }
                this.hasTarget=true;
                
            } else {
               var xs = bees[this.target].xPos - this.xPos; 
               var ys = bees[this.target].yPos - this.yPos; 
                
                this.newXSpeed = xs/5;
                this.newYSpeed = ys/5;
                
                
            }         
            
        }
        
    
      
        
    };
    
    
     this.bounds = function() {
                
                 if (this.xPos>window.innerWidth+150) {
                    
                 this.xPos = -150;   
                } else if (this.xPos<-150) {
                    
                 this.xPos = window.innerWidth + 150;  
                } 
                
                if (this.yPos>window.innerHeight+150) {
                    
                 this.yPos = -150;   
                } else if (this.yPos<-150) {
                    
                 this.yPos = window.innerHeight + 150;   
                }
                
                
                
            }
            
            
            this.directionBounds = function() {
             if (this.xChanger<=0) {
                  this.newXSpeed = Math.random() * 30 - 15;
                  this.xChanger = Math.random() * 200+60;
                 //this.angle = degrees( Math.atan(this.ySpeed/ this.xSpeed ) ) +90;
             }
                
                if (this.yChanger<=0) {
                   this.newYSpeed = Math.random() * 50 - 25;
                  this.yChanger = Math.random() * 200+60; 
                   // this.angle = degrees( Math.atan(this.ySpeed/ this.xSpeed ) ) + 90;
                }
                
                
            }
            
            
            
             this.wingAngles = [];
            
            var startAngle = 0;
            this.angleDown = [];
            
            for (var i = 0; i<2;i++) {
                this.wingAngles[i] = startAngle;
                this.wingAngles[i+3] = startAngle;
                this.angleDown[i] = true;
                startAngle+= 5;
                
            }
    
    
    
    
            
              this.flapWings = function() {
               for (var i = 0; i <this.wingAngles.length;i++) {  
                if (this.angleDown[i]) {
                 this.wingAngles[i]-=6;
                    if (this.wingAngles[i]<-25) {
                     this.angleDown[i]=false;
                        this.wingAngles[i]==-25;
                    }
                    
                } else {
                   this.wingAngles[i]+=6;
                    if (this.wingAngles[i]>25) {
                     this.angleDown[i]=true;   
                        this.wingAngles[i]==25;
                    }  
                }
                   
                   
               }
                
            }
            
            
            
            this.drawWings = function() {
                
               // this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
                 // this.context.restore();
                // this.context.drawImage(this.image.wingCanvas, this.bodyX, this.bodyY);
                for (var i = 0; i <this.wingAngles.length/2;i++) {
                    
                this.context.save();
                     this.context.translate(this.canvas.width/2.2, this.canvas.height/5);
                    
              
                    this.context.rotate(radians(this.wingAngles[i]));
                    //this.context.translate(0,-. * this.image.wingCanvas);
                    this.context.drawImage(this.image.wingCanvas,0, 0);
                    this.context.restore();
                    
                    
                     this.context.save();
                     //this.context.translate(0,0);
                this.context.translate(this.canvas.width/2, this.canvas.height/5);
                    this.context.rotate(radians(-1 * this.wingAngles[i]));
                   // this.context.translate(-.2* this.image.wingCanvas.width,0);
                    
                  this.context.drawImage(this.image.wingCanvas,-1 * this.canvas.width/2.5, 0);
                    
                    this.context.restore();
                
                }              
                                
                
                
            }
    
    
    
    
}