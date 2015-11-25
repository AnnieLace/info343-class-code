/*
    app.js
    main script file for this mapping application
    source data URL: https://data.seattle.gov/resource/65fc-btcc.json
*/
$(function() {
    'use stirct';

    //create map centered on Seattle
    var map = L.map('map').setView([47.6097, -122.3332], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var cams = [];
    var SDOTcams = 0;
    var WSDOTcams = 0;
    var url = 'https://data.seattle.gov/resource/65fc-btcc.json';
    $.getJSON(url)
        .then(function(data){
            //Get information for each camera
            $.each(data, function() {
                var camName = this.cameralabel;
                var camImage = this.imageurl.url;
                var popupContent = '<h2>' + camName + '</h2>' + "<img src = " + camImage + " alt = camera picture width = 250px>";
                var markerColor;
                var owner = this.ownershipcd;
                //keep track of who owns each camera
                if(owner === 'SDOT') {
                    markerColor = '#9900CC';
                    SDOTcams++;
                }
                else {
                    markerColor = '#0066FF';
                    WSDOTcams++;
                }
                //create a marker for each camera and add it to the map
                var marker = L.circleMarker([this.location.latitude, this.location.longitude], {
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 1
                }).bindPopup(popupContent, 'cameraPopup');
                marker.addTo(map);

                //keep track of cameras so they can be easily filtered later
                var camera = {"name": camName.toLowerCase(), "owner": owner, "marker": marker};
                cams.push(camera);
            });
            //update the camera numbers displayed on screen
            $('#sdotNum').text(SDOTcams);
            $('#wsdotNum').text(WSDOTcams);
    });

    //start filtering cameras when user enters text into search box
    $('#cam-filter-field').keyup(function() {
        var filter = this.value.toLowerCase();
        $.each(cams, function() {
            //add camera marker to the map if the name matches the user's search
            //and it is not already displayed
            if((filter.length === 0 || this.name.indexOf(filter)) >= 0
            && !(map.hasLayer(this.marker))) {
                map.addLayer(this.marker);
                if(this.owner === 'SDOT') {
                    SDOTcams++;
                }
                else {
                    WSDOTcams++;
                }
            }
            //remove camera marker from the map if the name does not match the user's search
            else if(this.name.indexOf(filter) < 0 && map.hasLayer(this.marker)) {
                map.removeLayer(this.marker);
                if (this.owner === 'SDOT') {
                    SDOTcams--;
                }
                else {
                    WSDOTcams--;
                }
            }
        });
        //update the number of cameras displayed
        $('#sdotNum').text(SDOTcams);
        $('#wsdotNum').text(WSDOTcams);
    });
});