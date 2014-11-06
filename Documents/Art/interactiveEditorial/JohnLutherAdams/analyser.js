function ANALYSIS() {
    
    this.musicData = [];
    
   this.leng = Math.floor( frequencyData.length/5 );
        
    this.speed = 0;
    this.newSpeed = 0;
    
    this.timer = 0;

    
    this.radius = 0;
    
    this.grassOffset = 5;
    
       for (var i = 0; i < 5; i++) {
        this.musicData[i] = 0;      
        }
    
    
    this.update = function() {
         this.grassOffset=5;
        this.timer++;
        
        var avg;
        var setSpeed = false;
        
        this.radius = lerp(this.radius,.003,.01);
                           
        
         this.speed = lerp(this.speed, this.newSpeed, .025);
            this.newSpeed = lerp(this.newSpeed,.5,.1);
        
     for (var i = 0; i<5; i++) {
         avg=0;
         for (var p = i*this.leng; p < (i*this.leng)+this.leng;p++) {
                avg+=frequencyData[p];
             //console.log(frequencyData[p]);
             }
         avg = avg/this.leng;
         if (i<1) {
         if (avg>this.musicData[i]*1.07||avg>180) {
         // console.log("BAAAAM");
            // bigMountains++;
             var l = theLand.length;
             var size = ((avg-180)/(255-180)) * (height*1.3);
            // console.log(size);
             if (size<0) {
                 if (size>-700) {
              size = size*-1;   
                 }
             }
             theLand[l] = new LAND((.4*height), "boom", id, size);
             id++;
             setSpeed = true;
         }
             
         } else if (i>=3) {
             
                if (avg>this.musicData[i]*1.08||avg>160) {
                 //console.log("daaa");  
                    this.grassOffset=0;
                }
                
            } else if (i==1) {
                if (avg>this.musicData[i]*1.08||avg>180) {
               //console.log("daaaa"); 
                    vege[vId] = new vegetation(vId, avg/255);
                    vId++;
                    
                }
                
                
                
            }
         
           
         
            if (i==1 || i==2) {
                  if (avg>this.musicData[i]*1.03||avg>160) {
                    //  console.log((avg-80)/(255-120))
                        var newR = (avg)/(255);
                        this.radius = lerp(this.radius,newR,.1);
                  }
                
            }
         
         
         
       
         this.musicData[i] = avg;
         
     }
        
          
         if (setSpeed) {
             this.newSpeed = lerp(.2, 6, (45-this.timer)/25);
            if (this.newSpeed<.2) {
                this.newSpeed = .2;   
            }
             
             this.timer = 0;
         }
        
        
    }
    
    
}