async function filterStations(params = {}) {
  const STATIONS = await fetchStation();
  // console.log(STATIONS[0]);
  if (!STATIONS) return false;
  if (!params) return STATIONS;
  const { numOfStations, kilowatts, power, status, availability, search } =
    params;
  const filteredStations = STATIONS.filter((STATION) => {
    const { name, address, stations } = STATION;
    const stationData = getStationInnerData(stations);
    if (numOfStations && numOfStations > stations.length) return false;
    if (kilowatts && !stationData.kilowatts.includes(kilowatts)) return false;
    if (power && !stationData.power.includes(power)) return false;
    if (status && !stationData.status.includes(status)) return false;
    if (availability && availability > getAvailability(stationData.status))
      return false;
    if (search && !(name.includes(search) || !address.includes(search)))
      return false;
    return true;
  });
  // console.log(toLatLng(filteredStations));
  return toLatLng(filteredStations);
}

// async function searchStations(query = "") {
//   if (!query) return false;
//   const STATIONS = await fetchStation();
//   const filteredStations = STATIONS.filter((station) => {
//     const { name, address } = station;
//     if (name.includes(query) || address.includes(query)) return true;
//   });
//   console.log(toLatLng(filteredStations));
//   return toLatLng(filteredStations);
// }

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

function getAvailability(statusList) {
  let avail = 0;
  statusList.forEach((status) => {
    if (status === "AVAILABLE") avail++;
  });
  return avail / statusList.length;
}

//TODO: sort by distance from user, busy status

// get all the possible values for various keys in a station object
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

testParams = {
  numOfStations: 6,
  availability: 0.25,
  search: "Burnaby",
};
async function populateFilteredStations(params) {
  // get vlues of filter fields and serach bar

  let stations = await filterStations(params);
  populateStations(stations, map);
}

function setup() {
  $("select").change(searchEvent);
}
$(document).ready(setup);
