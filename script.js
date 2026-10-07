const song = [
  "G5",
  "D5",
  "G5",
  "B5",
  "A5",
  "G5",
  "A5",
  "A5",
  "G5",
  "D5",
  "G5",
  "B5",
  "A5",
  "G5",
  "A5",
  "A5",
  "B5",
  "C6",
  "D6",
  "G5",
  "C6",
  "B5",
  "A5",
  "A5",
  "B5",
  "C6",
  "D6",
  "G5",
  "B5",
  "A5",
  "G5",
  "G5",
];

const names = {
  C5: "C",
  D5: "D",
  E5: "E",
  F5: "F",
  G5: "G",
  A5: "A",
  B5: "B",
  C6: "C",
  D6: "D",
  E6: "E",
  F6: "F",
};
;
const frequencies = {
  D6: 1174.73,
  C6: 1046.50,
  B5: 987.77,
  A5: 880.00,
  A4: 440,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  G5: 783.99,
};

const keyboard = document.querySelector("#keyboard");
const message = document.querySelector("#message");
const progress = document.querySelector("#progress");
const note = document.querySelector("#note");

let index = 0;
let soundOn = true;
let audio;

const whiteNotes = [
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
  "C6",
  "D6",
  "E6",
  "F6",
];

whiteNotes.forEach((noteName) => {
  const key = document.createElement("button");

  key.className = "white";
  key.dataset.note = noteName;
  key.textContent = names[noteName];

  keyboard.appendChild(key);
});

const blackNotes = [
  ["C#", 1, 0],
  ["D#", 2, 0],
  ["F#", 4, 0],
  ["G#", 5, 0],
  ["A#", 6, 0],
  ["C#", 7, 76],
  ["D#", 8, 78],
];

const words = document.querySelectorAll("#text span");

let currentWord = 0;

blackNotes.forEach(([noteName, position, offset]) => {
  const key = document.createElement("button");

  key.className = "black";
  key.dataset.note = noteName;

  const leftPosition =
    position * 78 + 53 + offset;

  key.style.left =
    `calc(50% - 505px + ${leftPosition}px)`;

  key.textContent = noteName;
  keyboard.appendChild(key);
});

function updateTargetKey() {
  const keys = document.querySelectorAll("[data-note]");
  const currentNote = song[index];

  keys.forEach((key) => {
    const isTarget = key.dataset.note === currentNote;

    key.classList.toggle("target", isTarget);
  });

  note.textContent = names[currentNote] || currentNote;
}

function playTone(noteName) {
  if (!soundOn) {
    return;
  }

  if (!audio) {
    audio = new AudioContext();
  }

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.frequency.value = frequencies[noteName] || 261.63;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.18, audio.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + 0.45
  );

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.45);
}

function playAny(key) {
  const currentNote = song[index];

  playTone(currentNote);

  document
    .querySelectorAll(".active")
    .forEach((activeKey) => {
      activeKey.classList.remove("active");
    });

  key.classList.add("active");

  setTimeout(() => {
    key.classList.remove("active");
  }, 180);

  words.forEach((word) => {
    word.classList.remove("active");
  });

  if (words.length > 0) {
    words[currentWord].classList.add("active");
  }

  index++;
  currentWord++;

  if (index >= song.length) {
    index = 0;  
  }

  if (currentWord >= words.length) {
    currentWord = 0;
  }

  updateTargetKey();
}


const pianoKeys = document.querySelectorAll("[data-note]");

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => {
    playAny(key);
  });
});


window.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  const keys = [
    ...document.querySelectorAll(".white")
  ];

  const keyIndex =
    event.key.toLowerCase().charCodeAt(0) %
    keys.length;

  playAny(keys[keyIndex]);
});

updateTargetKey();

const snow = document.getElementById("snow");

const snowflakeCount = 80;

for (let i = 0; i < snowflakeCount; i++) {
    const flake = document.createElement("div");

    flake.className = "snowflake";
    flake.textContent = "❄";

    flake.style.left = Math.random() * 100 + "vw";

    flake.style.fontSize = (Math.random() * 16 + 8) + "px";

    flake.style.animationDuration = (Math.random() * 8 + 6) + "s";

    flake.style.animationDelay = -(Math.random() * 14) + "s";

    flake.style.opacity = Math.random() * 0.6 + 0.3;

    snow.appendChild(flake);
}