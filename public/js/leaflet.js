function createMap(object) {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL, { attribution });

    var map = L.map('map').setView([object.lat, object.long], 13)
    var userMarker =  L.marker([object.lat, object.long]).addTo(map);

    tiles.addTo(map);
};

async function getUserLocation() {
    return new Promise(async (resolve, reject) => {
        if (!navigator.geolocation) return reject(false); // Geolocation not supported;
        navigator.geolocation.getCurrentPosition(function (showPosition) {
            return resolve({
                lat: showPosition.coords.latitude,
                long: showPosition.coords.longitude
            });
        });
    });
};

function userMarker() {
    return
};


(async () => {
    let response = await getUserLocation();
    if (response === false) return alert(`Please enable current locations`);
    createMap(response);
})();