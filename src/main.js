var map, bikePointsMarkers, stopPointsMarkers;



function drdwnSetter() {
    var bikeValue = 10;
    this.bikeValue = function(amount) {
        if (!arguments.length) return bikeValue;
        bikeValue = amount;
    };

    var stopPointsValue = 10;
    this.stopPointsValue = function(amount) {
        if (!arguments.length) return stopPointsValue;
        stopPointsValue = amount;
    };
}

var drpdwnset = new drdwnSetter();

window.changeBikePointsCount = function(data) {
    drpdwnset.bikeValue(data);
};

window.changeStopPointsCount = function(data) {
    drpdwnset.stopPointsValue(data);
};


document.getElementById("bikeBtn").onclick = showBikePoints;
document.getElementById("stopBtn").onclick = showStopPoints;
document.getElementById("clearMarkersBtn").onclick = clearMarkers;

function clearMarkers() {
    for (var i = 0; i < bikePointsMarkers.length; i++) {
        bikePointsMarkers[i].setMap(null);
    }
    bikePointsMarkers = [];
    for (var j = 0; j < stopPointsMarkers.length; j++) {
        stopPointsMarkers[j].setMap(null);
    }
    stopPointsMarkers = [];
}


function renderMap() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(51.529163, -0.10997),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}



function showBikePoints() {

    var xhttp = new XMLHttpRequest();
    bikePointsMarkers = [];
    stopPointsMarkers = [];

    function formatBikePoints(data) {
        var parsed_data = JSON.parse(data);
        var sliced_data = parsed_data.slice(0, drpdwnset.bikeValue());

        for (var i = 0; i < sliced_data.length; i++) {
            var Latlng_0 = new google.maps.LatLng(sliced_data[i].lat, sliced_data[i].lon);
            var marker = new google.maps.Marker({
                position: Latlng_0,
                icon: "icons/bike-icon.png",
                title: sliced_data[i].commonName,
                animation: google.maps.Animation.DROP,
                zoom: 14
            });
            bikePointsMarkers.push(marker);
            marker.setMap(map);
        }
    }

    xhttp.onreadystatechange = function() {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var response_text = formatBikePoints(xhttp.responseText);
        }
    };

    var bikePoints_url = "https://api.tfl.gov.uk/bikepoint/";
    xhttp.open("GET", bikePoints_url, true);
    xhttp.send();
}


function showStopPoints() {

    bikePointsMarkers = [];
    stopPointsMarkers = [];
    var xhttp = new XMLHttpRequest();

    function formatStopPoints(data) {
        var parsed_data = JSON.parse(data);
        //var sliced_data = parsed_data.slice(0, drpdwnset.stopPointsValue());

        var formatted_data;

        for (var i = 0; i < parsed_data.length; i++) {


            var Latlng_0 = new google.maps.LatLng(parsed_data[i].lat, parsed_data[i].lon);

            var marker = new google.maps.Marker({
                position: Latlng_0,
                icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
                title: parsed_data[i].stopType,
                animation: google.maps.Animation.DROP,
                zoom: 14
            });
            stopPointsMarkers.push(marker);
            marker.setMap(map);
        }
    }

    xhttp.onreadystatechange = function() {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var response_text = formatStopPoints(xhttp.responseText);
        }
    };

    var stopPoint_url = "https://api.tfl.gov.uk/line/" + drpdwnset.stopPointsValue() + "/stoppoints";
    console.log(stopPoint_url);
    xhttp.open("GET", stopPoint_url, true);
    xhttp.send();
}

renderMap();