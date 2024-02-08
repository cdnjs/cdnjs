// Dom elements, global constants
const backward = document.querySelector('.backward');
const currentTime = document.querySelector('.current-time');
const durationVideo = document.querySelector('.duration-video');
const expand = document.querySelector('.expand');
const forward = document.querySelector('.forward');
const informationContainer = document.querySelector('.information-container');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const progress = document.querySelector('.video-progress');
const progressBar = document.querySelector('.video-progress-filled');
const reduce = document.querySelector('.reduce');
const silence = document.querySelector('.silence');
const video = document.querySelector('.video');
const volume = document.querySelector('.volume');
const volumeProgress = document.querySelector('.volume-progress');
const volumeProgressBar = document.querySelector('.volume-progress-filled');
const playerHover = document.querySelector('.player-overlay');

/**
// global functions
*/
function pauseVideo() {
  video.pause();
  pause.hidden = true;
  play.hidden = false;
}

function playVideo() {
  video.play();
  play.hidden = true;
  pause.hidden = false;
}

function backwardVideo() {
  video.currentTime -= 5;
}

function forwardVideo() {
  video.currentTime += 5;
}

function showSilenceIcon() {
  volume.hidden = true;
  silence.hidden = false;
}

function showVolumeIcon() {
  volume.hidden = false;
  silence.hidden = true;
}

function videoTime() {
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video.duration / 60);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

  currentTime.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;

  durationVideo.innerHTML = `${durationMinutes}:${
    durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
  }`;
}

function expandVideo() {
  if (document.body.webkitRequestFullscreen) {
    // chrome and safari
    document.body.webkitRequestFullscreen();
    expand.hidden = true;
    reduce.hidden = false;
  } else {
    // firefox
    document.body.requestFullscreen();
    expand.hidden = true;
    reduce.hidden = false;
  }
}

function reduceVideo() {
  if (document.body.webkitRequestFullscreen) {
    // chrome and safari
    document.webkitExitFullscreen();
    expand.hidden = false;
    reduce.hidden = true;
  } else {
    // firefox
    document.mozCancelFullScreen();
    expand.hidden = false;
    reduce.hidden = true;
  }
}

/**
//
*/

/**
// show or hide controls
 */
let timeout = 0;
playerHover.addEventListener('mousemove', () => {
  clearTimeout(timeout);
  playerHover.style.opacity = 1;
  timeout = setTimeout(function () {
    playerHover.style.opacity = 0;
  }, 3000);
});
/**
//
 */

/**
// video functionality
*/
video.addEventListener('loadedmetadata', () => {
  video.volume = 0.5;
  volumeProgressBar.style.width = '50%';
});

video.addEventListener('timeupdate', () => {
  // video current time & video duration time
  videoTime();

  // progress bar
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percentage}%`;

  if (video.currentTime === video.duration) {
    pause.hidden = true;
    play.hidden = false;
  }
});

video.addEventListener('volumechange', () => {
  if (video.volume > 0) {
    showVolumeIcon();
  } else {
    showSilenceIcon();
  }
});
/**
//
*/

// progress bar functionality
progress.addEventListener('click', (event) => {
  const progressTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressTime;
});

// play functionality
play.addEventListener('click', playVideo);

// pause functionality
pause.addEventListener('click', pauseVideo);

// backward functionality
backward.addEventListener('click', () => {
  backwardVideo();
});

// forward functionality
forward.addEventListener('click', () => {
  forwardVideo();
});

// play-pause on the video
informationContainer.addEventListener('click', () => {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
});

/**
// volume functionality
*/
volumeProgress.addEventListener('click', (event) => {
  const progressVolume = (event.offsetX / volumeProgress.offsetWidth) * 1;
  const percentage = progressVolume * 100;
  volumeProgressBar.style.width = `${percentage}%`;
  video.volume = progressVolume;
});

volume.addEventListener('click', () => {
  showVolumeIcon;
  video.volume = 0;
  volumeProgressBar.style.width = '0';
});

silence.addEventListener('click', () => {
  showSilenceIcon;
  video.volume = 0.5;
  volumeProgressBar.style.width = '50%';
});
/**
//
*/

/**
// expand / reduce fullscreen
*/

// expand functionality
expand.addEventListener('click', expandVideo);

// reduce functionality
reduce.addEventListener('click', reduceVideo);

// chrome & safari
document.addEventListener('webkitfullscreenchange', () => {
  if (!document.webkitIsFullScreen) {
    expand.hidden = false;
    reduce.hidden = true;
  }
});

// firefox
document.addEventListener('fullscreenchange', () => {
  if (!document.mozFullScreen) {
    expand.hidden = false;
    reduce.hidden = true;
  }
});

/**
//
*/

// keyboard functionality
document.addEventListener('keydown', (event) => {
  // space bar - play/plause
  if (event.code === 'Space') {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }

  // letter F - fullscreen
  if (event.code === 'KeyF') {
    expandVideo();
  }
});
