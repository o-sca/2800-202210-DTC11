function createMap(object) {
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileURL, { attribution });

  var map = L.map("map").setView([object.lat, object.lng], 13);

  tiles.addTo(map);
  return map;
};

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
};

function marker(lat, lng, map) {
  return L.marker([lat, lng]).addTo(map);
};

function circle(lat, lng, map, option) {
  return L.circle([lat, lng], {
    color: option === undefined ? "red" : option.color,
    fillColor: option === undefined ? "#f03" : option.fillColor,
    fillOpacity: option === undefined ? 0.5 : option.fillOpacity,
    radius: option === undefined ? 500 : option.radius,
  }).addTo(map);
};

function locationIcon(lat, lng, map) {
  // Custom Icon Classes
  var locationIcon = L.Icon.extend({
    options: {
      iconSize: [20, 25],
  }})

  var icon = new locationIcon({
    iconUrl: '../imgs/arrow-icon.png'
  })
  
  return L.marker([lat, lng], { icon: icon }).addTo(map).bindPopup(`<div onclick="console.log(1)">Clickme</div>`)
};

function round(number) {
  return Math.round(number * 1000) / 1000;
};

function populateStations(arr, map) {
  for (let i = 0; i < arr.length; i++) {
    const name = arr[i].name;
    const address = arr[i].address;
    const id = arr[i].id;

    marker(arr[i].lat, arr[i].lng, map)
      .bindPopup(`
        <div class="populateStation" style="cursor:pointer">
          <b>${name}</b>
          <p>${address}</p>
          <button onclick="saveStation('${id}')">Save</button>
        </div>`);
  }
};

function saveStation(id) {
  console.log(id)
};

function createRainbow(map) {
  // N.Van, BBY, DTC
  const bottomleft = L.latLng(49.323145, -123.100153),
    topright = L.latLng(49.250687, -123.003881),
    topleft = L.latLng(49.283443, -123.115244);

  let overlay = L.imageOverlay.rotated(
    "./imgs/rainbow_flipped.png",
    topleft,
    topright,
    bottomleft,
    {
      opacity: 0.5,
      interactive: true,
      attribution: "You'll never get me lucky charms!",
    }
  );
  return overlay;
};

function drawRainbow(map, overlay, draw) {
  if (draw) {
    overlay.addTo(map);
    map.setView([49.270056, -123.061295], 12);
  } else {
    overlay.remove();
  }
};

map = (async () => {
  let location = await getUserLocation();
  let map = createMap(location);

  locationIcon(location.lat, location.lng, map); // User's current location

  const data = await fetchStation();
  populateStations(data, map);

  map.on("click", (e) => {});

  let overlay = createRainbow(map);
  let footerCount = 0;
  $(".copyright").on("click", () => {
    footerCount++;
    if (footerCount == 3) drawRainbow(map, overlay, true);
    if (footerCount > 3) {
      footerCount = 0;
      drawRainbow(map, overlay, false);
    }
    return map;
  });
})();
