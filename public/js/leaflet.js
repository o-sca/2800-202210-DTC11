function createMap(object) {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL, { attribution });

    var map = L.map('map').setView([object.lat, object.lng], 13)

    tiles.addTo(map);
    return map;
};

async function getUserLocation() {
    return new Promise(async (resolve, reject) => {
        if (!navigator.geolocation) return reject(false); // Geolocation not supported;
        navigator.geolocation.getCurrentPosition(function (showPosition) {
            return resolve({
                lat: showPosition.coords.latitude,
                lng: showPosition.coords.longitude
            });
        });
    });
};

function userMarker (object, map) {
    const userMarker = L.marker([object.lat, object.lng]).addTo(map);
    return userMarker;
};

function round(number) {
    return Math.round(number * 1000) / 1000;
};

(async () => {
    let location = await getUserLocation();
    let map = createMap(location);
    
    let user = userMarker(location, map);

    map.on('click', e => {
        if (round(e.latlng.lng) == round(user._latlng.lng)) {
            console.log('You are here!')
        }
    });


})();

class Leaflet {
    createMap() {
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileURL, { attribution });

        this.map = L.map('map').setView([this.lat, this.long], 13)
        tiles.addTo(map);
    };

    async getUserLocation() {
        return new Promise(async (resolve, reject) => {
            if (!navigator.geolocation) return reject(false); // Geolocation not supported;
            navigator.geolocation.getCurrentPosition(function (showPosition) {
                this.lat = showPosition.coords.latitude,
                this.long = showPosition.coords.longitude
                return resolve();
            });
        });
    };

    userMarker() {
        return L.marker([this.lat, this.long]).addTo(this.map)
    };

};

// (async () => {
//     const leaflet = new Leaflet();
    
//     await leaflet.getUserLocation();
//     leaflet.createMap();

// })();