  
   //make gradient shadow full screen on top of everything to get rid of the slice of light inbetween the mountains and the ground


    var canvas = document.getElementById("arcticCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 35;
    var context = canvas.getContext('2d');
    

   
   var width = window.innerWidth;
    var height = window.innerHeight - 35;



     var grassCanvas = document.createElement('canvas');
        grassCanvas.width = width;
        grassCanvas.height = height;
    grassContext = grassCanvas.getContext('2d');


     var cloudCanvas = document.createElement('canvas');
        cloudCanvas.width = width;
        cloudCanvas.height = height;
    cloudContext = cloudCanvas.getContext('2d');

 var cloudCanvas2 = document.createElement('canvas');
        cloudCanvas2.width = width;
        cloudCanvas2.height = height;
    cloudContext2 = cloudCanvas2.getContext('2d');


  var mountainCanvas = document.createElement('canvas');
    mountainCanvas.width = width;
    mountainCanvas.height = .4*height;
   mountainContext = mountainCanvas.getContext('2d');
  

    color = [];

    color[0] = "rgba(167,154,127, .7)";
    color[1] = "rgba(130,113,93, .7)";
    color[2] = "rgba(136,163,148, .7)";
    color[3] = "rgba(200,201,154, .7)";
    color[4] = "rgba(119,102,81, .7)";
    color[5] = "rgba(143,181,216, .9)";
    color[6] = "rgba(161,213,243, .7)";
    color[7] = "rgba(182,221,245, .7)";
    color[8] = "rgba(255,185,0, .08)";
    color[9] = "rgba(127,148,175, .8)";
    

    var id = 0;

    var vId = 0;
    
    var vRemoveId;
    var vege = [];

    var shad = new shadows();

     context.rect(0,0,width,.5*height);
         context.fillStyle=color[5];
            context.fill();
        
    
    /*  grassContext.rect(0,0,width,height);
    grassContext.fillStyle = color[8];
    grassContext.fill();*/
     grassContext.globalAlpha = .65;

    bigMountains = 0;

    
    var theLand = [];
    var landLength = 14;
   var yAdd = (0.6*height)/(landLength);
    var yy = (0.4*height);
    
for (var i = 0; i<landLength; i ++) {
 theLand[i] = new LAND(yy, "main", id);
    yy+=yAdd;
    id++;
}


var theSun = new sun();



console.log(theLand.length);
console.log("---------------------");

var removeId = 0;
    
var AudioContext = window.AudioContext || window.webkitAudioContext;

 var ctx = new (window.AudioContext || window.webkitAudioContext)()
  var audio = document.getElementById('myAudio');
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
    var gain = ctx.createGain();
    gain.gain.value=.1;
  // we have to connect the MediaElementSource with the analyser 
  audioSrc.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 
  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(Math.floor(analyser.frequencyBinCount/5));
  var volumeData = new ANALYSIS();


//var cl = new cloud();

        var clouds = [];

        for (var i = 0; i<9;i++) {
         clouds[i] = new cloud();   
            
        }

        var theGrass = [];

        for (var i = 0; i<6;i++) {
            theGrass[i] = new grass();   
        }


         theBack = [];
             
             for (var i = 0; i<20; i ++) {
                 
              theBack[i] = new backMountains();   
             }


        theGround = new ground();
  // we're ready to receive some data!
  // loop


  function renderFrame() {
    
     context.clearRect(0,0,canvas.width, canvas.height);
      shad.update();
      
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
      
      
     
          for (var i = 0; i<theGrass.length;i++) {
        theGrass[i].update();
          theGrass[i].display();
          
      }
      
         
       
          context.rect(0,0,width,.4*height);
         context.fillStyle=color[5];
            context.fill();
            context.fill();
      
      context.beginPath();
      //    context.rect(0,.5*height,width,.5*height);
        // context.fillStyle="rgb(240,240,240)";
        // context.fill();
       
       
      
        //the SUN SUN SUN SUN SUN SUN SUN SUN
            theSun.display();
            theSun.update();
        
      
      
      /*var oldImage = cloudContext.getImageData(0,0,canvas.width, canvas.height);
        
        for (d = 3;d<oldImage.data.length;d+=4) {
         oldImage.data[d] = Math.floor(oldImage.data[d]*.995);   
        }
        */
        //cloudContext.putImageData(oldImage,0,0);
      
      
        cloudContext2.clearRect(0,0,cloudCanvas2.width, cloudCanvas2.height);
        cloudContext2.globalAlpha = .99;
        cloudContext2.drawImage(cloudCanvas,0,0);
        cloudContext.clearRect(0,0,cloudCanvas.width, cloudCanvas.height);
        cloudContext.drawImage(cloudCanvas2,0,0);

        
      
      
      
        context.drawImage(cloudCanvas,0,0);
      
      
        for (var i = 0; i<clouds.length;i++) {
            clouds[i].display();
        }
      
      context.fillStyle = "rgba(0,0,120," + theSun.shadowH*.05 + ")";
      context.rect(0,0,width,.4*height);
      context.fill();
     
       context.drawImage(grassCanvas,0,.4*height);
        theGround.display();
      
      
       if (vege.length>0) {
            for (var i = vege.length-1; i>0;i--) {
                if (vege[i]!==undefined) {
                    vege[i].display();
                    vege[i].update();
                
                }
            }
            
        }
       
      context.drawImage(mountainCanvas,0,0);
       mountainContext.clearRect(0,0,canvas.width, canvas.height);
      
       for (var i = 0; i<theBack.length; i++) {
                 
              theBack[i].draw();   
              theBack[i].update();   
             }
      
     
      
        volumeData.update();
         for (var i = theLand.length-1; i>0;i--) {
         theLand[i].draw();
         theLand[i].update();
             
           /*  if (theLand[i].state=="boom" && theLand[i].yPos>height) {
                removeId = theLand[i].id;
                 theLand = theLand.filter(function (el) {
               return el.id !== removeId; 
            });
            }
            */
          
             
             
         }
      
      var trans = lerp(1.365,2.85,theSun.shadowH*1.25);
      var sca = lerp(-1, -2.5, theSun.shadowH*1.25);
       // console.log(trans + " " + sca);
      context.save();
      context.translate(0, trans * height);
      context.scale(1,sca);
      
      //context.translate(0,2.85 * height);
      //context.scale(1,-2.5);
      
      context.globalAlpha = .3;
      context.drawImage(shad.shadowCanvas,0,.4*height);
      context.restore();
    
      
      
      
       //sun info
        var grad = context.createLinearGradient(0,.4*height,0,height*1.25);
       // grad.addColorStop(0,"rgba(255,206,84,0)");
        
        grad.addColorStop((theSun.h*.25),"rgba(255,206,84," + theSun.h*.1 + ")");
        //console.log(theSun.h*.1);
        grad.addColorStop(theSun.h*.75,"rgba(0,0,130,.2)");
        context.rect(0,0,width,height);
        context.fillStyle=grad;
        context.fill();
        //sun info
      
      
      
      /*
      grassContext.rect(0,0,width,(.6*height));
        grassContext.fillStyle = color[8];
       grassContext.globalAlpha = .057;
      grassContext.fill();
      grassContext.globalAlpha = .75;
      */  
      
      
      requestAnimationFrame(renderFrame);   
     }
     
  
  audio.play();
  renderFrame();
 
    