  var howManyMore = 0;
    var xDecay = -1;
    var speedDecay = -.5;
        var sizeDecay = -1;
    var howManyToKill = 0;

    var mouseX, mouseY;

var justStarted = true;


var state = 0;


 var scrolling=false;
        var yScroll = 0;

        
    var looper = document.getElementById("loopMachine");
        looper.width = window.innerWidth;
        looper.height = 400/1000 *window.innerWidth;
    
    var context = looper.getContext("2d");
        
        context.fillStyle = "rgb(0,0,0)";
        context.beginPath();
    context.rect(0,0,looper.width, looper.height);
        context.fill();
        context.closePath();
    var balls = [];
        for (var i = 0; i<3;i++) {
            if (Math.random()<.5) {
            balls[i] = new ball("rgb(255,255,255)");
            } else {
               balls[i] = new ball("rgb(255,0,255)");  
            }
        }

    var amountSlider = new howManySlider(350/400*looper.height); 
    var sizeSlider = new sizeDecaySlider(300/400*looper.height); 
    var xSlider = new xDecaySlider(250/400*looper.height); 
      var tutorial = new tutorial();  
        function animate() {
           
        
            
            
            if (yScroll>0) {
            context.fillStyle="rgba(0,0,0,.08)";
            context.beginPath();
            context.rect(0,0,looper.width, looper.height);
            context.fill();
            
            context.fillStyle="rgba(0,50,50,.1)";
            context.beginPath();
            context.rect(0,0,looper.width, looper.height);
            context.fill();
            
           
            for (var i =0; i<balls.length;i++) {
             if (i<=balls.length) {
                
                balls[i].update();
             }
                  if (i<=balls.length) {
                balls[i].display();
             }
             

            }
            
                
                if (state>1) {
               amountSlider.display(); 
               sizeSlider.display(); 
               xSlider.display(); 
                }
            
               if (howManyToKill>0&& howManyToKill<balls.length) {
                    for (var i =0; i<howManyToKill;i++) {
                        for (var i = 0; i<balls.length;i++) {
                           
                        if (balls[i].xPos<=0) {    
                           if (howManyToKill>0) {
                              
                            balls.splice( i, 1 ); 
                            howManyToKill--;
                              
                           }
                            
                        }
                            
                        
                        
                        }
                        
                    }
                    
                }
            
           // console.log(balls.length);
            
                if (state<=1) {
                    
                    
                 tutorial.update();   
                 tutorial.display();   
                }
                
                
            }
              yScroll = pageYOffset;
        var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
      //h1 x 44.5  y 200  
    //.date x 193  y 60
        
        //.controls   x  31.5  y  800
        var h1 = document.getElementsByClassName('h1')[0];
            console.log(h1.clientWidth);
             var halfW = h1.clientWidth/2;
            var off = (.5*window.innerWidth) - halfW;
        var x = lerp(off,0, pageYOffset/(window.innerHeight),0, pageYOffset/(window.innerHeight)); 
        var y = lerp(.3*window.innerHeight,0, pageYOffset/(window.innerHeight)); 
        h1.style.transform = "translate(" + x + "px," + y + "px)";
        
        var date = document.getElementsByClassName('date')[0];
            halfW = date.clientWidth/2;
            console.log(halfW);
            off = (.5*window.innerWidth) - halfW - (.19*window.innerHeight);
        x = lerp(off,0, pageYOffset/( window.innerHeight)); 
        y = lerp(.365 * window.innerHeight,0, pageYOffset/(window.innerHeight)); 
        date.style.transform = "translate(" + x + "px," + y + "px)";
        
        
        var controls = document.getElementsByClassName('controls')[0];
            halfW = controls.clientWidth/2;
             off = (.5*window.innerWidth) - halfW;
        x = lerp(off,0, pageYOffset/(window.innerHeight)); 
        y = lerp(.385*window.innerHeight,0, pageYOffset/(window.innerHeight)); 
       controls.style.transform = "translate(" + x + "px," + y + "px)";
        
        
       // controls.style.height = "3%";
        
            if (yScroll==height-window.innerHeight && justStarted) {
                console.log(yScroll + " yscroll"); 
                howManyMore = 1;
                 amountSlider.value = howManyMore;
        amountSlider.knobX = amountSlider.x + ((amountSlider.value + 10)/13) * amountSlider.w;
                justStarted=false;
                
            }
            
        if (scrolling) {
        
            
            yScroll+= 16;
            if (yScroll>=height - window.innerHeight) {
             yScroll=height-window.innerHeight;   
                scrolling=false;
               
            }
            window.scrollTo(0,yScroll);
            
            
        }
        
            
            
         requestAnimationFrame(animate);   
        }
        
        
         requestAnimationFrame(animate);

var mouseDown = false;

document.getElementById("loopMachine").addEventListener("mousedown",function(event) {
    mouseDown = true;

    
    var target = event.target;
    var y = event.y - (target.offsetTop-scrollY);
    var x = event.x - target.offsetLeft;
    console.log(x);
    console.log(y);
    if (x<amountSlider.x+amountSlider.w && x>amountSlider.x && y>amountSlider.y && y<amountSlider.y+amountSlider.h) {
      
        
    }
    
    
},false);

document.getElementById("loopMachine").addEventListener("mouseup",function(event) {
    mouseDown = false;
  
    
    var target = event.target;
    var y = event.y - (target.offsetTop-scrollY);
    var x = event.x - target.offsetLeft;
    
    if (x<amountSlider.x+amountSlider.w && x>amountSlider.x && y>amountSlider.y && y<amountSlider.y+amountSlider.h) {
       
        
    }
    
    
},false);

document.getElementById("loopMachine").addEventListener("mousemove",function(event) {
   
     var target = event.target;
    var y = event.y - (target.offsetTop-scrollY);
    var x = event.x - target.offsetLeft;
    if (mouseDown) {
   
    
   
    
    if (x<amountSlider.x+amountSlider.w && x>amountSlider.x && y>amountSlider.y && y<amountSlider.y+amountSlider.h) {
        
        
        var i = Math.floor( (x - amountSlider.x)/((amountSlider.x+amountSlider.w)-amountSlider.x) * 13 );
       
        i -= 10;
        amountSlider.value = i;
        amountSlider.knobX = amountSlider.x + ((amountSlider.value + 10)/13) * amountSlider.w;
        howManyMore = i;
    }
       
       if (x<sizeSlider.x+sizeSlider.w && x>sizeSlider.x && y>sizeSlider.y && y<sizeSlider.y+sizeSlider.h) {
        
        
        var i = Math.floor( (x - sizeSlider.x)/((sizeSlider.x+sizeSlider.w)-sizeSlider.x) * 13 );
       console.log(i);
        i -= 10;
       sizeSlider.value = i;
       sizeSlider.knobX = sizeSlider.x + ((sizeSlider.value + 10)/13) * sizeSlider.w;
       sizeDecay=i;
    }   
       
       if (x<xSlider.x+xSlider.w && x>xSlider.x && y>xSlider.y && y<xSlider.y+xSlider.h) {
        
        
        var i = Math.floor( (x - xSlider.x)/((xSlider.x+xSlider.w)-xSlider.x) * 13 );
       console.log(i);
        i -= 10;
       xSlider.value = i;
       xSlider.knobX = xSlider.x + ((xSlider.value + 10)/13) * xSlider.w;
       speedDecay=i;
    }
        
    }
    mouseX = x;
    mouseY = y;
    
    
    
    
},false);


function howManySlider(y) {
    
    
    
  this.w = looper.width/5;
    this.h = looper.height/13;
    

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.context = this.canvas.getContext('2d');
    
    this.context.fillStyle="white";
    this.context.beginPath();
    
    var size = 2;
    var xBuffer = .15*this.canvas.width;
    
    var startAngle = .2;
    for (var i = 0; i < 12; i ++) {
        this.context.beginPath();
        
        if (startAngle<1.9) {
        this.context.arc(i/12 * this.canvas.width - xBuffer,.5*this.canvas.height, .235*this.canvas.height, 0, startAngle * Math.PI,false);
        } else if (startAngle<2) {
            this.context.arc(i/12 * this.canvas.width - xBuffer-2,.75*this.canvas.height, .2*this.canvas.height, 0, 2 * Math.PI,false);
             this.context.arc(i/12 * this.canvas.width - xBuffer+2,.35*this.canvas.height, .2*this.canvas.height, 0, 2 * Math.PI,false);
        } else {
           
             this.context.beginPath();
            this.context.arc(i/12 * this.canvas.width - xBuffer-.22*this.canvas.height + .05*this.canvas.width,.75*this.canvas.height, .2*this.canvas.height, 0, 2 * Math.PI,false);
            this.context.fill();
            this.context.beginPath();
             this.context.arc(i/12 * this.canvas.width - xBuffer + .05*this.canvas.width,.35*this.canvas.height, .2*this.canvas.height, 0, 2 * Math.PI,false);
              this.context.fill();
            this.context.beginPath();
             this.context.arc(i/12 * this.canvas.width - xBuffer+.22*this.canvas.height + .05*this.canvas.width,.75*this.canvas.height, .2*this.canvas.height, 0, 2 * Math.PI,false); 
            this.context.fill();
        }
        
        startAngle+=.155;
        size+=2;
        xBuffer-=2;
    this.context.fill();    
    }
    
    
    
    
    
    this.x = looper.width - this.w - 15;
    this.y = y;
    console.log(this.x);
    
    this.value = howManyMore;
    
    this.max = 3;
    this.min = -10;
    
    
    this.knobWidth = this.w/13;
    this.knobHeight = this.h;
    
    this.knobX = this.x + ((this.value + 10)/13) * this.w;
    console.log(this.knobX);
    
    
    
    
    
    this.display = function() {
      
    context.drawImage(this.canvas,this.x,this.y);
           
        context.beginPath();
    context.fillStyle = "rgba(150,150,150,.8)";
    context.rect(this.knobX,this.y,this.knobWidth,this.knobHeight);
        context.fill();
        context.closePath();
        
       
        
        
    };
    
    
    
    
    
}

function sizeDecaySlider(y) {
  this.w = looper.width/5;
    this.h = looper.height/13;
    
    this.x = looper.width - this.w - 15;
    this.y = y;
    
    
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.context = this.canvas.getContext('2d');
    
    this.context.fillStyle="white";
    this.context.beginPath();
    
    var size = 2;
    var xBuffer = .15*this.canvas.width;
    
    for (var i = 0; i < 12; i ++) {
        this.context.rect(i/12 * this.canvas.width - xBuffer,.5*this.canvas.height - (size/2),size,size);
        
        size+=2;
        xBuffer-=2;
        
    }
    
    this.context.fill();
    
    
    this.value = sizeDecay;
    
    this.max = 3;
    this.min = -10;
    
    
    this.knobWidth = this.w/13;
    this.knobHeight = this.h;
    
    this.knobX = this.x + ((this.value + 10)/13) * this.w;
    console.log(this.knobX);
    
    
    
    
    
    this.display = function() {
       context.drawImage(this.canvas,this.x,this.y);
           
        context.beginPath();
    context.fillStyle = "rgba(150,150,150,.8)";
    context.rect(this.knobX,this.y,this.knobWidth,this.knobHeight);
        context.fill();
        context.closePath();
        
    };
    
}
    
function xDecaySlider(y) {
  this.w = looper.width/5;
    this.h = looper.height/13;
    
    this.x = looper.width - this.w - 15;
    this.y = y;
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.context = this.canvas.getContext('2d');
    
    this.context.fillStyle="white";
    this.context.beginPath();
    
    var size = 2;
    var xBuffer = 0;
    
    for (var i = 0; i < 12; i ++) {
        this.context.rect(i/12 * this.canvas.width + xBuffer,.5*this.canvas.height,size,2);
        
        size+=3;
        if (i==8) {
        xBuffer+=5;    
        } else {
         xBuffer+=3;   
        }
        
        
    }
    
    this.context.fill();
    
    
    this.value = speedDecay;
    
    this.max = -1;
    this.min = -8;
    
    
    this.knobWidth = this.w/13;
    this.knobHeight = this.h;
    
    this.knobX = this.x + ((this.value + 8)/8) * this.w;
    console.log(this.knobX);
    
    
    
    
    
    this.display = function() {
  context.drawImage(this.canvas,this.x, this.y);
        
        
        context.beginPath();
    context.fillStyle = "rgba(150,150,150,.8)";
    context.rect(this.knobX,this.y,this.knobWidth,this.knobHeight);
        context.fill();
        context.closePath();
        
     
        
        
    };
    
    
    
    
    
}
function lerp(a, b, t) {
    
    if (t>1) {
     t=1;   
    }
    
            var x = a + t * (b - a);
            return x;
        }


  function dist(x1, y1, x2, y2) {

            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);

            var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            return d;

        }

/*
along with the A,B, or C rating we have violations such as "has cockroaches" or "food not stored properly", we have the A,B, or C but we don't have the violations, there was some issue yet to be solved in getting them from the database
*/