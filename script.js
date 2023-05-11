
let data;
const thisday = new Date().getDate()-1; 
var deadline = new Date(Date.parse(new Date()) + 6 * 60 * 60 * 1000);
function main(method=5,school=0)
{
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    axios
      .get(
        `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`
      )
      .then((result) => {
        //console.log(result);
        data = result.data.data;
        monthPrays();
        thisDay();
        initializeClock("clockdiv", deadline);
        todayallprays();
        

      });
    //console.log(latitude);
    //console.log(longitude);
  });
}
main();
function monthPrays()
{
  let table = document.querySelector(".table");
 
  //console.log(data);
  
  table.innerHTML = `<tr class="row-title">
  
                        <td>${data[thisday].date.gregorian.month.en}</td>
                        <td>${data[thisday].date.hijri.month.en}</td>
                        <td>Day</td>
                        <td>Fajr</td>
                        <td>Sunrise </td>
                        <td>Dhuhr</td>
                        <td>Asr</td>
                        <td>Maghrib</td>
                        <td>Isha</td>
                    </tr>`;

  for (const [index, day] of data.entries()) {
    table.innerHTML += `
                        <tr class="row-body">
                        <td>${index + 1}</td>
                        <td>${day.date.hijri.day}</td>
                        <td>${day.date.gregorian.weekday.en}</td>
                        <td>${day.timings.Fajr.split(" ")[0]} AM</td>
                        <td>${day.timings.Sunrise.split(" ")[0]} AM</td>
                        <td>${day.timings.Dhuhr.split(" ")[0]} PM</td>
                        <td>${day.timings.Asr.split(" ")[0]} PM</td>
                        <td>${day.timings.Maghrib.split(" ")[0]} PM</td>
                        <td>${day.timings.Isha.split(" ")[0]} PM</td>
                    </tr>
                        `;
  }
}

function thisDay()
{
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  
  
  
  let nextPray = data[parseInt(thisday)].timings;
  console.log(nextPray)
  for (let propertyName in nextPray) {
    let x = nextPray[propertyName].split(' ')[0]
    const [hours2, minutes2] = x.split(":");
    const totalMinutes1 = currentHours * 60 + currentMinutes;
    const totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2);
    const difference = totalMinutes2 - totalMinutes1;
    if (difference > 0) {
      console.log(nextPray[propertyName]);
      console.log(difference)
      deadline = new Date(Date.parse(new Date()) + difference * 60 * 1000);
      document.querySelector(".upcomingPrayerName").innerHTML = propertyName;
      console.log(deadline);
      break; 
    }
    //console.log(`${propertyName}: ${nextPray[propertyName].split(' ')[0]}`);
  }
  //console.log(thisday)
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    total: t,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function todayallprays()
{

  //console.log(thisday)
  document.querySelector(
    ".todayPrayersContainer"
  ).innerHTML = `<div class="large-2 medium-2 small-2 columns todayPrayer">
                    <div class="todayPrayerNameContainer"><span class="todayPrayerName">Fajr</span></div>
                    <div class="todayPrayerDetailContainer"><span class="todayPrayerTime"> ${
                      data[thisday].timings.Fajr.split(" ")[0]
                    } AM</span></div>
                </div>
                <div class="large-2 medium-2 small-2 columns todayPrayer">
                    <div class="todayPrayerNameContainer"><span class="todayPrayerName">Sunrise  </span></div>
                    <div class="todayPrayerDetailContainer"><span class="todayPrayerTime">${
                      data[thisday].timings.Sunrise.split(" ")[0]
                    } AM</span></div>
                </div>
                <div class="large-2 medium-2 small-2 columns todayPrayer">
                    <div class="todayPrayerNameContainer"><span class="todayPrayerName">Dhuhr</span></div>
                    <div class="todayPrayerDetailContainer"><span class="todayPrayerTime">${
                      data[thisday].timings.Dhuhr.split(" ")[0]
                    } PM</span></div>
                </div>
                <div class="large-2 medium-2 small-2 columns todayPrayer">
                    <div class="todayPrayerNameContainer"><span class="todayPrayerName">Asr</span></div>
                    <div class="todayPrayerDetailContainer"><span class="todayPrayerTime">${
                      data[thisday].timings.Asr.split(" ")[0]
                    } PM</span></div>
                </div>
                <div class="large-2 medium-2 small-2 columns todayPrayer">
                    <div class="todayPrayerNameContainer"><span class="todayPrayerName">Maghrib</span></div>
                    <div class="todayPrayerDetailContainer"><span class="todayPrayerTime">${
                      data[thisday].timings.Maghrib.split(" ")[0]
                    } PM</span></div>
                </div>
                <div class="large-2 medium-2 small-2 columns todayPrayer">
                    <div class="todayPrayerNameContainer"><span class="todayPrayerName">Isha</span></div>
                    <div class="todayPrayerDetailContainer"><span class="todayPrayerTime">${
                      data[thisday].timings.Isha.split(" ")[0]
                    } PM</span></div>
                </div>`;
  
  document.querySelector(".dateToday").innerHTML =
    data[thisday].date.hijri.day +
    " " +
    data[thisday].date.hijri.month.en +
    ", " +
    data[thisday].date.hijri.year;
  
  document.querySelector("#gregorianMonth").innerHTML =
    data[thisday].date.gregorian.month.en + " " + 
    data[thisday].date.gregorian.year;
  
  document.querySelector(".zero-margin").innerHTML =
    data[thisday].date.hijri.month.en + " " + data[thisday].date.hijri.year;
}




$(document).ready(function () {
  $(".trigger-preferences").click(function () {
    var juristicMethod = $("#preferenceJuristicMethod").val();
    var calculationMethod = $("#preferenceCalculationMethod").val();

    console.log("Selected juristic method: " + juristicMethod);
    console.log("Selected calculation method: " + calculationMethod);
    //main(calculationMethod, juristicMethod);
    // Perform any actions that you need with the selected values
  });
});
