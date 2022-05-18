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

function marker(lat, lng, map) {
  return L.marker([lat, lng]).addTo(map);
}

function circle(lat, lng, map, option) {
  return L.circle([lat, lng], {
    color: option === undefined ? "red" : option.color,
    fillColor: option === undefined ? "#f03" : option.fillColor,
    fillOpacity: option === undefined ? 0.5 : option.fillOpacity,
    radius: option === undefined ? 500 : option.radius,
  }).addTo(map);
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function populateStations(object, map) {
  for (let i = 0; i < object.records.length; i++) {
    let lng = object.records[i].fields.geom.coordinates[0];
    let lat = object.records[i].fields.geom.coordinates[1];
    let option = {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.9,
      radius: 25,
    };
    circle(lat, lng, map, option);
  }
}

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
}
function drawRainbow(map, overlay, draw) {
  if (draw) {
    overlay.addTo(map);
    map.setView([49.270056, -123.061295], 12);
  } else {
    overlay.remove();
  }
}

(async () => {
  let location = await getUserLocation();
  let map = createMap(location);

  var popup = L.popup();

  marker(location.lat, location.lng, map); // User's current location

  console.log(await fetchVanData());
  // populateStations(sampleData, map)

  map.on("click", (e) => {
    popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
  });

  let overlay = createRainbow(map);
  let footerCount = 0;
  $(".copyright").on("click", () => {
    footerCount++;
    console.log({ footerCount });
    if (footerCount == 3) drawRainbow(map, overlay, true);
    if (footerCount > 3) {
      footerCount = 0;
      drawRainbow(map, overlay, false);
    }
  });
})();
