const leaflet = require('leaflet');


class leafletWrapper {
    init() {
        return leaflet.map('map').setView([51.105, -0.09], 13)
    }
}


module.exports = leafletWrapper;