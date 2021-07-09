const axios = require('axios')
const config = require('./config.js');

axios.interceptors.request.use(function (config) {
  // console.log(config)
  return config
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init(){
  var loginAuth = "Basic "+config.loginBTOA
  login(loginAuth).then(() => {
    // getAirports()
    loadAirlines()
  })
};

var airports = []
function getAirports() {
  axios.get("https://www.airline-club.com/airports").then(res => {
    var data = res.data
    data.forEach(e => {
      airports[e.iata] = e
    });
    console.log("Airports loaded")
  })
}
var cookie
function login(loginAuth){
  return new Promise(function(resolve, reject) {
    axios.post("https://www.airline-club.com/login", {}, {
      headers: {"Authorization": loginAuth}
    }).then(res => {
      cookie = res.headers["set-cookie"][0]
      console.log("Login successful")
      resolve()
    }).catch(err => {
      console.log("Login failed" + err)
      reject()
    })
  });
}

var airlines = []
function loadAirlines(){
  return new Promise(function(resolve, reject) {
    axios.get("https://www.airline-club.com/airlines", {
      headers: {"Cookie": cookie}
    }).then(res => {
      res.data.forEach(e => {
        airlines[e.id] = e
      });
      console.log("Airlines loaded")
      resolve(airlines)
    }).catch(err => {
      console.log(err)
      reject()
    })
  });
}
function updateAirlines(){
  airlines = []
  return loadAirlines()
}

module.exports = {
  init: init,
  updateAirlines: updateAirlines,
  cookie: cookie,
  airports: airports,
  airlines: airlines
}
