function tutorial() {
    
 this.text = [];
    
    this.fontTracker = 2;
    this.text[0] = "These three pixels start it all...";
   
    this.state = 0;
    this.fontSize = "2vw";
    
    
    this.sliderHide = 0;
    this.sliderHideCounter = 0;
    this.lineWidth = 1;
    
    this.update = function() {
     
        if (this.state==0) {
        if (dist(mouseX,mouseY,looper.width*.5,looper.height*.5)<.15*looper.width) {
            this.fontTracker = lerp(this.fontTracker,2.5,.3);
         this.fontSize = this.fontTracker + "vw";   
            document.body.style.cursor = "pointer";
            
            if (mouseDown) {
             this.state++;
                state++;
               
            }
            
        } else {
             this.fontTracker = lerp(this.fontTracker,2,.3);
         this.fontSize = this.fontTracker + "vw";  
            document.body.style.cursor = "default";
        }
            
        }
        
        
        
    };
    
    
    
    this.display = function() {
     if (this.state==0) {
         
       context.fillStyle = "white";
       context.strokeStyle = "rgba(255,255,255,.4)";
        context.font = this.fontSize + " brandon-grotesque";
        context.textAlign = "center";
        context.fillText(this.text[0], .5*looper.width, .5*looper.height);   
         context.beginPath();
         
         for (var i =0; i<balls.length;i++) {
             context.moveTo(looper.width*.5, looper.height*.5);
             context.lineTo(balls[i].xPos, balls[i].yPos);
             
             
         }
         context.stroke();
         
         
     }
        
        if (this.state==1) {
            this.sliderHideCounter++;
            
            if (this.sliderHideCounter>=100) {
             this.sliderHideCounter=0;
                this.sliderHide++;
                
            }
            
            if (this.sliderHide>=0) {
              context.fillStyle = "white";
       context.strokeStyle = "rgba(255,255,255,.4)";
        context.font = this.fontSize + " brandon-grotesque";
        context.textAlign = "center";
        context.fillText("when they loop around they will either...", .5*looper.width, .15*looper.height);      
                
                
            }
            if (this.sliderHide>=1) {
              context.fillStyle = "white";
       context.strokeStyle = "rgba(255,255,255,.4)";
        context.font = this.fontSize + " brandon-grotesque";
        context.textAlign = "center";
        context.fillText("slow down or speed up,", .5*looper.width, .35*looper.height);      
                
                 context.drawImage(xSlider.canvas, .5*looper.width - (.5*amountSlider.canvas.width), .4*looper.height);     
                
            }  
            
            if (this.sliderHide>=2) {
              context.fillStyle = "white";
       context.strokeStyle = "rgba(255,255,255,.4)";
        context.font = this.fontSize + " brandon-grotesque,";
        context.textAlign = "center";
        context.fillText("increase or decrease in size,", .5*looper.width, .55*looper.height);      
                 context.drawImage(sizeSlider.canvas, .5*looper.width - (.5*amountSlider.canvas.width), .6*looper.height);  
                
            } 
            if (this.sliderHide>=3) {
              
                context.fillStyle = "white";
       context.strokeStyle = "rgba(255,255,255,.4)";
        context.font = "4vw brandon-grotesque";
        context.textAlign = "center";
        context.fillText("&", .33*looper.width, .76*looper.height);       
                
                context.fillStyle = "white";
       context.strokeStyle = "rgba(255,255,255,.4)";
        context.font = this.fontSize + " brandon-grotesque";
        context.textAlign = "center";
        context.fillText("add or subtract more pixels", .5*looper.width, .75*looper.height);      
               context.drawImage(amountSlider.canvas, .5*looper.width - (.5*amountSlider.canvas.width), .8*looper.height); 
                
            }
            
            if (this.sliderHide>=5) {
                
                  if (dist(mouseX,mouseY,looper.width*.75,looper.height*.5)<.1*looper.width) {
                       document.body.style.cursor = "pointer";
                   this.lineWidth = lerp(this.lineWidth,3,.4); 
                      if (mouseDown) {
                       state++;
                          this.state++;
                          
                      }
                      
                  } else {
                   this.lineWidth = lerp(this.lineWidth,1,.4);   
                      document.body.style.cursor = "default"; 
                  }
                
                
                
                context.lineWidth = this.lineWidth;
               context.beginPath();
                context.moveTo(.7*looper.width,.5*looper.height);
                context.lineTo(.8*looper.width, .5*looper.height);
                context.moveTo(.775*looper.width, .45*looper.height);
                context.lineTo(.8*looper.width, .5*looper.height);
                context.lineTo(.775*looper.width, .55*looper.height);
                context.stroke();
                
            }
            
            
            
            
        }
        
        
        
    };
    
    
    
    
    
}