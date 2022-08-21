const timerDisplay = document.querySelector(".time");
const resumeTime = document.querySelector(".end-time");
const buttons = document.querySelectorAll("[data-time]");
let intervalId;

function timer(minutes) {
  clearInterval(intervalId);
  const seconds = minutes * 60;
  const now = Date.now();
  displayTimeLeft(seconds);
  const then = now + seconds * 1000;
  displayEndTime(then);

  intervalId = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(intervalId);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mintues = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const displayTime = `${mintues >= 10 ? "" : "0"}${mintues}:${
    remainingSeconds >= 10 ? "" : "0"
  }${remainingSeconds}`;
  timerDisplay.textContent = displayTime;
  document.title = `${displayTime} - Timer`;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  resumeTime.textContent = `${hour}:${minutes}`;
}

function buttonHandler() {
  const time = Number(this.dataset.time);
  timer(time);
}

buttons.forEach((button) => button.addEventListener("click", buttonHandler));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes);
  this.reset();
});
