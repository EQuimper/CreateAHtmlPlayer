window.addEventListener('load', function() {

  // Video container
  var video = document.getElementById('video');

  // Progress bar container
  var pbarContainer = document.getElementById('pbar-container');

  var pbar = document.getElementById('pbar');

  // Buttons container
  var playButton = document.getElementById('play-button');
  var timeField = document.getElementById('time-field');

  video.load();

  video.addEventListener('canplay', function() {

    playButton.addEventListener('click', playOrPause, false);

    pbarContainer.addEventListener('click', skip, false);

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
    
    

    return minutes + ':' + seconds; // For looking like a real clock
  }

}, false);
