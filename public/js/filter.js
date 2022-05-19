async function filterStations(params = {}) {
  const STATIONS = await fetchStation();
  console.log(STATIONS[0]);
  if (!STATIONS.length) return false;
  if (!params) return STATIONS;
  const { numOfStations, kilowatts, power, status } = params;
  const filteredStations = STATIONS.filter((STATION) => {
    const { stations } = STATION;
    let pass = true;
    if (numOfStations && numOfStations > stations.length) pass = false;
    const stationData = getStationInnerData(stations);
    if (kilowatts && !stationData.kilowatts.includes(kilowatts)) pass = false;
    if (power && !stationData.power.includes(power)) pass = false;
    if (status && !stationData.status.includes(status)) pass = false;
    return pass;
  });
  console.log(toLatLng(filteredStations));
  return toLatLng(filteredStations);
}

async function searchStations(query = "") {
  if (!query) return false;
  const STATIONS = await fetchStation();
  const filteredStations = STATIONS.filter((station) => {
    const { name, address } = station;
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

function getStationInnerData(stations) {
  data = { connector: [], kilowatts: [], power: [], status: [] };
  stations.forEach((station) => {
    station.outlets.forEach((outlet) => {
      for (const key of Object.keys(data)) {
        data[key].push(outlet[key]);
      }
    });
  });
  return data;
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
        const { connector, kilowatts, power, status } = outlet;
        connectorSet.add(connector);
        kilowattsSet.add(kilowatts);
        powerSet.add(power);
        statusSet.add(status);
      });
    });
  });
  // console.log({ connectorSet, kilowattsSet, powerSet, statusSet });
}

let filteredStations = filterStations({ numOfStations: 8 });
// populateStations(filteredStations, map);
