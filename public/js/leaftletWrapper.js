const L = require("leaflet");

function initMap() {
	const map = L.map('map', { scrollWheelZoom: false });
	map.setView([47.70, 13.35], 7)
	
}