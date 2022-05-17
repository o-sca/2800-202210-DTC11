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
}

function populateStations(object, map) {
    for (let i = 0; i < object.records.length; i++) {
        let lng = object.records[i].fields.geom.coordinates[0];
        let lat = object.records[i].fields.geom.coordinates[1];
        let option = {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.9,
            radius: 25
        }

        circle(lat, lng, map, option);
    }
};

(async () => {
  let location = await getUserLocation();
  let map = createMap(location);

  var popup = L.popup();

  marker(location.lat, location.lng, map); // User's current location

  populateStations(sampleData, map)

  map.on("click", (e) => {
    // if (round(e.latlng.lng) == round(user._latlng.lng) && round(e.latlng.lat) == round(user._latlng.lat)) {
    //     console.log('You are here!')
    // }

    popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
  });
})();


const sampleData = {
  nhits: 33,
  parameters: {
    dataset: "electric-vehicle-charging-stations",
    rows: 10,
    start: 0,
    facet: ["geom"],
    format: "json",
    timezone: "UTC",
  },
  records: [
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "8bc2a3d5072f6336874b640337012c6af4936e02",
      fields: {
        geom: { coordinates: [-123.142173, 49.283155], type: "Point" },
        lot_operator: "Easy Park / Park Board",
        address: "Beach Ave. @ Cardero St",
        geo_local_area: "West End",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "ee2cd2e69d2193bcafb0bd5dbf661335c8dffae1",
      fields: {
        geom: { coordinates: [-123.1002054, 49.2641594], type: "Point" },
        lot_operator: "Easypark",
        address: "1 Kingsway",
        geo_local_area: "Mount Pleasant",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "60806249414b259ad2f03943827602c64d64cdd7",
      fields: {
        geom: { coordinates: [-123.106578, 49.243665], type: "Point" },
        lot_operator: "Park Board",
        address: "4575 Clancy Loranger Way",
        geo_local_area: "Riley Park",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "32340441b6c19e10f03bbd0fe90169ec587a5918",
      fields: {
        geom: { coordinates: [-123.13022, 49.299534], type: "Point" },
        lot_operator: "Vancouver Aquarium",
        address: "845 Avison Way",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "e02629f07f37a2a04dace813119a2279a9e1e839",
      fields: {
        geom: {
          coordinates: [-123.100095218575, 49.222235022762],
          type: "Point",
        },
        lot_operator: "City of Vancouver",
        address: "273 E 53rd Ave",
        geo_local_area: "Sunset",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "abf78707680e4ffe8d3b6e5f56820c5d74519552",
      fields: {
        geom: { coordinates: [-123.033786, 49.281369], type: "Point" },
        lot_operator: "City of Vancouver",
        address: "3311 E. Hastings",
        geo_local_area: "Hastings-Sunrise",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "0441873e84b177afbec4e9725521eb0c549e9e8a",
      fields: {
        geom: {
          coordinates: [-123.119261061127, 49.2769232201811],
          type: "Point",
        },
        lot_operator: "City of Vancouver",
        address: "959-979 Mainland St",
        geo_local_area: "Downtown",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "e86a2ade293860700f966c1ff783fbe8c384b4d7",
      fields: {
        geom: { coordinates: [-123.12833, 49.272514], type: "Point" },
        lot_operator: "City of Vancouver",
        address: "451 Beach Crescent",
        geo_local_area: "Downtown",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "6b0bb500f950bcb2489c4d6da17a1315dc5b24e8",
      fields: {
        geom: {
          coordinates: [-123.09135336453, 49.229928611422],
          type: "Point",
        },
        lot_operator: "City of Vancouver",
        address: "646 E. 44th Ave",
        geo_local_area: "Sunset",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
    {
      datasetid: "electric-vehicle-charging-stations",
      recordid: "873ba4e31a2b68803b0289c438021e9f39c24baa",
      fields: {
        geom: { coordinates: [-123.09247, 49.2745], type: "Point" },
        lot_operator: "City of Vancouver",
        address: "Trillium Park",
        geo_local_area: "Strathcona",
      },
      record_timestamp: "2021-06-21T10:33:01.904Z",
    },
  ],
};
