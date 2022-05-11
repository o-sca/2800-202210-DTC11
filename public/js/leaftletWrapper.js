const L = require('leaflet');


class leafletWrapper {
    init() {
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1,
        }).addTo(map);
    }
};

module.exports = leafletWrapper;