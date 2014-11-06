var activeSong;
var playing = false;
//Plays the song. Just pass the id of the audio element.
function play(id){
    if (playing==false) {
  //Sets the active song to the song being played. All other functions depend on this.
  activeSong = document.getElementById(id);
  //Plays the song defined in the audio tag.
  activeSong.play();
 
  //Calculates the starting volume percentage of the song.
  var percentageOfVolume = activeSong.volume / 1;
  var percentageOfVolumeMeter = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;
 
  //Fills out the volume status bar.
  document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
        playing=true;
    } else {
        pause();
        playing=false;
        
    }
    
    
}

function pause() {
  activeSong.pause();
}


function updateTime(){
  var currentSeconds = (Math.floor(activeSong.currentTime % 60) &lt; 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
  var currentMinutes = Math.floor(activeSong.currentTime / 60);
 
  //Sets the current song location compared to the song duration.
  document.getElementById('songTime').innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(activeSong.duration / 60) + ":" + (Math.floor(activeSong.duration % 60) &lt; 10 ? '0' : '') + Math.floor(activeSong.duration % 60);
 
  //Fills out the slider with the appropriate position.
  var percentageOfSong = (activeSong.currentTime/activeSong.duration);
  var percentageOfSlider = document.getElementById('songSlider').offsetWidth * percentageOfSong;
 
  //Updates the track progress div.
  document.getElementById('trackProgress').style.width = Math.round(percentageOfSlider) + "px";
}