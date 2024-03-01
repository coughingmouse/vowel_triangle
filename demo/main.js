if ((window.location.host == "coughingmouse.github.io") && (window.location.protocol != "https:"))
  window.location.protocol = "https";

var selected_mic = false;
var graphs_element = document.getElementById("wrapper");
var media_button = document.getElementById("media_button");
var mic_button = document.getElementById("mic_button");

media_button.addEventListener("click",usemedia,false);
mic_button.addEventListener("click",usemic,false);

var game = new window.VowelWorm.Game({element: graphs_element});

var media_on = false;
var started = false;
function usemedia() {
  var audio_els = document.getElementsByClassName('media');
  if(media_on) {
    media_on = false;
    media_button.classList.add('fa-play');
    media_button.classList.remove('fa-pause');
    for (var i = 0; i < audio_els.length; i++) {
      audio_els[i].pause();
    }

    return;
  }

  media_on = true;
  media_button.classList.remove('fa-play');
  media_button.classList.add('fa-pause');
  
  var worms = [];

  function playAll() {
    for(var i = 0; i<audio_els.length; i++) {
      audio_els[i].play();
    }
  }
  
  var audios_loaded = 0;
  function audioReady() {
    audios_loaded++;
    if(audios_loaded >= audio_els.length) {
      playAll();
    }
  }

  if(started) {
    playAll();
    return; // don't add more event listeners
  }

  // hacky loop to make sure audio stays somewhat in sync
  var audios_finished = 0;
  function audioFinished() {
    if(audios_finished >= audio_els.length) {
      audios_finished = 0;
    }
    audios_finished++;
    if(audios_finished === audio_els.length) {
      playAll();
    }
  };

  for(var i = 0; i<audio_els.length; i++) {
    var audio = audio_els[i];
    audio.load();
    audio.addEventListener('canplaythrough', audioReady);
    audio.addEventListener('ended', audioFinished);
    var worm = new window.VowelWorm.instance(audio);
    worms.push(worm);
    game.addWorm(worm);
  }i
  started = true;
}

function usevideo() {
  video.style.display = 'block';
  var worm = new window.VowelWorm.instance(video);
  game.addWorm(worm);
};

function usemic() {
  if(!selected_mic){
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(micSuccess)
      .catch(micFailure);
    selected_mic = true;
  }
};

function micSuccess(stream) {
  var worm = new window.VowelWorm.instance(stream);
  game.addWorm(worm);
};

function micFailure() {
  alert("Could not capture microphone input");
};

// my code here ///////////////////////////
window.onload = function() {
  var canvas = document.getElementById("wrapper")
    .getElementsByTagName('canvas')[0];
  var drag = false;
  var dragStart;
  var dragEnd;
  canvas.addEventListener('pointerdown', function(event) {
    dragStart = {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    }
    drag = true;
  })
  canvas.addEventListener('pointerup', function(event) {
    drag = false;
  })
  canvas.addEventListener('pointermove', function(event) {
    if (drag) {
      dragEnd = {
        x: event.pageX - canvas.offsetLeft,
        y: event.pageY - canvas.offsetTop
      }
      window.game.move(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      dragStart = dragEnd;
    }

  })

  var len = Math.min(window.innerWidth, window.innerHeight);
  var canvas = document.getElementsByTagName("canvas")[0];
  gl = canvas.getContext("webgl");
}


////////////////////////////////