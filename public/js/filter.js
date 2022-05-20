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
  return toLatLng(filteredStations);
}

async function searchStations(query = "") {
  if (!query) return false;
  const STATIONS = await fetchStation();
  const filteredStations = STATIONS.filter((station) => {
    const { name, address } = station;
    if (name.includes(query) || address.includes(query)) return true;
  });
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
  let p = {
    searchTerm: $("#searchTerm").val(),
    connector: parseInt($("#filter_power option:selected").val()),
    kilowatts: parseInt($("#kilowatts_range").val()),
    power: parseInt($("#filter_power option:selected").val()),
    status: $("#filter_status").val(),
  };

  let params = {};
  for (const [key, value] of Object.entries(p)) {
    console.log(`${key}: ${value}`);
    if (value) params[key] = value;
  }

  console.log({ params });
  let filteredStations = await filterStations(params);
  populateStations(filteredStations, map);
}

function updateSliderDisplayValue() {
  $("#kw-slider-val").text($("#kilowatts_range").val());
}
