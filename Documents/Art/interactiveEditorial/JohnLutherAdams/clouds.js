function cloud() {
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = .4 * height;
    
    this.context = this.canvas.getContext('2d');
    
    this.xPos = Math.random()*width;
    this.yPos = this.canvas.height - (Math.random() * (.4*height));
    
    this.xPos2 = this.xPos+(.02*width);
    
    this.yMax = this.yPos + (Math.random() * (.15 * height));
    this.yMin = this.yPos - (Math.random() * (.15 * height));
    
    this.maxR = Math.random() * (.55*height) + (.2* height);
    
    this.ySpeed = -1;
    
    this.centerY = this.yPos;
    
    this.radius = this.yMax - this.yMin;

    
    this.timer++;
    
    
    this.display = function() {
        
     this.xPos-=volumeData.speed/3;
     this.xPos2-=volumeData.speed/3
     
     if (volumeData.speed/3<3) {
      this.xPos-=3.5;
         this.xPos2-=3.5;
     }
     ;
    // this.yPos+=this.ySpeed;
     //this.ySpeed+=0.05;
      
        
      // this.radius = lerp(this.radius,10,.1);
       this.radius = lerp(this.radius,volumeData.radius * this.maxR,.4);
        if (this.radius<.5) {
         this.radius=.5;   
        }
        
        if (this.radius<=4) {
         this.ySpeed=-1*this.ySpeed;   
        }
         if (this.radius>=.6*height) {   
            this.ySpeed = -1*this.ySpeed;
         }
        
        if (this.xPos<0) {
         this.xPos = width;   
        }
         
        if (this.xPos2<0) {
         this.xPos2 = width;   
        }
        
        if (this.radius>25) {
         this.radius*3;   
        } 
        
        
        
        cloudContext.beginPath();
        //this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        
       cloudContext.arc(this.xPos, this.yPos, this.radius, 0 , 2 * Math.PI, false);
       //cloudContext.arc(this.xPos2, this.yPos, this.radius, 0 , 2 * Math.PI, false);
        
       
        cloudContext.fillStyle = "rgba(255,255,255,.01)";
        cloudContext.fill();
        
        
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
}