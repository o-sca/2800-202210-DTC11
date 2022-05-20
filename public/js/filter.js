async function filterStations(params = {}) {
  const STATIONS = await fetchStation();
  // console.log(STATIONS[0]);
  if (!STATIONS.length) return false;
  if (!params) return STATIONS;
  const { numOfStations, kilowatts, power, status, availability, searchTerm } =
    params;
  const filteredStations = STATIONS.filter((STATION) => {
    const { name, address, stations } = STATION;
    const stationData = getStationInnerData(stations);
    // console.log(stationData);
    if (numOfStations && numOfStations > stations.length) return false;
    if (kilowatts && kilowatts > Math.max(stationData.kilowatts)) return false;
    if (power && !stationData.power.includes(power)) return false;
    if (status && !stationData.status.includes(status)) return false;
    if (availability && availability > getAvailability(stationData.status))
      return false;
    if (
      searchTerm &&
      (!name.includes(searchTerm) || !address.includes(searchTerm))
    )
      return false;
    return true;
  });
  // console.log(toLatLng(filteredStations));
  // return toLatLng(filteredStations);
  return filteredStations;
}

async function searchStations(query = "") {
  if (!query) return false;
  const STATIONS = await fetchStation();
  const filteredStations = STATIONS.filter((station) => {
    const { name, address } = station;
    if (name.includes(capitaliseFirstLetter(query)) || address.includes(capitaliseFirstLetter(query))) return true;
  });
  return filteredStations;
  // return toLatLng(filteredStations);
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
      for (let key of Object.keys(data)) {
        if (outlet[key] && !isNaN(outlet[key])) {
          data[key].push(parseFloat(outlet[key]));
        } else if (outlet[key]) {
          data[key].push(outlet[key]);
        }
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
  return { connectorSet, kilowattsSet, powerSet, statusSet };
}

async function filter() {
  const paramsAll = {
    searchTerm: $("#searchTerm").val(),
    numOfStations: parseInt($("#num_of_stations_slider").val()),
    connector: parseInt($("#filter_power option:selected").val()),
    kilowatts: parseInt($("#kilowatts_slider").val()),
    power: parseInt($("#filter_power option:selected").val()),
    status: $("#filter_status").val(),
  };
  const params = {};
  for (const [key, value] of Object.entries(paramsAll)) {
    if (value) params[key] = value;
  }

  console.log({ params });
  const filteredStations = await filterStations(params);
  console.log({ filteredStations });
  populateStations(filteredStations, map);
}

function updateSliderDisplayValue() {
  $("#nos-slider-val").text($("#num_of_stations_slider").val());
  $("#kw-slider-val").text($("#kilowatts_slider").val());
}
function resetFilters() {
  console.log("Filters to be reset on next update :)");
}

function capitaliseFirstLetter(string) {
  return string[0].toUpperCase() + string.substring(1);
};