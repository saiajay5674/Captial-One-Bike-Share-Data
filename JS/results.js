var file = "http://localhost:8000/package/metro-bike-share-trip-data.csv";
var dataSet;

Papa.parse(file, {
    header:true,
    complete: function(results, file) {
        analyse(results);
    },
    download:true
});

function analyse(dataSet)
{

    console.log(Object.entries(dataSet)[0][1][123150]);

    var masterData = Object.entries(dataSet)[0][1];

    //var avgDistance = findAverageDistance(masterData);

    //console.log(avgDistance);

    //mostCommonStation(masterData);

    findDistanceFromAPI(34.048401,-118.260948,34.04554,-118.256668);

    
}
// Try using Google Maps Api
function findDistanceFromAPI(sLat, sLong, eLat, eLong)
{
    /*var origin = {lat: sLat, lng: sLong};
    var destination = {lat: eLat, lng: eLong};

    var service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
        
        origins: origin,
        destinations: destination,
        travelMode: 'BYCYCLING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false

    }, function (response, status){

        if (status !== 'OK') {
            alert('Error was: ' + status);
        }
        else{
            var results = response.rows[0].elements;

            console.log(results.distance.text);
        }
    })*/

    var bounds = new google.maps.LatLngBounds;
        var markersArray = [];

        var origin1 = {lat: sLat, lng: sLong};
        var destinationB = {lat: eLat, lng: eLong};

        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10
        });
        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: origin1,
          destinations: destinationB,
          travelMode: 'BICYCLING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results, status) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                  markersArray.push(new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon
                  }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              geocoder.geocode({'address': originList[i]},
                  showGeocodedAddressOnMap(false));
              for (var j = 0; j < results.length; j++) {
                geocoder.geocode({'address': destinationList[j]},
                    showGeocodedAddressOnMap(true));
                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';
              }
            }
          }
        });
}
function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
    markersArray = [];
  }

function findAverageDistance(masterData)
{
    var count = 0;
    var distance = 0;

    for (var i = 0; i < Object.keys(masterData).length; i++)
    {
        var currentData = masterData[i];

        var sLat = currentData['Starting Station Latitude'];
        var sLong = currentData['Starting Station Longitude'];
        var eLat = currentData['Ending Station Latitude'];
        var eLong = currentData['Ending Station Longitude'];

        distance = distance + findDistance(sLat,sLong,eLat,eLong);
        count = count + 1;
        
    }

    return distance/count;
}

function findDistance(sLat, sLong, eLat, eLong)
{
    const R = 6371.01;

    var distance = R * Math.acos(Math.sin(sLat)* Math.sin(eLat) + 
    Math.cos(sLat)* Math.cos(eLat) * Math.cos(sLong - eLong));

    return distance;

}

function mostCommonStation(masterData)
{
    var stationMap = new Map();

    for (var i = 0; i < Object.keys(masterData).length; i++)
    {
        var currentData = masterData[i];
        
        var stationID = currentData['Starting Station ID'];

        if (stationMap.has(stationID))
        {
            var value = stationMap.get(stationID);
            stationMap.set(stationID, value + 1)
        }

        stationMap.set(stationID, 1);
    }

    console.log("Test");

    displayMap(stationMap);
}


function displayMap(map)
{
    map.forEach(function(value, key) {
        console.log(key + ' : ' + value);
      });
}




