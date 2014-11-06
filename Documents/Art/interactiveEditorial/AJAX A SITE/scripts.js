changer = new changeTitle();


var imgListVisible = false;
var imgTimeout;
window.onload = function() {
    
   var link = document.createElement("link");
link.href = chrome.extension.getURL("fix.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);
    
if (window.location.pathname == "/2014/2/18/5412636/this-machine-kills-trolls-how-wikipedia-robots-snuff-out-vandalism") {
//alert("shiiiiit");
  
   changer.changeShit();
    
     $(".story-image").css("width","50%");
    $(".story-image").css("margin-left","25%");
    $(".social-media-column").css("margin-left","-25%");
    $(".social-media-column").css("margin-top","-16%");
    
   
    
    console.log($("#paragraph1").text());
    
    //console.log(changer);
} else {
    alert($("header .headline").text());
} 




$(".imgHistory .back").click(function() {
  $(".vox-lazy-load").removeClass("glow");
    console.log(changer.imgHistory);
    //changer.imgHistory.splice(changer.imgHistory.length,1);
    if (changer.imgHistoryCounter>=1) {
   changer.imgHistoryCounter--;
    console.log(changer.imgHistory[changer.imgHistoryCounter]);
    
     $(".vox-lazy-load").attr("src",changer.imgHistory[changer.imgHistoryCounter]); 
    } else {
        
        
        alert("at the beginning");
    }
    clearTimeout(imgTimeout);
    imgTimeout = setTimeout(function() {
        
        if (  changer.imgHistory[changer.imgHistory.length-1] == "http://fc08.deviantart.net/fs42/i/2009/091/8/3/Squidward__by_ogiklo.jpg ") {
             changer.imgHistoryCounter=changer.imgHistory.length-1;
        } else {
         changer.imgHistory[changer.imgHistory.length] = "http://fc08.deviantart.net/fs42/i/2009/091/8/3/Squidward__by_ogiklo.jpg ";
         changer.imgHistoryCounter=changer.imgHistory.length-1;
        }
        $(".vox-lazy-load").attr("src","http://fc08.deviantart.net/fs42/i/2009/091/8/3/Squidward__by_ogiklo.jpg "); 
     $(".vox-lazy-load").addClass("glow");
       
         updateImageHistoryList(); 
    }, Math.random()*5000+5000);
    
    changeImgHistoryOpacity();
    
});

$(".imgHistory .forward").click(function() {
  $(".vox-lazy-load").removeClass("glow");
    console.log(changer.imgHistory);
    //changer.imgHistory.splice(changer.imgHistory.length,1);
    if (changer.imgHistoryCounter<changer.imgHistory.length-1) {
   changer.imgHistoryCounter++;
    console.log(changer.imgHistory[changer.imgHistoryCounter]);
    
     $(".vox-lazy-load").attr("src",changer.imgHistory[changer.imgHistoryCounter]); 
    } else {
        
        alert("at the end");
    }
    changeImgHistoryOpacity();
    
});
   
    
    function changeImgHistoryOpacity() {
     $(".imgList .listContainer .listElement").each(function() {
        if ($(this).attr("number") == changer.imgHistoryCounter) {
            
            $(this).addClass("chosen");
        } else {
             $(this).removeClass("chosen");  
        }
         
     });
        
    }



$(".textHistory .back").click(function() {
 
    console.log(changer.titleHistory);
    //changer.imgHistory.splice(changer.imgHistory.length,1);
    if (changer.titleHistoryCounter>=1) {
   changer.titleHistoryCounter--;
    console.log(changer.titleHistory[changer.titleHistoryCounter]);
    
     $("header .headline").text(changer.titleHistory[changer.titleHistoryCounter]); 
    } else {
        
        
        alert("at the beginning");
    }
    
    
});

$(".textHistory .forward").click(function() {
 
    console.log(changer.titleHistory);
    //changer.imgHistory.splice(changer.imgHistory.length,1);
    if (changer.titleHistoryCounter<changer.titleHistory.length-1) {
   changer.titleHistoryCounter++;
    console.log(changer.imgHistory[changer.titleHistoryCounter]);
    
      $("header .headline").text(changer.titleHistory[changer.titleHistoryCounter]); 
    } else {
        
        alert("at the end");
    }
    
    
});
    
    
$(".imgHistory .editHistory").click(function() {
       if (imgListVisible) {
        imgListVisible=false;
           $(this).removeAttr("style");
           $(".imgHistory .imgList").removeAttr("style");
           
           
       } else {
           console.log(changer.imgHistory);
          updateImageHistoryList();
           $(this).css("transform", "translateY(-" + changer.imgHistory.length*35 + "px)");
           $(".imgHistory .imgList").css("height","" + changer.imgHistory.length*35 + "px"); 
            imgListVisible=true;
       }
    
    
});
    
    $(".imgList").on("click", ".listElement", function(event) {
          $(".vox-lazy-load").removeClass("glow");
       
       changer.imgHistoryCounter = $(this).attr("number");
        $(".vox-lazy-load").attr("src",changer.imgHistory[changer.imgHistoryCounter]); 
        
        changeImgHistoryOpacity();
        
    });
    
}


function updateImageHistoryList() {
   $(".imgHistory .imgList").empty();
           var div = document.createElement('div');
           var img = []
            div.className = "listContainer";
           var div2=[];
           for (var i=0; i<changer.imgHistory.length;i++) {
            div2[i] = document.createElement('div');
               if (i==changer.imgHistoryCounter) {
            div2[i].className = "listElement chosen";
               } else {
                    div2[i].className = "listElement";
               }
               img[i] = document.createElement('img');
               img[i].src = changer.imgHistory[i];
             
            div2[i].setAttribute("number",i);
               div2[i].appendChild(img[i]);
              div.appendChild(div2[i]);
           }
            $(".imgHistory .imgList").append(div);  
               $(".imgHistory .editHistory").css("transform", "translateY(-" + changer.imgHistory.length*35 + "px)");
           $(".imgHistory .imgList").css("height","" + changer.imgHistory.length*35 + "px"); 
    
}


function changeTitle() {
 
    this.originalTitle = $("header .headline").text();
    this.newTitle = "Zeppelin Rules!!!!";
  
    this.titleHistory = [];
    this.titleHistory[0] = this.originalTitle;
    this.titleHistoryCounter = 0;
    
    this.imgHistory = [];
    this.imgHistoryCounter = 0;
    
    this.changeShit = function() {
       
    
        changeTitleInit(this.originalTitle, this.newTitle);
       
    this.imgHistory[0] =  $(".column .vox-lazy-load").attr("src");
   this.imgHistoryCounter++;
         this.imgHistory[this.imgHistoryCounter] = "http://i940.photobucket.com/albums/ad249/FatD73/FatManinaBox.jpg";
    $(".vox-lazy-load").attr("src","http://i940.photobucket.com/albums/ad249/FatD73/FatManinaBox.jpg"); 
     $(".vox-lazy-load").addClass("glow");
        
        
    $(".column.grid_12:eq(0)").append("<div class='imgHistory'><span class='editHistory'>Revision History</span><div class='imgList'></div><span class='back'><</span><span class='forward'>></span></div>");      
    $("h1").after("<div class='textHistory'><span class='editHistory'>Revision History</span><span class='back'><</span><span class='forward'>></span></div>");
    
    
}


function changeText(newLength, str) {
    
   $("header .headline").empty();  
          $("header .headline").text(str.substr(0,newLength));
         
          
    
}

function changeTitleInit(originalTitle, newTitle) {
     var lengthOfString = originalTitle.length-1;
    
        changer.titleHistory[changer.titleHistory.length] = newTitle;
    console.log(changer.titleHistory);
        changer.titleHistoryCounter ++;
        for (var i = 0; i<originalTitle.length; i++) {
        
     
        setTimeout(function() {
           
         changeText(lengthOfString,originalTitle);
        lengthOfString--;
            
            if (lengthOfString == 0) {
             for (var i =0; i <newTitle.length;i++) {
                setTimeout(function() {
                    changeText(lengthOfString,newTitle);
                    lengthOfString++;
                    
                }, i*150);
                           }
                
            }
            
        }, i*100);
        
        
    }
    };
    
    
    
}