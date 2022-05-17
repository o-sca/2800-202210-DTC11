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
