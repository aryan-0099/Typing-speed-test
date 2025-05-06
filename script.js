const startButton = document.getElementById('start-btn');
const typedText = document.getElementById('typed-text');
const randomText = document.getElementById('random-text');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog.',
  'JavaScript is a versatile programming language.',
  'A journey of a thousand miles begins with a single step.',
  'To be or not to be, that is the question.',
  'Typing tests help improve typing speed and accuracy.',
];

let startTime;
let timer;
let timeLeft = 60;
let isTestRunning = false;

function startTest() {
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  randomText.textContent = sampleTexts[randomIndex];
  typedText.disabled = false;
  typedText.value = '';
  typedText.focus();
  startButton.textContent = 'Restart';
  startTime = new Date().getTime();
  wpmDisplay.textContent = 'WPM: 0';
  accuracyDisplay.textContent = 'Accuracy: 100%';
  timeLeft = 60;
  updateTimerDisplay();
  isTestRunning = true;

  if (timer) clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  updateTimerDisplay();

  if (timeLeft <= 0) {
    clearInterval(timer);
    typedText.disabled = true;
    isTestRunning = false;
    alert('Time is up!');
    startButton.disabled = false;
  }
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}

function calculateResults() {
  const typedValue = typedText.value;
  const randomTextValue = randomText.textContent;

  const timeTaken = (new Date().getTime() - startTime) / 1000;
  const wordsTyped = typedValue.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeTaken) * 60);

  let correctChars = 0;
  for (let i = 0; i < typedValue.length; i++) {
    if (typedValue[i] === randomTextValue[i]) correctChars++;
  }
  const accuracy = typedValue.length ? Math.round((correctChars / typedValue.length) * 100) : 0;

  wpmDisplay.textContent = `WPM: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

  highlightText();

  if (typedValue === randomTextValue) {
    clearInterval(timer);
    typedText.disabled = true;
    isTestRunning = false;
    setTimeout(() => {
      alert('Test Complete! Well done!');
    }, 100);
  }
}

function highlightText() {
  const typed = typedText.value;
  const target = sampleTexts.find(text => text === randomText.textContent);
  let result = '';

  for (let i = 0; i < target.length; i++) {
    if (i < typed.length) {
      result += `<span class="${typed[i] === target[i] ? 'correct' : 'incorrect'}">${target[i]}</span>`;
    } else {
      result += target[i];
    }
  }

  randomText.innerHTML = result;
}

startButton.addEventListener('click', startTest);
typedText.addEventListener('input', () => {
  if (!isTestRunning) return;
  calculateResults();
});
