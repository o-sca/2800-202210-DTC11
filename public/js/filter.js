async function filterStations(params = {}) {
  const STATIONS = await fetchStation();
  if (!STATIONS.length) return false;
  if (!params) return STATIONS;
  // console.log(filteredStations[0]);
  const { stationsCount, kilowatts, power, status } = params;
  filteredStations = STATIONS.filter((STATION) => {
    let { address, lat, lng, stations } = STATION;
    let pass = true;
    if (stationsCount && stationsCount > stations.length) pass = false;
    if (kilowatts)
      // stations.forEach;
      return pass;
  });
  console.log(toLatLng(filteredStations));
  return toLatLng(filteredStations);
}

async function searchStations(query = "") {
  if (!query) return false;
  const STATIONS = await fetchStation();
  filteredStations = STATIONS.filter((station) => {
    let { name, address } = station;
    if (name.includes(query) || address.includes(query)) return true;
  });
  // console.log(toLatLng(filteredStations));
  return toLatLng(filteredStations);
}

function toLatLng(stations) {
  return stations.map((station) => {
    return { lat: station.lat, lng: station.lng };
  });
}

function getBusy(stations) {
  let busyLevel = 0;
  stations.forEach((station) => {});
}

//TODO: sort by distance, busy status, number of

async function stationDataSets() {
  const STATIONS = await fetchStation();
  const connectorSet = new Set();
  const kilowattsSet = new Set();
  const powerSet = new Set();
  const statusSet = new Set();

  STATIONS.forEach((STATION) => {
    STATION.stations.forEach((station) => {
      station.outlets.forEach((outlet) => {
        let { connector, kilowatts, power, status } = outlet;
        connectorSet.add(connector);
        kilowattsSet.add(kilowatts);
        powerSet.add(power);
        statusSet.add(status);
      });
    });
  });
  console.log({ connectorSet, kilowattsSet, powerSet, statusSet });
}

let filteredStations = filterStations({ stationsCount: 8 });
// populateStations(filteredStations, map);
