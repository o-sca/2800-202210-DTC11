async function filterStations(params = {}) {
  let filteredStations = await fetchStation();
  if (!filteredStations.length) return false;
  if (!params) return filteredStations;
  console.log(filteredStations[0]);
  const { stationsCount, kilowatts, power, status } = params;
  filteredStations = filteredStations.filter((station) => {
    let { address, lat, lng, stations } = station;
    let pass = true;
    if (stationsCount && stationsCount > stations.length) pass = false;
    return pass;
  });
  coords = filteredStations.map((station) => {
    return { lat: station.lat, lng: station.lng };
  });
  console.log(coords);
  return filteredStations;
}

// function filterBy

let filteredStations = filterStations({ stationsCount: 6 });
// populateStations(data, map);
