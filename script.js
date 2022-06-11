"user strict";

const today = new Date();
const clock = document.querySelector(".clock");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const eHours = document.querySelector(".eHours");
const eMinutes = document.querySelector(".eMinutes");
const eSeconds = document.querySelector(".eSeconds");

let hour,
  minute,
  second,
  i = 0,
  j = 0,
  z = 0,
  newDiv,
  rotateH;

function getTime() {
  hour = today.getHours();
  minute = today.getMinutes();
  second = today.getSeconds();
  rotateH = (360 / 12) * hour + (360 / 60 / 12) * minute;
}
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}
function createDiv() {
  for (let i = 0; i < 11; i++) {
    newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="hourTable" style="transform: rotate(${
      i * 30
    }deg)"><div class="whitePart"></div>
    <div class="blackPart"></div>
    <div class="whitePart"></div></div>`;
    clock.appendChild(newDiv);
  }
  for (let i = 0; i < 60; i++) {
    newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="minuteTable" style="transform: rotate(${
      i * 6
    }deg)">
    <div class="whitePart"></div>
    <div class="blackPart"></div>
    <div class="whitePart"></div>
  </div>`;
    clock.appendChild(newDiv);
  }
}
async function startTime() {
  hours.style.transform = `rotateZ(${
    (360 / 12) * hour + (360 / 60 / 12) * minute
  }deg)`;
  for (i = hour; i < 24; i++) {
    for (j = minute; j < 60; j++) {
      for (z = second; z < 60; z++) {
        minutes.style.transform = `rotateZ(${j * (360 / 60)}deg)`;
        seconds.style.transform = `rotateZ(${z * (360 / 60)}deg)`;
        eHours.textContent = i < 10 ? `0${i}` : i;
        eMinutes.textContent = j < 10 ? `0${j}` : j;
        eSeconds.textContent = z < 10 ? `0${z}` : z;
        await sleep(1000);
      }
      z === 60 ? (second = 0) : (z = z);
      rotateH += 0.5;
      hours.style.transform = `rotateZ(${rotateH}deg)`;
    }
    j === 60 ? (minute = 0) : (j = j);
    if (i === 23) {
      i = -1;
      minute = 0;
      second = 0;
      rotateH = 0;
    }
  }
}
getTime();
startTime();
createDiv();
