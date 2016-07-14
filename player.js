window.addEventListener('load', function() {

  // Video container
  var video = document.getElementById('video');

  // Progress bar container
  var pbarContainer = document.getElementById('pbar-container');

  var pbar = document.getElementById('pbar');

  // Buttons container
  var playButton = document.getElementById('play-button');
  var timeField = document.getElementById('time-field');
  var soundButton = document.getElementById('sound-button');
  var sbarContainer = document.getElementById('sbar-container');
  var sbar = document.getElementById('sbar');
  var fullscreenButton = document.getElementById('fullscreen-button');

  video.load();

  video.addEventListener('canplay', function() {

    playButton.addEventListener('click', playOrPause, false);

    pbarContainer.addEventListener('click', skip, false);

    // For get the total time of the video when he load
    updatePlayer();

    soundButton.addEventListener('click', muteOrUnmute, false);

    sbarContainer.addEventListener('click', changeVolume, false);

    fullscreenButton.addEventListener('click', fullscreen, false);

  }, false);



  function playOrPause() {
    if (video.paused) {
      video.play();
      playButton.src = 'images/pause.png';
      var update = setInterval(updatePlayer, 30);
    } else {
      video.pause();
      playButton.src = 'images/play.png';
      window.clearInterval(update);
    }
  }

  function updatePlayer() {
    var percentage = (video.currentTime/video.duration)*100;
    var update = setInterval(updatePlayer, 30);
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormattedTime();
    if (video.ended) {
      window.clearInterval(update);
      playButton.src = 'images/replay.png';
    }
  }

  function skip(e) {
    var mouseX = e.pageX - pbarContainer.offsetLeft; // Cause the video is not at 0 pixel left
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    // width is a string we need to change it for a number
    width = parseFloat(width.substr(0, width.length - 2));
    video.currentTime = (mouseX/width) * video.duration;
    updatePlayer; // Cause when pause the bar don't update
  }

  function getFormattedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds/60);

    // For make sure he don't pass 60secs
    if (minutes > 0) seconds -= minutes*60;

    // Add a zero if this is need
    if (seconds.toString().length === 1) seconds = '0' + seconds;
    
    // Get the total at the right of the currentTime
    var totalSeconds = Math.round(video.duration);
    
    var totalMinutes = Math.floor(totalSeconds/60);

    if (totalMinutes > 0) totalSeconds -= totalMinutes * 60;

    if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;


    return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds; // For looking like a real clock
  }

  // SOUND
  function muteOrUnmute() {
    if (!video.muted) {
      video.muted = true;
      soundButton.src = 'images/mute.png';

      // When we muted the video we want the bar to be empty
      sbar.style.display = 'none';
    } else {
      video.muted = false;
      soundButton.src = 'images/sound.png';

      sbar.style.display = 'block';
    }
  }

  function changeVolume(e) {
    var mouseX = e.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    // width is a string we need to change it for a number
    width = parseFloat(width.substr(0, width.length - 2));

    video.volume = (mouseX/width);
    sbar.style.width = (mouseX/width) * 100 + '%';

    // If muted and we click somewhere else we can unmuted
    video.muted = false;
    soundButton.src = 'images/sound.png';
    sbar.style.display = 'block';
  }

  // Fullscreen
  function fullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullscreen) {
      video.mozRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }

}, false);
