async function fetchVanData() {
    const response = await fetch('https://opendata.vancouver.ca/api/records/1.0/search/?dataset=electric-vehicle-charging-stations&q=&rows=33&facet=geom', {
        method: "GET"
    })
    const data = await response.json();
    return data
};
