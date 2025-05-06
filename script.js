const startButton = document.getElementById('start-btn');
const typedText = document.getElementById('typed-text');
const randomText = document.getElementById('random-text');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');

const sampleTexts = [
  'Failure is often misunderstood as the opposite of success, but it is actually a necessary part of the journey. Every mistake carries a lesson, teaching us what doesn’t work and pushing us to try new approaches. Great achievements are rarely made without some kind of setback. When we fail, we are given a chance to grow, reflect, and come back stronger. ',
  'Endurance is the ability to keep going, even when circumstances are tough. Its not about speed or immediate results, but about staying in the race no matter what. Life tests our endurance with difficulties, whether in school, work, or relationships. Those who endure are the ones who refuse to quit when others do. Its easy to start something, but enduring through obstacles shows real strength. ',
  'Patience is the quiet power of waiting without giving up. In a fast-paced world, patience is often overlooked, but it is critical to real success. Goals take time, growth takes time, and lasting change doesn’t happen overnight. Patience teaches us to trust the process and respect the time things require. It helps us stay calm when progress seems slow or invisible. Impatience often leads to frustration and poor decisions, while patience keeps us grounded',
  'Hard work is the foundation of all meaningful achievement. Talent can open doors, but hard work is what keeps them open. It involves discipline, consistency, and the willingness to do what others avoid. Those who work hard understand that nothing worthwhile comes easy. Hard work doesn’t guarantee instant success, but it always leads to improvement.',
  'Resilience is the strength to recover after being knocked down. It’s what allows people to face loss, stress, or failure and still keep going. Resilient individuals bend but don’t break; they adapt, learn, and grow stronger through adversity. It’s not about avoiding pain, but learning how to move through it. Resilience comes from a combination of hope, support, and inner strength.',
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
