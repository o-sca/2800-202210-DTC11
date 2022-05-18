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
        color: option === undefined ? 'red' : option.color,
        fillColor: option === undefined ? '#f03' : option.fillColor,
        fillOpacity: option === undefined ? 0.5 : option.fillOpacity,
        radius: option === undefined ? 500 : option.radius
    }).addTo(map);
};

function round(number) {
  return Math.round(number * 1000) / 1000;
};

function populateStations(arr, map) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
      let option = {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.9,
          radius: 25
      }
      circle(arr[i].lat, arr[i].lng, map, option);
  }
};

(async () => {
  let location = await getUserLocation();
  let map = createMap(location);

  var popup = L.popup();

  marker(location.lat, location.lng, map); // User's current location


  const data = await fetchStation(160931);
  console.log(data)
  // populateStations(data, map);

  map.on("click", (e) => {
    popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
  });
})();