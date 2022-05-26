// return a list of station objects filtered according to paramaters
async function filterStations(params = {}) {
  const STATIONS = await fetchStation();
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
      !address.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });
  return filteredStations;
}

// convert list of station objects to list of {Lat, Lng}
function toLatLng(stations) {
  return stations.map((station) => {
    return { lat: station.lat, lng: station.lng };
  });
}

// return array of value for each type of field within stations' outlets
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

// return station availability as ratio
function getAvailability(statusList) {
  let avail = 0;
  statusList.forEach((status) => {
    if (status === "AVAILABLE") avail++;
  });
  return avail / statusList.length;
}

// get entire range of values that exist in database of stations
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

// get the values for each filter/serach paramater in app and filter stations with 'em
async function filter() {
  const paramsAll = {
    searchTerm: $("#searchTerm").val().toLowerCase(),
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
  const filteredStations = await filterStations(params);
  populateStations(filteredStations, map);
}

// change values displayed as slider moves
function updateSliderDisplayValue() {
  $("#nos-slider-val").text($("#num_of_stations_slider").val());
  $("#kw-slider-val").text($("#kilowatts_slider").val());
}

// return all filter/search values to default
function resetFilters() {
  $("#searchTerm").val("");
  $("#num_of_stations_slider").val(1);
  $("#filter_connector").val(0);
  $("#kilowatts_slider").val(1);
  $("#filter_power").val(0);
  $("#filter_status").val(0);
  updateSliderDisplayValue();
  filter();
}
