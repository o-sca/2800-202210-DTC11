function createMap(object) {
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileURL, { attribution });

  var map = L.map("map").setView([object.lat, object.lng], 13);

  tiles.addTo(map);
  return map;
}

async function getUserLocation() {
  return new Promise(async (resolve, reject) => {
    if (!navigator.geolocation) return reject(false); // Geolocation not supported;
    navigator.geolocation.getCurrentPosition(function (showPosition) {
      return resolve({
        lat: showPosition.coords.latitude,
        lng: showPosition.coords.longitude,
      });
    });
  });
}

function circle(lat, lng, map, option) {
  return L.circle([lat, lng], {
    color: option === undefined ? "red" : option.color,
    fillColor: option === undefined ? "#f03" : option.fillColor,
    fillOpacity: option === undefined ? 0.5 : option.fillOpacity,
    radius: option === undefined ? 500 : option.radius,
  }).addTo(map);
}

function locationIcon(lat, lng, map) {
  // Custom Icon Classes
  var locationIcon = L.Icon.extend({
    options: {
      iconSize: [20, 25],
    },
  });

  var icon = new locationIcon({
    iconUrl: "../imgs/arrow-icon.png",
  });

  return L.marker([lat, lng], { icon: icon })
    .addTo(map)
    .bindPopup(`<div onclick="console.log(1)">Clickme</div>`);
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function createMarker(lat, lng, layer) {
  return L.marker([lat, lng]).addTo(layer);
}

const markersLayer = new L.LayerGroup();

async function populateStations(arr, map) {
  const userObject = await getUserStatus();
  const savedStations = await fetchSavedStations(userObject.userID);

  markersLayer.clearLayers();

  for (let i = 0; i < arr.length; i++) {
    const name = arr[i].name;
    const address = arr[i].address;
    const id = arr[i].id;
    const outletDiv = appendStations(arr[i].stations);
    const savedStatus = savedStations.includes(id) ? `Remove` : `Save`

    var stationInfo = `
    <div class="stations">
      <div class="station-header">
        <div class="station-header-text">
        <b>${name}</b>
        <p>${address}</p>
        </div>
        <button class="save-button" onclick="saveStation('${id}', '${savedStatus}')">${savedStatus}</button>
      </div>
      <div class="station-container">
      ${outletDiv}
      </div>
    </div>`;

    createMarker(arr[i].lat, arr[i].lng, markersLayer).bindPopup(stationInfo);
  }
  map.addLayer(markersLayer);
};

function appendStations(stations) {
  var stnArr = [];
  stations.forEach((station) => {
    stnArr.push(`
      <div class="outlets" id="${station.outlets[0].id}">
        <p class="outlet-id">Outlet: ${station.outlets[0].id}</p>
        <p class="kilowatts">KWh: ${station.outlets[0].kilowatts}</p>
        <p class="power">Power: ${station.outlets[0].power}</p>
        <p class="status">Status: ${station.outlets[0].status}</p>
      </div>
    `);
  });
  return stnArr.join(" ");
};

async function saveStation(stationID, status) {
  const userObject = await getUserStatus();
  if (!userObject.isLoggedIn) return alert(`Only registered / logged in users can access this feature.`);
  const method = status.toLowerCase() === 'save' ? 1 : 0;
  return await updateSavedStation(stationID, userObject.userID, method);
};

function createRainbowOverlay(map) {
  const overlay = L.imageOverlay.rotated(
    "./imgs/rainbow_flipped.png",
    L.latLng(49.323145, -123.100153),
    L.latLng(49.250687, -123.003881),
    L.latLng(49.283443, -123.115244),
    {
      opacity: 0.5,
      interactive: true,
      attribution: "You'll never get me lucky charms!",
    }
  );
  return overlay;
}

function addRainbowToMap(map, overlay, draw) {
  if (draw) {
    overlay.addTo(map);
    map.setView([49.270056, -123.061295], 12);
  } else {
    overlay.remove();
  }
}

async function load() {
  let location = await getUserLocation();
  map = createMap(location);

  locationIcon(location.lat, location.lng, map); // User's current location

  const stationsArray = await fetchStation();
  await populateStations(stationsArray, map);

  // map.on("click", (e) => {});

  let overlay = createRainbowOverlay(map);
  let footerCount = 0;
  $(".copyright").on("click", () => {
    footerCount++;
    if (footerCount == 3) addRainbowToMap(map, overlay, true);
    if (footerCount > 3) {
      footerCount = 0;
      addRainbowToMap(map, overlay, false);
    }
    return map;
  });
}


load();