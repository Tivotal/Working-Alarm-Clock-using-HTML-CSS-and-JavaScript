/* Created by Tivotal */

let currentTime = document.querySelector(".current-time");
let menu = document.querySelector(".menu");
let selectMenu = document.querySelectorAll("select");
let btn = document.querySelector(".btn");

let alarmTime = null;
let isAlarmOn = false;
let soundTrack = new Audio("./media/audio.mp3");

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    soundTrack.play();
    soundTrack.loop = true;
  }
});

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm() {
  if (isAlarmOn) {
    alarmTime = "";
    soundTrack.pause();
    menu.classList.remove("disable");
    btn.innerText = "Set Alarm";
    return (isAlarmOn = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Select a valid time!");
  }

  alarmTime = time;
  isAlarmOn = true;
  menu.classList.add("disable");
  btn.innerText = "Clear Alarm";
}

btn.addEventListener("click", setAlarm);
