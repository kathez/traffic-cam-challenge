// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map

$(document).ready(function() {
    var mapElem = document.getElementById('map');

    var markers = [];

    var center = {
        lat:47.6,
        lng:-122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    //infoWindow will use to show the traffic camera image when the user clicks on the camera marker.
    var infoWindow = new google.maps.InfoWindow();

    $.getJSON('https://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {

            data.forEach(function(station) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map,
                    camera: station.cameralabel
                });

                google.maps.event.addListener(marker, 'click', function() {

                    var html = '<p>' + station.cameralabel + '</p>';
                        html += '<img src="' + station.imageurl.url + '" />';
                        infoWindow.setContent(html);
                        infoWindow.open(map, this);
                        map.panTo(marker.getPosition());
                });

                markers.push(marker);
            });
        })
        .fail(function(error) {
            alert(error);
        });

    $("#search").bind('search keyup', function() {
        var search = document.getElementById('search').value.toLowerCase();
        for (var i = 0; i < markers.length; i++) {
            var str = markers[i].camera;
            var string = str.toLowerCase();
            var n = string.indexOf(search);

            if (n != -1) {
                markers[i].setMap(map);
            }
            else {
                markers[i].setMap(null);
            }
        };
    });
});


