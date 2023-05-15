//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
    function style(feature) {
        return {
            fillColor: getcolor(feature.geometry.coordinates[2]),
            radius: getradius(feature.properties.mag), 
            weight: 0.5, 
            fillOpacity: 1
        };
    }

    function getcolor(depth) {

        if (depth > 90) {
            return "#ea2c2c";
        }

        if (depth > 70) {
            return "#ea822c";
        }


        if (depth > 50) {
            return "#ea822c";
        }

        if (depth > 30) {
            return "#ea822c";
        }

        if (depth > 10) {
            return "#ea822c";
        }

        return "#98ee00";

    }

    function getradius(mag) {
        if (mag === 0) {
            return 1;
        }

        return mag * 4;

    }

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);

        },
        style: style,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap); 

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 30, 50, 70, 90],
        labels = ["#98ee00", "#ea822c", "#ea822c", "#ea822c", "#ea822c", "#ea2c2c"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getcolor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
})



