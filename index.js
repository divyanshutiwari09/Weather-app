/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */


function initMap() {
    const myLatlng = {
        lat: -25.363,
        lng: 131.044
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get weather status",
        position: myLatlng,
    });

    infoWindow.open(map);
    let searchbox = document.getElementById("i");
    let searchbtn = document.getElementById("b");


    searchbtn.addEventListener("click", async () => {



        const getinfo = async () => {
            let city = searchbox.value;
            searchbox.value = "";
            console.log(city);
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9edb6312359168be8798f054ac093f20`).then(response => response.json()).then(rsp => {
                let latit = rsp.coord.lat;
                let longit = rsp.coord.lon;

                let my = {
                    lat: latit,
                    lng: longit
                };
                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    position: my,
                });
                let humidity = rsp.main.humidity;

                let ws = rsp.wind.speed;
                let desc = rsp.weather[0].description;
                desc = desc.charAt(0).toUpperCase() + desc.slice(1);
                let code = rsp.weather[0].icon;
                let city = rsp.name;
                ip = rsp.main.temp;
                ip = ip - 273;

                infoWindow.setContent(
                    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <div class="container text-center" style="width:100%">
          <div class="main">
              <img src="http://openweathermap.org/img/w/${code}.png" alt="" class="mx-auto d-block " style="width: 100px; height:100px ;">
              <h3>${city}</h3>
              <h4>${desc}</h4>
              <h4>${ip.toFixed(2)}°C</h4>
          </div>
         <div class="d-flex flex-row justify-content-around mt-2">
          <div class="" style="width: 5rem;">
              <img class="float-left mt-3  d-inline" src="https://cdn-icons-png.flaticon.com/512/3262/3262966.png" style="width:30%"alt="Card image cap">
              <p class="mt-3 mr-3">${humidity}%</p>
              <div class="">
                <p class="text-left">Humidity</p>
              </div>
            </div>
            <div class="" style="width: 5rem;">
              <img class="float-left mt-3 ml-3 d-inline" src="https://cdn-icons-png.flaticon.com/512/3731/3731279.png "style="width:30%" alt="Card image cap">
              <p class="mt-3 ">${ws.toFixed(2)}</p>
              <div class="mr-0">
                <p class="text-right">Wind Speed</p>
              </div>
            </div>
          </div>
      </div>`
                );
                infoWindow.open(map);
            })
        }
        getinfo();
    })
    // Configure the click listener.
    map.addListener("click", async (mapsMouseEvent) => {
        // Close the current InfoWindow.
        let ip;
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        let lt = mapsMouseEvent.latLng.toJSON().lat;
        let long = mapsMouseEvent.latLng.toJSON().lng;
        const getip = async () => {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lt}&lon=${long}&appid=9edb6312359168be8798f054ac093f20`).then(response => response.json()).then(rsp => {
                let humidity = rsp.main.humidity;
                let ws = rsp.wind.speed;
                let desc = rsp.weather[0].description;
                desc = desc.charAt(0).toUpperCase() + desc.slice(1);
                let code = rsp.weather[0].icon;
                let city = rsp.name;
                ip = rsp.main.temp;
                ip = ip - 273;
                console.log(ip)
                infoWindow.setContent(
                    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <div class="container text-center" style="width:100%">
          <div class="main">
              <img src="http://openweathermap.org/img/w/${code}.png" alt="" class="mx-auto d-block " style="width: 100px; height:100px ;">
              <h3>${city}</h3>
              <h4>${desc}</h4>
              <h4>${ip.toFixed(2)}°C</h4>
          </div>
         <div class="d-flex flex-row justify-content-around mt-2">
          <div class="" style="width: 5rem;">
              <img class="float-left mt-3  d-inline" src="https://cdn-icons-png.flaticon.com/512/3262/3262966.png" style="width:30%"alt="Card image cap">
              <p class="mt-3 mr-3">${humidity}%</p>
              <div class="">
                <p class="text-left">Humidity</p>
              </div>
            </div>
            <div class="" style="width: 5rem;">
              <img class="float-left mt-3 ml-3 d-inline" src="https://cdn-icons-png.flaticon.com/512/3731/3731279.png "style="width:30%" alt="Card image cap">
              <p class="mt-3 ">${ws.toFixed(2)}</p>
              <div class="mr-0">
                <p class="text-right">Wind Speed</p>
              </div>
            </div>
          </div>
      </div>`
                );
                infoWindow.open(map);
            });
        }

        getip();
    });
}

window.initMap = initMap;
