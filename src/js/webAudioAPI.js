const playBtn = document.getElementById('play-btn');
const cMajorAudio = document.getElementById('c-major');
const fMajorAudio = document.getElementById('f-major');
const gMajorAudio = document.getElementById('g-major');

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const cMajor = audioContext.createMediaElementSource(cMajorAudio);
const fMajor = audioContext.createMediaElementSource(fMajorAudio);
const gMajor = audioContext.createMediaElementSource(gMajorAudio);

// utility function to play audio
function playAudio(audioElement, mediaElementSource) {
  mediaElementSource.connect(audioContext.destination);
  audioElement.play();
}
// utility function to pause audio
function pauseAudio(audioElement) {
  audioElement.pause();
}

playBtn.addEventListener('click', playBtnHandler, false);

function playBtnHandler() {
  // resume audio if paused
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  // play audio if not being played
  if (playBtn.dataset.playing === 'false') {
    playAudio(cMajorAudio, cMajor);
    playBtn.dataset.playing = 'true';
  } else if (playBtn.dataset.playing === 'true') { // pause audio if being played
    pauseAudio(cMajorAudio);
    playBtn.dataset.playing = 'false';
  }
  
  

}