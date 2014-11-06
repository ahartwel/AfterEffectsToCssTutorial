function shadows() {
    
    
    
 this.shadowCanvas = document.createElement('canvas');
    this.shadowCanvas.width = width;
    this.shadowCanvas.height = 0.6 * height;
    
    this.shadowContext = this.shadowCanvas.getContext('2d');
    
    
    
    
    this.update = function() {
        
     this.shadowContext.clearRect(0,0,width,height);   
        
        
        
        
    }
    
    
    
    
    
    
    
}




function sun() {
    
    
 this.canvas = document.createElement('canvas');
    this.canvas.width = .35*width;
    this.canvas.height = this.canvas.width;
    this.context = this.canvas.getContext('2d');
    
    this.colors = [];
    this.colors[0] = "rgba(232,171,76,.4)";
    this.colors[1] = "rgba(255,206,84,.4)";
    this.colors[2] = "rgba(255,172,97,.4)";
    this.colors[3] = "rgba(232,128,76,.4)";
    this.colors[4] = "rgba(255,115,84,.4)";
    
    for (var i = 0; i<14000; i++) {
        this.context.beginPath();
     var d = Math.random() * .47*this.canvas.width;
    var r = Math.random() * 360;
        var x = Math.cos(radians(r)) * d + (.5*this.canvas.width);
        var y = Math.sin(radians(r)) * d + (.5*this.canvas.width);
        var s = Math.random()*12;
        this.context.globalAlpha = (s+8)/40;
        this.context.rect(x,y,s,s);
        this.context.fillStyle = this.colors[Math.round(Math.random()*4)];
        this.context.fill();
        
    }
    
    this.xPos = -1 * this.canvas.width;
    this.yPos = .4*height;
    this.y2 = 25;
    this.y3 = .8*height;
    this.up=true;
    
    this.h = 0;
    this.shadowH = 0;
    
    this.display = function() {
        
     context.drawImage(this.canvas, this.xPos, this.yPos ,.2*width, .2*width); 
    
    }
    
    this.update = function() {
        
     this.xPos += .00065*width;
     if (this.up) {
        this.yPos -= .00035*height;
        this.h = this.y2/this.yPos;
        this.shadowH = 1 - this.h
         if (dist(this.yPos,0, this.y2,0) < 2) {
            this.up = false;
        }
     } else {
        this.yPos += .00035*height;
         this.h = 1 - (this.yPos/(this.y3/2));
         this.shadowH = 1 - this.h
        if (dist(this.yPos,0, this.y3,0) < 2) {
            this.up = true;
        }  
         
     }
       // console.log(this.h + " sun h");
        
        
        
        
        if (this.xPos>width) {
         this.xPos = -this.canvas.width;   
        }
        
        
    }
    

    
}