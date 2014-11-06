//make bassline its own class and then make it so their is a bass drum thud on impact instead of a full bass note, it gets to muddy with each pillar having its own bass


var ctx = new window.AudioContext();
var majorScale = [130.81,146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66,329.63,349.23, 392, 440, 493];

var dMinorScale = [29.14, 32.7, 34.65, 38.89,43.65, 46.25, 51.91, 58.27];
   var beat = 300;
   var timer = 0;
   var test = [];
 
    var wobbler = new wobble();
  var highPart = new highNote();
var dunDun = new dunDunDun();

var bassD = new bassDrum();
   requestAnimFrame(animate);

 


   function animate() {
       requestAnimFrame(animate);

      
      wobbler.update();
       highPart.update();
       dunDun.update();
       
       bassD.update();
       timer++;
       if (timer >= beat) {
      
           timer = 0;
          
       }

//wobbler.mute();
      // highPart.mute();
      // dunDun.mute();
    


   }
       
       
       
       function bassDrum() {
          this.osc = ctx.createOscillator();
       this.gainNode = ctx.createGain();
        this.osc.type = "sin";
       this.osc.frequency.value = 140;
           
           this.osc.connect(this.gainNode);
           this.gainNode.connect(ctx.destination);
           this.gainNode.gain.value=2;
           this.osc.start();
           
           
           this.popO = ctx.createOscillator();
           this.popG = ctx.createGain();
           this.popO.type="sin";
           this.popO.frequency.value = 800;
           
           this.popO.connect(this.popG);
           this.popG.connect(ctx.destination);
           this.popG.gain.value=.2;
           this.popO.start();
           
           
           this.clickMod = ctx.createOscillator();
           this.modG = ctx.createGain();
           this.clickCar = ctx.createOscillator();
           this.carG = ctx.createGain();
           this.clickMod.type="sin";
            this.modG.gain.value = 60;
           this.clickMod.frequency.value = 10;
           this.clickCar.frequency.value = 350;
           this.carG.gain.value = .4;
           this.clickCar.type="sin";
           
           
           this.clickMod.connect(this.modG);
           this.clickMod.connect(this.clickCar.frequency);
           this.modG.connect(this.clickCar.frequency);
           this.clickCar.connect(this.carG);
           this.carG.connect(ctx.destination);
           
           this.one = Math.floor(beat*(1/4));
           this.two =  Math.floor(beat*(2/4));
           this.three = Math.floor( beat*(3/4) );
           this.four = Math.floor(0);
           this.five = Math.floor(beat*2);
           
  
           
    
           
          
           
           this.clickCar.start();
           this.clickMod.start();

           
           
           this.update = function() {
        
               
               
               if ((timer==this.one) || (timer==this.two) || (timer==this.three) || (timer==this.four) || (timer==this.five)) {
                this.drumKick();   
               } else {
           this.osc.frequency.value-= .09*this.osc.frequency.value;
                   if (this.gainNode.gain.value>=.05) {
            this.gainNode.gain.value-=.1;
                   };
            this.popO.frequency.value-=.13*this.popO.frequency.value;
            this.popG.gain.value-=.15*this.popG.gain.value;
            this.carG.gain.value-=.03*this.carG.gain.value;
            this.clickCar.frequency.value-=.7*this.clickCar.frequency.value;
            this.modG.gain.value-=.03*this.modG.gain.value;            
                   
               }
               
               
           };
           
           
           this.drumKick = function() {
               console.log("shiiit");
             this.osc.frequency.value = 170;
this.gainNode.gain.value=3;
this.popO.frequency.value = 500;
 this.popG.gain.value=.3;
 this.modG.gain.value = 60;
           this.clickMod.frequency.value = 10;
           this.clickCar.frequency.value = 500;
           this.carG.gain.value = .3;
           }
           
           
           
       }

function dunDunDun() {
    this.off = false;
    
    
    this.noteInScale = Math.floor( Math.random()*7 );
       this.freq =  dMinorScale[this.noteInScale];
       
        this.timer = 0;
        this.toChange = beat * (Math.floor( Math.random()*3 + 1 )/8);
        ////console.log(this.toChange + " this.toChange");
    
    
       this.osc = ctx.createOscillator();
       this.gainNode = ctx.createGain();
       
    
    
        this.add = Math.floor( Math.random()*1 +1);
        this.subtract = -1* Math.floor( Math.random()*2 +1);

      

       this.gainNode.gain.value = .5;
       
       this.osc.type = "sin";
       this.osc.frequency.value = this.freq;
      

       
        this.osc.connect(this.gainNode);
    
       this.gainNode.connect(ctx.destination);
      
       
       
       this.osc.start();
       
        
     this.update = function() {
         if (this.gainNode.gain.value>=.05) {
          this.gainNode.gain.value-=.02;   
         }
         this.timer++;
         
         if (this.timer>=this.toChange) {
             if (Math.random()>=.1) {
             this.noteInScale+=this.subtract;
                 } else {
                     this.noteInScale+=this.add; 
                     
                 }
             if (this.noteInScale>7) {
              this.noteInScale = this.noteInScale%7;   
                 
             }
             
             if (this.noteInScale<0) {
              this.noteInScale = 7+this.noteInScale;   
             }
             //console.log(this.noteInScale);
             
             
             this.freq =  dMinorScale[this.noteInScale]*8;
        
       
             this.osc.frequency.value = this.freq;
             
             
             
          this.timer=0;
              this.toChange = beat * (Math.floor( Math.random()*7 + 1 )/32);
             if (this.off==false) {
             this.gainNode.gain.value=.8;
             }
             
             if (dunDun) { 
             if (this.toChange <=beat*(2/32)) {
                 if (Math.random()<=.03) {
            partSwitch();   
                 }
           }
             }
         }
         
              
           
           
           
       };
    
    
     this.mute = function() {
        this.gainNode.gain.value=0;
        
    };
    
    
    
    
}

function partSwitch() {
 if (highPart.gain2.gain.value<=.007) {
  highPart.gain2.gain.value=.25;
  dunDun.gainNode.gain.value=0.00;
    dunDun.off=true;
     highPart.timer=0;
            highPart.toChange = beat * (Math.floor( Math.random()*7 + 1 )/32);
     
 } else {
     highPart.gain2.gain.value=.006;
  dunDun.gainNode.gain.value=0.5;  
     dunDun.off=false;
     dunDun.timer=0;
              dunDun.toChange = beat * (Math.floor( Math.random()*7 + 1 )/32);
 }
     wobbler.timer=wobbler.toChange;
             
    
    
}

function highNote() {
    this.noteInScale = Math.floor( Math.random()*7 );
     this.freq2 =  dMinorScale[this.noteInScale]*2;
        this.freq1 = Math.pow(2,8) * this.freq2;
    
    this.startFreak = .75;
    
     this.osc = ctx.createOscillator();
    this.osc2 = ctx.createOscillator();   
    this.gain = ctx.createGain();
       this.gain2 = ctx.createGain();
       
 this.timer = 0;
        this.toChange = beat/Math.floor( Math.random()*15 + 1 );
        //console.log(this.toChange);
    

      

       this.gain.gain.value = 400;
       this.gain2.gain.value=0;
       this.osc.type = "triangle";
       this.osc.frequency.value = this.freq1;
      

       this.osc2.type = "square";
       this.osc2.frequency.value = this.freq2;
   
     this.osc.connect(this.gain);
    this.osc.connect(this.osc2.frequency);
       this.gain.connect(this.osc2.frequency);
       this.osc2.connect(this.gain2);
       this.gain2.connect(ctx.destination);
    
       
       this.osc.start();
       this.osc2.start();
        this.gain2.gain.value=.006;
    
    this.update = function() {
        //this.gain2.gain.value-=.005;
        
        if (this.gain2.gain.value<=.005) {
         this.gain2.gain.value=Math.random()*.16;   
        }
        
       this.timer++;
         
        
        if (this.timer> this.toChange*this.startFreak) {
           
             this.freq1 =  Math.pow(2,-10*(this.timer/this.toChange)) * this.freq2;
           
             this.osc.frequency.value = this.freq1;
             //console.log(this.freq1 + " freq1/2");
        } 
        
        
         /* if (this.timer>= this.toChange/4) {
             this.freq1 =  Math.pow(2,10) * this.freq2;
             this.osc.frequency.value = this.freq1;
             //console.log(this.freq1 + " freq1/4");
        }*/
         if (this.timer>=this.toChange) {
             if (Math.random()>=.5) {
             this.noteInScale-=Math.floor(Math.random()*2+1);
                 } else {
                     this.noteInScale+=Math.floor(Math.random()*2+1); 
                     
                 }
             if (this.noteInScale>7) {
              this.noteInScale = this.noteInScale%7;   
                 
             }
             
             if (this.noteInScale<0) {
              this.noteInScale = this.noteInScale*-1;   
             }
             //console.log(this.noteInScale);
             
             
             this.freq2 =  dMinorScale[this.noteInScale]*8;
        this.freq1 =  Math.pow(2,2) * this.freq2;
             
             //console.log(this.freq1 + " freq1");
        this.osc2.frequency.value = this.freq2;
             this.osc.frequency.value = this.freq1;
             
             
            this.startFreak = Math.random()*.6; 
          this.timer=0;
            
              this.toChange = beat * (Math.floor( Math.random()*15 + 1 )/64);
             if (dunDun.off==false) { 
             if (Math.random()<=.03) {
            partSwitch();   
           }
             }
         }
         
              
        
        
    };
    
    this.mute = function() {
        this.gain2.gain.value=0;
        
    };
    
    
}


function wobble() {
       this.noteInScale = Math.floor( Math.random()*7 );
       this.freq2 =  dMinorScale[this.noteInScale];
        this.freq1 = 1/16*this.freq2;
       
        this.timer = 0;
        this.toChange = beat * (Math.floor( Math.random()*3 + 1 )/8);
        //console.log(this.toChange + " this.toChange");
    
    
       this.osc = ctx.createOscillator();
       this.gainNode = ctx.createGain();
       this.gain2 = ctx.createGain();
       this.osc2 = ctx.createOscillator();
    
    
        this.add = Math.floor( Math.random()*1 +1);
        this.subtract = -1* Math.floor( Math.random()*2 +1);

      

       this.gainNode.gain.value = 100;
       this.gain2.gain.value=0;
       this.osc.type = "square";
       this.osc.frequency.value = this.freq1;
      

       this.osc2.type = "saw";
       this.osc2.frequency.value = this.freq2;
       
        this.osc.connect(this.gainNode);
    this.osc.connect(this.osc2.frequency);
       this.gainNode.connect(this.osc2.frequency);
       this.osc2.connect(this.gain2);
       this.gain2.connect(ctx.destination);
       
       this.osc.start();
       this.osc2.start();
        this.gain2.gain.value = 0.5;
     this.update = function() {
         this.timer++;
         
         if (this.timer>=this.toChange) {
             if (Math.random()>=.1) {
             this.noteInScale+=this.add;
                 } else {
                     this.noteInScale+=this.subtract; 
                     
                 }
             if (this.noteInScale>7) {
              this.noteInScale = this.noteInScale%7;   
                 
             }
             
             if (this.noteInScale<0) {
              this.noteInScale = this.noteInScale*-1;   
             }
             //console.log(this.noteInScale);
             
             
             this.freq2 =  dMinorScale[this.noteInScale];
     
             if (dunDun.off) {
                 var wobblerMultiplier = Math.floor( Math.random()*3+1) *4;
                  this.freq1 = 1/wobblerMultiplier*wobbler.freq2;
                   this.timer=0;
              this.toChange = beat * (Math.floor( Math.random()*3 + 1 )/32);
             } else {
                   this.freq1 = 2*wobbler.freq2; 
                   this.timer=0;
              this.toChange = beat * (Math.floor( Math.random()*15 + 1 )/32);
             }
        this.osc2.frequency.value = wobbler.freq2;
             this.osc.frequency.value = wobbler.freq1;
             
             
             
        
         }
         
              
           
           
           
       };
    
    
     this.mute = function() {
        this.gain2.gain.value=0;
        
    };
    
    
}


