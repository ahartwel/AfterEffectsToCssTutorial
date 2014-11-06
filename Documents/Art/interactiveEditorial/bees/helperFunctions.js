
        function justRight() {
          var randomness = Math.nrand();
            while (randomness<.5 || randomness>1.3) {
             randomness = Math.nrand();   
            }
            
            return randomness;
            
        } 


        function dist(x1, y1, x2, y2) {

            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);

            var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            return d;

        }
      
       
        
        
         function radians(degrees) {
            return degrees * Math.PI / 180;
        };

        function degrees(radians) {
            return radians * 180 / Math.PI;
        };
    
        
        
        function lerp(a, b, t) {
            var x = a + t * (b - a);
            return x;
        }

         
        Math.nrand = function() {
	var x1, x2, rad, y1;
	do {
		x1 = this.random() - .5;
		x2 = this.random() - .5;
		rad = x1 * x1 + x2 * x2;
	} while(rad >= 1 || rad == 0);
	var c = this.sqrt(-2 * Math.log(rad) / rad);
	return x1 * c;
};
   



var scrolled=0;
var oldScrolled=0;
var stopIt = false;
var whichP = 0;
window.scrollTo(0,0);
var justScrolled=false;

$(".body").css("padding-top",window.innerHeight + "px");

$("p").each(function() {
    
   $(this).css("margin-bottom",window.innerHeight + "px"); 
   $(this).css("height",window.innerHeight*.74 + "px"); 
   $(this).css("padding-bottom",window.innerHeight*.16 + "px"); 
   $(this).css("padding-top",window.innerHeight*.10 + "px"); 
    
});
/*$('body').on('mousewheel', function(event, delta) {
  console.log($('p:nth(0)').scrollTop() + $('p:nth(0)').height());
   
    if (justScrolled==false) {
   var hovered = $(".body").find("p:hover").length;
         console.log(hovered);
         if (hovered==0 || $('p:nth(0)').scrollTop() + $('p:nth(0)').height()>=$('p:nth(0)')[0].scrollHeight-.3*window.innerHeight) {
        var windowHeight = $(window).height();
    if (delta > 0) {
       whichP--;
        if (whichP<0) {
         whichP=0;   
        }
        
         justScrolled=true;
       setTimeout(function() {
           justScrolled=false;
           
       }, 1400);
    console.log(whichP);
   
    }
        
    }
   
    
     
    
    changeIt();
   }     
   
});
*/



function clearHornetCount() {
   for (var i = 0; i<hornet.length;i++) {
                
                    hornet[i].numberAttached=0;   
                 
                    
                }   
    
}


$(".two").click(function() {
   whichP++;
    console.log("shit");
    changeIt();
     $(".explainer").removeAttr("style");
     if ($(this).text() == "Let's Watch") {
     $(".one").text("Oh, The Horror!");   
       $(".one").siblings(".two").text("Save the bees; end the slaughter"); 
        $(".explainer").css("padding-left","5%");
    }
    
    
     if ($(this).text() == "Save the bees; end the slaughter") {
       
        for (var i = 0; i<bees.length;i++) {
                 bees[i].changeColor();   
                    bees[i].resetDeath();   
                 
                    
                }
                    console.log("settingFly");
                       for (var i = 0; i<hornet.length;i++) {
                
                    hornet[i].state="fly";   
                 
                    
                }
      
         
     }

    
    
     if ($(this).text() == "Turn Up the Heat!") {
     $(".one").text("That's hot!");   
       $(".one").siblings(".two").text("Ok Enough, I'm Boiling"); 
       $(".explainer").css("padding-left","5%");
         
         console.log("turn it up");
           for (var i = 0; i<bees.length;i++) {
               
               
                 bees[i].state="sorround";
               console.log(bees[i]);
           }
    }
    
    
});

function scrollIt() {
    
    
    
    
}


function changeIt() {

      
       if (whichP%2==0) {
       // $("#Bees").css("opacity",".25");  
           slow=0;
            $(".body").removeClass("noTouch");
       } else {
          // $("#Bees").css("opacity","1");   
            slow=1;
           
           $(".body").addClass("noTouch");
       }
    
    if (whichP==6) { 
        slow=1;
         for (var i = 0; i<bees.length;i++) {
                    
                        if (Math.random()<.5) {
                    bees[i].changeColor("rgb(255,200,0)");   
                        }
                    
                }
    }
             
             if (whichP==0) {
                 console.log("settingFly");
                for (var i =0; i< hornet.length;i++) {
               hornet[i].state="fly";   
              } 
                 
             }
             
             if (whichP==3) {
              for (var i =0; i< hornet.length;i++) {
               hornet[i].state="seek";   
              }
             }
    
        if (whichP<3) {
          for (var i = 0; i<bees.length;i++) {
                
                    bees[i].resetDeath();   
                 
                    
                }   
            console.log("settingFly");
             for (var i =0; i< hornet.length;i++) {
               hornet[i].state="fly";   
              }
        }

    scrollAnimate(window.innerHeight*whichP);
   } 

    
   
    
    



function addFull(theP) {
    
   $("p:nth(" + theP + ")").addClass("full"); 
    
}

function removeFull(theP) {
    
   $("p:nth(" + theP + ")").removeClass("full"); 
    
}

function scrollAnimate(newScroll) {
    scrolled = newScroll;
    oldScrolled = lerp(oldScrolled,scrolled,.4);
    $(".wrapper").scrollTop(oldScrolled);
   // $(".head").css("transform","translateY(" + scrolled + "px");
    if (dist(scrolled, 0, oldScrolled, 0)>2) {
    setTimeout(function() {
        scrollAnimate(scrolled);
        
    },15);
    } else {
       oldScrolled = scrolled;
    window.scrollTo(0,oldScrolled); 
        // $(".head").css("transform","translateY(" + scrolled + "px");
    }
    
   
    
}

function howScrolled(y) {
  return (scrolled>=y); 
    
}

function addFull() {
  $("p").each(function() {
         
        $(this).addClass('full'); 
         
     });   
    
}

function removeFull() {
  $("p").each(function() {
         
        $(this).removeClass('full'); 
         
     });   
    
}


/* 

  if (whichP==0) {  //0
       removeFull(whichP);
      
      
   } if (whichP==1) {
    addFull(whichP-1); //0
     
   }
    
   if (whichP==2) { 
     removeFull(whichP-2); //0
     
     
   }
     
    if (whichP==3) {
    addFull(whichP-2);  //1
      
   }
    
     if (whichP==4) {
    removeFull(whichP-3);  //1
     
   }
    
   if (whichP==5) { 
     addFull(whichP-3); //2
     
     
   }
     
    if (whichP==6) {
    removeFull(whichP-4);  //2
      
   }
    
     if (whichP==7) {
    addFull(whichP-4);  //3
      
   }
    
     if (whichP==8) {
    removeFull(whichP-5);  //3
     
   }
    
   if (whichP==9) { 
     addFull(whichP-5); //4
     
     
   }
     
    if (whichP==10) {
    removeFull(whichP-6);  //4
      
   }
    
     if (whichP==11) { 
     addFull(whichP-6); //5
     
     
   }
     
    if (whichP==12) {
    removeFull(whichP-7);  //5
      
   }
    
     if (whichP==13) {
    addFull(whichP-7);  //6
      
   }
    
     if (whichP==14) {
    removeFull(whichP-8);  //6
     
   }
    
   if (whichP==15) { 
     addFull(whichP-8); //7
     
     
   }
     
    if (whichP==16) {
    removeFull(whichP-9);  //7
      
   }
   
   
   */