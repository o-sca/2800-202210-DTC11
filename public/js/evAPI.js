async function fetchVanData() {
    const response = await fetch('https://opendata.vancouver.ca/api/records/1.0/search/?dataset=electric-vehicle-charging-stations&q=&rows=33&facet=geom', {
        method: "GET"
    })
    const data = await response.json();
    
    var tempArray = [];

    for (let i = 0; i < data.records.length; i++) {
        let address = data.records[i].fields.address;
        let lng = data.records[i].fields.geom.coordinates[0];
        let lat = data.records[i].fields.geom.coordinates[1];
        
        tempArray.push({
            address: address,
            lng: lng,
            lat: lat
        })
    };
    return tempArray;
};

async function fetchStation(id = '') {
    const response = await fetch(`https://ezev-api.herokuapp.com/api/ev/${id}`, {
        method: "GET",
        mode: 'cors',
    });
    const results = await response.json();
    if (results.status !== true) return results.data;
    return results.data;
};

async function getUserStatus() {
    const response = await fetch(`/userStatus`, {
        method: "GET"
    });
    return await response.json();
};

async function updateSavedStation(stationID, userID, method) {
    const url = method === 1 ? `/insertSavedStation` : `/removeSavedStation`;
    const response = await fetch(url, {
        method: "POST",
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stationID: stationID, userID: userID })
    })
    return await response.json();
};

async function fetchSavedStations(userID) {
    const response = await fetch(`/fetchSavedStations/${userID}`, {
        method: "GET"
    })
    let responseJSON = await response.json();
    if (!responseJSON.status) return; // No saved stations
    const parsedStations = responseJSON.data.map(station => { return station.stationID });
    return parsedStations;
};

async function insertViewed(userID, stationID, stationName) {
    const response = await fetch(`/insertViewedStation`, {
        method: "POST",
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stationID: stationID, userID: userID, stationName: stationName })
    })
    return await response.json();
}