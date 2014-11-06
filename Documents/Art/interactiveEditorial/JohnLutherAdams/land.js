function LAND(yy, st, idd, boomHeight) {
 
    this.id = idd;
    
   this.xPos = Math.random() * (width*1.2);
    //this.yPos = (Math.random() * (.5*height)) + (.5*height);
    this.yPos = yy;
    
    this.w = Math.random() * (.36*width) + (.22*width);
    this.topW = Math.random() * (this.w*.7) + (.2*this.w);
    
    this.h = Math.random() * (.1*height) + (.05*height);
    
    this.state = st;
    
    this.initialH = this.h;
    
    this.partSpeed = Math.random()+1;
    
    this.shadow=false;
    
    if (Math.random()<.4) {
     this.shadow=true;   
    }
    
    //console.log(this.partSpeed + " pS");
    
    this.opacity = 1;
    
    if (this.state=="boom") {
     //   console.log(boomHeight);
        this.h = boomHeight;
             this.w = Math.random() * (.15*width) + (.22*width);
        this.topW = Math.random() * (this.w*.45) + (.2*this.w);
            this.xPos = width+20;
            this.yPos += Math.random()*(.05*height);
        this.h = this.h*1.7;
             this.initialH = 0;
            this.finalH = this.h/2;
       this.up = true;
        
    } else if (this.state=="main") {
        
        this.yPos -= Math.random() * (.1*height);   
    }
    
      this.pos = [];
    
    
      this.color = color[Math.floor(Math.random()*4)+5];
    
     this.canvas = document.createElement('canvas');
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    
     this.context = this.canvas.getContext('2d');
    
    
    
     this.blackCanvas = document.createElement('canvas');
    this.blackCanvas.width = this.w;
    this.blackCanvas.height = this.h;
    
     this.blackContext = this.blackCanvas.getContext('2d');
    
    
    
    
    
    this.ySpeed = Math.random()*5;
    
    
    this.yPosSpeed = this.h/((.655*height)/this.ySpeed);
   // console.log(this.yPosSpeed);
   // console.log(this.ySpeed/(.65*height));
    this.drawLand = function() {
       
    
    this.pos[0] = {};
    
    this.pos[0].xPos = (this.canvas.width/2) - (.5*this.w);
    this.pos[0].yPos = this.canvas.height;
    
    
    this.pos[1] = {};
    
    this.pos[1].xPos = this.pos[0].xPos + this.w;
    this.pos[1].yPos = this.canvas.height;
        
    
    this.pos[2] = {};
        
    this.pos[2].xPos = (this.canvas.width/2) + (.5*this.topW);
    this.pos[2].yPos = this.canvas.height - this.initialH;
    
    this.pos[3] = {};
        
    this.pos[3].xPos = this.pos[2].xPos - this.topW;
    this.pos[3].yPos = this.canvas.height - this.initialh;
        
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        
        this.context.beginPath();
        
        
        for (var i = 0; i<this.pos.length; i++) {
            if (i==0) {
             this.context.moveTo(this.pos[i].xPos, this.pos[i].yPos);   
            } else {
             this.context.lineTo(this.pos[i].xPos, this.pos[i].yPos);   
            }            
        }
        this.context.moveTo(this.xPos[0], this.yPos[0]);
        this.context.closePath(); 
        this.context.fillStyle=this.color;
        this.context.fill();
       
        
    }
    
       this.drawLand();
     // context.drawImage(this.canvas,0,0);
    
    
    
    this.draw = function() {
        
        
        if (this.state=="boom") {
        // context.globalAlpha = .45;   
        mountainContext.save();
        mountainContext.translate(this.xPos, this.yPos-(.05*height));
        mountainContext.globalAlpha = .53;  
        mountainContext.drawImage(this.canvas, -.5*this.canvas.width,-this.canvas.height);
        mountainContext.restore();
            
         if (this.shadow) {   
        shad.shadowContext.drawImage(this.blackCanvas,this.xPos - (.5*this.canvas.width),shad.shadowCanvas.height - this.blackCanvas.height); 
         }
       
        } else {
            
     context.save();
        context.translate(this.xPos, this.yPos);
         context.globalAlpha = .55;  
        context.drawImage(this.canvas, -.5*this.canvas.width,this.canvas.height - this.initialH);
        context.restore();
        }
        
        }
    
    
    this.updateLand = function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        
        
        this.context.beginPath();
        
        
        
        for (var i = 0; i<this.pos.length; i++) {
            if (i==0) {
             this.context.moveTo(this.pos[i].xPos, this.pos[i].yPos);   
             
            } else {
             this.context.lineTo(this.pos[i].xPos, this.pos[i].yPos);   
              
            }            
        }
        this.context.moveTo(this.xPos[0], this.yPos[0]);
       
        this.context.closePath(); 
        
         this.context.fillStyle=this.color;
        
        this.context.fill();
        
        
        if (this.shadow) {
        this.blackContext.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.blackContext.beginPath();
        
             this.context.beginPath();
            
         for (var i = 0; i<this.pos.length; i++) {
            if (i==0) {  
             this.blackContext.moveTo(this.pos[i].xPos, this.pos[i].yPos);   
            } else {  
             this.blackContext.lineTo(this.pos[i].xPos, this.pos[i].yPos);   
            }            
        }
        
         this.blackContext.moveTo(this.xPos[0], this.yPos[0]);
         this.blackContext.closePath(); 
         this.blackContext.fillStyle="rgba(0,0,100,.35)";
        
        this.blackContext.fill();
            
            this.context.save();
            this.context.scale(.8,1);
            this.context.drawImage(this.blackCanvas,0,0);
           // this.context.drawImage(this.blackCanvas,0,0);
            //this.context.drawImage(this.blackCanvas,0,0);
            //this.context.drawImage(this.blackCanvas,0,0);
            this.context.restore();
            
        }
    }
    
    
    this.update = function() {
         //this.yPosSpeed = this.h/((.35*height)/volumeData.speed);
       if (this.state=="boom") {
        this.xPos-=volumeData.speed/this.partSpeed;   
       } else {
        this.xPos-=volumeData.speed;
       }
       //this.xPos-=5;
        this.pos[2].xPos -= .2;
         if (this.state=="boom") {
             if (this.up) {
        this.initialH = lerp(this.initialH,this.h,.2);
             this.pos[2].yPos = this.canvas.height - this.initialH;
             this.pos[3].yPos = this.canvas.height - this.initialH;
             if (Math.abs(this.initialH - this.h)<4) {
                 this.up=false;
             }            
             
             } else {
               this.initialH = lerp(this.initialH,this.finalH,.2);
             this.pos[2].yPos = this.canvas.height - this.initialH;
             this.pos[3].yPos = this.canvas.height - this.initialH;  
                 
             }
         }
       /* if (this.pos[1].yPos - this.pos[3].yPos>25) {
            //console.log("shitStick");
        this.pos[2].yPos += this.yPosSpeed;
        this.pos[3].yPos += this.yPosSpeed;
        this.h -= this.yPosSpeed;
        } */
        
        
        this.updateLand();
        
        if (this.xPos<-200) {
            if (this.state=="main") {
         this.newMountain();
            } else {
              //  console.log("shit");
                removeId = this.id;
                theLand = theLand.filter(function (el) {
               return el.id !== removeId; 
            });
            }
           
        }
        
    }
    
    
    
    this.newMountain = function() {
        
         this.w = Math.random() * (.36*width) + (.22*width);
    this.topW = Math.random() * (this.w*.45) + (.2*this.w);
    
    this.h = Math.random() * (.075*height) + (.05*height);
        
        if (bigMountains>0) {
         this.h = Math.random() * (.15*height) + (.1*height);
             this.w = Math.random() * (.15*width) + (.22*width);
    this.topW = Math.random() * (this.w*.45) + (.2*this.w);
            bigMountains--;
            
        }
        
        this.canvas.width = this.w;
    this.canvas.height = this.h;
        
        this.pos[0] = {};
    
    this.pos[0].xPos = (this.canvas.width/2) - (.5*this.w);
    this.pos[0].yPos = this.canvas.height;
    
    
    this.pos[1] = {};
    
    this.pos[1].xPos = this.pos[0].xPos + this.w;
    this.pos[1].yPos = this.canvas.height;
        
    
    this.pos[2] = {};
        
    this.pos[2].xPos = (this.canvas.width/2) + (.5*this.topW);
    this.pos[2].yPos = this.canvas.height - this.h;
    
    this.pos[3] = {};
        
    this.pos[3].xPos = this.pos[2].xPos - this.topW;
    this.pos[3].yPos = this.canvas.height - this.h;
        
        this.drawLand();
        this.xPos = width*1.2;
   this.yPos = (Math.random()*(.6*height)) + (0.4*height);
        
        if (this.state == "main") {
          this.yPos += Math.random() * (.1*height);      
        }
        
         this.ySpeed = Math.random()*5; 
            this.yPosSpeed = this.h/((.35*height)/this.ySpeed);
    }
    
   // console.log(this.pos);
    
}




function backMountains() {
    
    this.xPos = Math.random()*(width*2);
    this.yPos = (.4*height) + (Math.random()*(.02*height));
    
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.random()*(.3*width) + (.4*width);
    this.canvas.height = Math.random() * (.04*height) + (.03*height);
    this.context = this.canvas.getContext('2d');
    
    
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(0,this.canvas.height);
    this.context.lineTo(.6*this.canvas.width, this.canvas.height);
    this.context.lineTo(this.canvas.width, this.canvas.height*.5);
    this.context.lineTo(.15*this.canvas.width,0);
    this.context.lineTo(0,this.canvas.height);
    
    this.context.clip();
    this.context.drawImage(grassCanvas,0,0);
    this.context.restore();
    
    this.timer = 0;
    
    this.timerMax = (Math.random()*150) + 120;
    
    this.update = function() {
        this.timer++;
        
        if (this.timer>=this.timerMax) {
            this.updateBM();
            this.timer=0;
        }
        
     this.xPos -= volumeData.speed;
        
        if (this.xPos<-this.canvas.width) {
         this.xPos = width + (Math.random()*(.2*width));   
        }
        
    }
    
    this.draw = function() {
        
     context.drawImage(this.canvas,this.xPos, this.yPos - this.canvas.height);   
  
        
        
    }
    
    
    
    this.updateBM = function() {
     this.context.save();
    this.context.beginPath();
    this.context.moveTo(0,this.canvas.height);
    this.context.lineTo(.6*this.canvas.width, this.canvas.height);
    this.context.lineTo(this.canvas.width, this.canvas.height*.5);
    this.context.lineTo(.15*this.canvas.width,0);
    this.context.lineTo(0,this.canvas.height);
    
    this.context.clip();
    this.context.drawImage(grassCanvas,0,0);
    this.context.restore(); 
        
        
    }
    
    
    
    
    
}



function vegetation(idd, h) {
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = (h + .5) * (.02*width);
    this.canvas.height = this.canvas.width * 1.8;
    this.context = this.canvas.getContext('2d');
    
    this.id = idd;
    
    
    this.xPos = Math.random() * (.5*width) + (.5*width);
     this.yPos = (.4*height) + (Math.random()*(.6*height));
    
    this.color = color[Math.floor( Math.random()*4 )];
    var oldX = .5*this.canvas.width;
    var oldY = this.canvas.height;
    
    this.h = 0;
    
    this.timer=0;
    
    for (var i = 0; i <Math.random()*15;i++) {
        var s = Math.random()*3;
        var x = (rnd_snd()*(.3*this.canvas.width)) + (.5*this.canvas.width);
        var y  = this.canvas.height -Math.abs(rnd_snd()*(.6*this.canvas.height))
    this.context.rect(x ,y ,s,s);
    }
    this.context.fillStyle = this.color;
    this.context.fill();
    
    this.color = color[Math.floor( Math.random()*4 )];
    var oldX = .5*this.canvas.width;
    var oldY = this.canvas.height;
    
    for (var i = 0; i <Math.random()*15;i++) {
        var s = Math.random()*3;
        var x = (rnd_snd()*(.3*this.canvas.width)) + (.5*this.canvas.width);
        var y  = this.canvas.height -Math.abs(rnd_snd()*(.6*this.canvas.height))
    this.context.rect(x ,y ,s,s);
    }
    this.context.fillStyle = this.color;
    this.context.fill();
    
    this.update = function() {
        this.xPos-=volumeData.speed;
        
        if (this.xPos<-10) {
             vRemoveId = this.id;
                vege = vege.filter(function (el) {
               return el.id !== vRemoveId; 
            });
            
            
        }
        
        
        
    }
    
    this.display = function() {
        
     context.drawImage(this.canvas,this.xPos, this.yPos + (this.canvas.height - this.h), this.canvas.width, this.h); 
        
        if (this.timer<20) {
        this.timer++;
        
        if (this.timer%2==0) {
            
            this.h = lerp(this.h, this.canvas.height,.1);
            
            this.context.beginPath();
            for (var i = 0; i <Math.random()*15;i++) {
        var s = Math.random()*3;
        var x = (rnd_snd()*(.3*this.canvas.width)) + (.5*this.canvas.width);
        var y  = this.canvas.height -Math.abs(rnd_snd()*(.6*this.canvas.height))
    this.context.rect(x ,y ,s,s);
    }
    this.context.fillStyle = this.color;
    this.context.fill();
    
    this.color = color[Math.floor( Math.random()*4 )];
    var oldX = .5*this.canvas.width;
    var oldY = this.canvas.height;
    
            this.context.beginPath();
    for (var i = 0; i <Math.random()*15;i++) {
        var s = Math.random()*3;
        var x = (rnd_snd()*(.3*this.canvas.width)) + (.5*this.canvas.width);
        var y  = this.canvas.height -Math.abs(rnd_snd()*(.6*this.canvas.height))
    this.context.rect(x ,y ,s,s);
    }
    this.context.fillStyle = this.color;
    this.context.fill();
            
            
        }
            
        }
        
        
    }
    
    
    
}
