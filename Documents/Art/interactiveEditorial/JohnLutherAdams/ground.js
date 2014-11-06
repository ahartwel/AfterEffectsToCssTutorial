function grass() {
    
    this.xPos = Math.random()*width;
    this.yPos = (Math.random()*(height*.6));
    
    
    this.state = 0;
    
    
    this.xSpeed = Math.random(-4,4);
    this.ySpeed = Math.random(-4,4);
    
    this.xAcc = Math.random(-.3,.3);
    this.yAcc = Math.random(-.3,.3);
    
    this.timer = 0;
    
    this.update = function() {
        
     this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
        
        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;
        
        if (this.timer==60) {
             this.xSpeed = Math.random(-4,4); 
        } else if (this.timer==120) {
             this.ySpeed = Math.random(-4,4);   
            this.timer = 0;
        }
        
        
        if (this.xPos>grassCanvas.width * .8 || this.xPos<(.2*width)) {
           
    this.xPos = Math.random()*width;
    this.yPos = (Math.random()*(height/2));
          
        } 
        
        if (this.yPos>grassCanvas.height || this.yPos<(-.05*width)) {
           
    this.xPos = Math.random()*width;
    this.yPos = (Math.random()*(height*.6));
    
        }
        
        
    }
    
    
    this.display = function() {
        grassContext.globalAlpha = .2;
        grassContext.save();
        grassContext.translate(this.xPos, this.yPos);
        
        var stretch = 5 - ((this.yPos/grassCanvas.height)*4 + 1);
        
    
        
        grassContext.scale(stretch,1);
         grassContext.beginPath();
      grassContext.arc(0, 0, .005*width, 0, 2 * Math.PI, false);
     
    var col = Math.floor(Math.random()*4) + this.state;
        grassContext.fillStyle = color[col+volumeData.grassOffset];
        
        grassContext.fill();
        grassContext.closePath();
           grassContext.restore();
    }
    
    for (var i =0; i < 1700; i++) {
        this.display();
         this.xPos = Math.random()*width;
            this.yPos = (Math.random()*(height*.6));
    }
    
    
}






function ground() {
    
 this.xPos = 0;
 this.xPos2 = grassCanvas.width;
    
    
    this.display = function() {
        
     this.xPos -= volumeData.speed;   
     this.xPos2 -= volumeData.speed;   
       
      //  context.drawImage(grassCanvas,0,(.4*height));
         context.drawImage(grassCanvas,this.xPos,(.4*height));
        context.drawImage(grassCanvas,this.xPos2,(.4*height));
       
       
        
        if (this.xPos<=-width){
         this.xPos = width;   
        }
        
        if (this.xPos2<=-width){
         this.xPos2 = width;   
        }
        
        
       
        
    }
    
    
    
    
    
    
    
    
}