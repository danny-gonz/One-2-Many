
var FindMeImDrunk = {};


FindMeImDrunk.map = {

    getMarkerObj: function (initData) {
        var newMarker = this;

        newMarker.lat = initData.location.latitude,
        newMarker.lng = initData.location.longitude,
        newMarker.venue = initData.venueName,
        newMarker.instructions = initData.instructions,
        newMarker.parking = initData.parking,
        newMarker.line1 = initData.location.line1,
        newMarker.line2 = initData.location.line2,
        newMarker.city = initData.location.city,
        newMarker.state = initData.location.state.stateCode,
        newMarker.zip = initData.location.zip,
        newMarker.getContentString = function () {

            var cnt = "<ul><li>Venue: " + newMarker.venueName + "</li>" +
              "<li>Instructions: " + newMarker.instructions + "</li>" +
             "<li>Parking: " + newMarker.parking + "</li>" +
              "<li>Address: " + newMarker.line1 + newMarker.line2 + "</li>" +
             "<li>City: " + newMarker.city + "</li>" +
              "<li>State: " + newMarker.state + "</li>" +
              "<li>Zip: " + newMarker.zip; "</li>" +
              "</ul>";

            return cnt;

        }

    }
    ,
    mapDraw: function (elementId, centerLatLng, options) {

        var mapoptions = {
            center: centerLatLng,
            zoom: 8,
            enableHighAccuracy: true,
            timeout: 5000,
            scrollwheel: true,
            maximumAge: 0,

        };

        //look up how to use jquery extend method to merge map options & options

        var thisMap = new google.maps.Map(document.getElementById(elementId),
            mapoptions);

        return thisMap;

    }
    , getcodebyaddress: function (line1, line2, city, state, zip, stateValue, onSuccess, onError) {

        var send = false;
        var addressOrZip = null;

        if (line1 && line2 && city && stateValue && zip) {
            send = true;
            addressOrZip = line1 + " " + line2 + " " + city + " " + stateValue + " " + zip;

        }

        else if (line1 && city && stateValue && zip) {
            send = true;
            addressOrZip = line1 + " " + city + " " + stateValue + " " + zip;
        }

        else if (city && zip) {

            send = true;
            addressOrZip = city + " " + zip;
        }

        else if (zip || stateValue) {

            send = true;
            addressOrZip = stateValue + " " + zip;
        }

        else if (city && stateValue) {
            send = true;
            addressOrZip = city + " " + stateValue;
        }

        else if (zip) {
            send = true;
            addressOrZip = zip;
        }

        else if (stateValue) {
            send = true;
            addressOrZip = stateValue;
        }

        console.log(addressOrZip);

        if (send) {
            electa.services.maps.geoCodeByAddressOrZip(addressOrZip, onSuccess, onError);
        }

        return send;

    }

, geoCodeByAddressOrZip: function (addressOrZip, onSuccess, onError) {
    var geocoder;
    var geocoder = new google.maps.Geocoder();


    geocoder.geocode({ 'address': addressOrZip }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            electa.page.geoCodeResult = results;
            var thisResult = {};


            thisResult.lat = results[0].geometry.location.lat();
            thisResult.lng = results[0].geometry.location.lng();
            thisResult.name = results[0].address_components[0].long_name;



            onSuccess(thisResult);
        }

        else if (onError) {
            onError('Geocode was not successful for the following reason: ' + status);

        }

    });

}
,
    addMarkers: function (latLng, map, onComplete, displayoptions) {
        var markerList = [];

        var markerAdd = function (latLngObj) {

            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(latLngObj.lat, latLngObj.lng),
                title: latLngObj.name
            });
            return marker;

        };

        var theseOpts = {};

        $.extend(true, theseOpts, displayoptions);

        var bounds = new google.maps.LatLngBounds();

        if (Array.isArray(latLng)) {

            $.each(latLng, function (idx, singleItem) {

                var marker = markerAdd(singleItem);

                bounds.extend(marker.position);

                markerList.push(marker);


                var infowindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', function () {

                    infowindow.setContent(singleItem.getContentString());
                    infowindow.open(map, marker);

                });
            });

            if (theseOpts.fitBounds) {
                map.fitBounds(bounds);
            }
            else if (theseOpts.setCenter) {
                map.setCenter(theseOpts.center);
            }

        }

        else {

            markerList.push(markerAdd(latLng, map));

            if (theseOpts.setCenter) {
                map.setCenter(latLng);
            }

        }

        if (onComplete) { onComplete(markerList); }

    }
,
    getGeoFromBrowser: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(electa.page.browserGeoSuccess, electa.page.browserGeoError);
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
    }

};
