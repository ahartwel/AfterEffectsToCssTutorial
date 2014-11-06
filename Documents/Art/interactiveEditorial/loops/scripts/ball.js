
        function ball(color) {
         this.color = color;
         this.xPos = -300;
         this.yPos = Math.random() * 400;
         
            this.size = 15;
            
            this.xSpeed = 12;
            this.ySpeed = 0;
            this.gravity = .2;
            this.sizeSpeed = sizeDecay;
            
            this.display = function() {
            
                
             
             context.fillStyle = color;
                context.beginPath();
                context.rect(this.xPos, this.yPos,this.size, this.size);
                
                context.fill();
                
            }
            
            
            this.update = function() {
            
            if (state!==1) {
             this.xPos += this.xSpeed;
             this.yPos += this.ySpeed;
            this.ySpeed += this.gravity;
            
                
                if (this.yPos>looper.height - this.size *2) {
                    this.ySpeed = this.ySpeed * -1;
                                    
                }
                
                if (this.xPos>looper.width) {
                 this.xPos = -200;
                    this.xSpeed+=speedDecay;
                    this.size+=sizeDecay;
                   if (this.size<=3 || this.xSpeed<=2) {
                        this.color = color;
                       this.xPos = -300;
                        this.yPos = Math.random() * 400;
            
                        this.size = 15;
                        //console.log(this.size);
                            this.xSpeed = 12;
                            this.ySpeed = 0;
                        this.gravity = .2;
                        
                   } else if (state>=1){
                       if (balls.length<800) {
                           if (howManyMore>0) {
                           for (var i = 0; i <howManyMore;i++) {
                        balls.push(new ball(this.color));   
                           }
                           }
                   } 
                     if (howManyMore<0) {
                        if (Math.random()<.05) {
                         howManyToKill-=howManyMore;   
                            
                        }
                   }
                    
                    
                    
                }
                }
                
                
            }
                
            };
            
            
            
        }