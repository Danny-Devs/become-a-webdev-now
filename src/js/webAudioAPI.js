import * as Tone from 'tone';
const container = document.querySelector('.container');

const synth = new Tone.Synth().toDestination();

// Define the notes for each row
const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];

// Create a 12x20 grid
for (let i = 12; i > 0; i--) {
  for (let j = 0; j < 20; j++) {
    // Create a new div element for each square
    const square = document.createElement('div');

    // Add the 'square' class to the div
    square.classList.add('square');

    // Assign a unique id to the square
    square.classList.add(`tone-${i}`);
    square.classList.add(`chord-${j + 1}`);

    // Add an event listener to the square that plays the corresponding note when clicked
    square.addEventListener('click', () => {
      // Ensure audio context is resumed
      if (Tone.context.state !== 'running') Tone.context.resume();

      // Play the note
      synth.triggerAttackRelease(notes[i - 1], '16n');
    });

    // Append the square to the container
    container.appendChild(square);
  }
}

const playBtn = document.getElementById('play-btn');
const toneBtn = document.getElementById('tone-btn');
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
  } else if (playBtn.dataset.playing === 'true') {
    // pause audio if being played
    pauseAudio(cMajorAudio);
    playBtn.dataset.playing = 'false';
  }
}

toneBtn.addEventListener('click', toneBtnHandler, false);

function toneBtnHandler() {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  // trigger the attack immediately
  synth.triggerAttack('C4', now);
  // wait one second before triggering the release
  synth.triggerRelease(now + 1);
}

// VOLUME SLIDER
// Select the volume slider
const volumeSlider = document.querySelector('#volume');

// Update the volume of the Tone.Master when the slider is moved
volumeSlider.addEventListener('input', (event) => {
  // Convert the slider value from a range of 0-100 to a range of -60-0 for decibels
  const volume = (event.target.value / 100) * 60 - 60;

  // Set the volume of the Tone.Master
  Tone.Destination.volume.value = volume;
});