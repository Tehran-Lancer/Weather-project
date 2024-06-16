var getloc = async () => {
  var url ="http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone";
  var response = await fetch(url);
  var data = await response.json();
  return data;
};
var getweather = async (lat, lon) => {
  api = "78b1d4061365b72eab7d8d72d75b2b02";
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
  var response1 = await fetch(url);
  var data1 = await response1.json();

  return data1;
};
function getday() {
  var day_night;
  var d = new Date();
  if (d.getHours() >= 6 && d.getHours() <= 19) {
    day_night = "Day";
  } else {
    day_night = "Night";
  }
  return day_night;
}
function geticon(name) {
  var icon;
  switch (name) {
    case "Thunderstorm":
      icon = `${name}.svg`;
      break;
    case "Drizzle":
      icon = `${name}.svg`;
      break;
    case "Rain":
      icon = `${name}.svg`;
      break;
    case "Snow":
      icon = `${name}.svg`;
      break;
    case "Clear":
      var DayOrNigh = getday();
      icon = `${name}-${DayOrNigh}.svg`;
      break;
    case "Clouds":
      icon = `${name}.svg`;
      break;
    case "Atmosphere":
      icon = `${name}.png`;
      break;
  }
  return icon;
}
function gettemp(temp) {
  var k = temp;
  //کِلوین
  var f = ((k - 273.15) * 9) / 5 + 32;
  //فارنهایت
  var c = k - 273.15;
  return (temp = {
    kel: Math.floor(k),
    far: Math.floor(f),
    can: Math.floor(c),
  });
}
var loti = document.querySelector(".time1");
var icon3 = document.querySelector(".icon");
var dese = document.querySelector(".deg-sec");
var deg = document.querySelector(".deg-sec h2");
var sc = document.querySelector(".deg-sec span");
var tede = document.querySelector(".tem-des");
getloc()
  .then((locdata) => {
    console.log(locdata);
    var time2 = locdata.timezone;
    console.log(time2);
    loti.textContent = time2;
    return getweather(locdata.lat, locdata.lon);
  })
  .then((wedata) => {
    console.log(wedata);
    var wetemp = wedata.main.temp;
    var wemain = wedata.weather[0].main;
    var wedes = wedata.weather[0].description;
    // console.log(wetemp , wemain , wedes)
    var iconName = geticon(wemain);
    icon3.innerHTML = `<img src='icons/${iconName}'></img>`;

    deg.textContent = Math.floor(wetemp);
    sc.textContent = "K";

    dese.addEventListener("click", function (e) {
      if (sc.textContent == "K") {
        deg.textContent = gettemp(wetemp).far;
        sc.textContent = "F";
      } else if (sc.textContent == "F") {
        deg.textContent = gettemp(wetemp).can;
        sc.textContent = "C";
      } else {
        deg.textContent = gettemp(wetemp).kel;
        sc.textContent = "K";
      }
    });
    tede.textContent = wedes;
  });
