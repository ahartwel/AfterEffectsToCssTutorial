 function hexagon() {
            
         this.canvas = document.createElement('canvas');
         this.canvas.height = .045*window.innerWidth;
         this.canvas.width = .05*window.innerWidth;
            
            this.context = this.canvas.getContext('2d');
            
     
            
            
            this.context.beginPath();
            var x0 = 0;
            var y0 = 0;
            
            var x=x0;
            var y = y0;
            
            var xL = .33*this.canvas.width;
            var yL = .5*this.canvas.height;
            
            x=x0; y=y0; this.context.moveTo(x,y);
    x+=xL; y+=0;  this.context.moveTo(x,y);
    x+=xL; y+=0;  this.context.lineTo(x,y);
    x+=xL; y+=yL; this.context.lineTo(x,y);
    x+=(xL*-1); y+=yL; this.context.lineTo(x,y);
    x+=(xL*-1); y+=0; this.context.lineTo(x,y);
    x+=(xL*-1); y+=(yL*-1); this.context.lineTo(x,y);
    x+=xL; y+=(yL*-1); this.context.lineTo(x,y);
           
    this.context.fillStyle = combColors[ Math.floor( Math.random()*4  )  ];
          
                
                this.context.fill();
            

            
           
            
            
        }
