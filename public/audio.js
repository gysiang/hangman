const muteBtn = document.createElement("btn");
const bgMusic = new Audio('/sounds/theme-song');
bgMusic.volume = 0.1;
/**
 * Enables play and pause of bgm music
 */
const playPause = () => {
  if (bgMusic.paused) {
    bgMusic.play();
    muteBtn.className = 'unmute';
  } else {
    bgMusic.pause();
    muteBtn.className = 'mute';
  }
};

muteBtn.addEventListener('click', playPause);