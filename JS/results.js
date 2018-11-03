var file = "https://saiajay5674.github.io/Captial-One-Bike-Share-Data/package/metro-bike-share-trip-data.csv";
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

    //console.log(Object.keys(masterData).length);

    //mostCommonStation(masterData);

    //initMap(34.048401,-118.260948,34.04554,-118.256668);

    //apiCallTest()

    
}
// Try using Google Maps Api
function initMap(sLat, sLong, eLat, eLong)
{
    var origin = new google.maps.LatLng(sLat, sLong);
    var destination = new google.maps.LatLng(eLat, eLong);

    var service = new google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix({

        origins: [origin],
        destinations: [destination],
        travelmode: 'BICYCLING',

    }, callback);

    function callback(response, status) 
{
    if (status == 'OK') 
    {
        for (var i = 0; i < origins.length; i++)
        {
            var results = response.rows[i].elements;

            for (var j = 0; j < results.length; j++)
            {
                var element = results[j];
                var distance = element.distance.text;

                console.log(distance);
            }
        }
    }
}

}

function apiCallTest()
{
    var apiCall = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=34.048401,-118.260948&destinations=34.04554,-118.256668&mode=bicycling&units=metric&key=AIzaSyBdBiMTmNwdPCww3tKpi3ijxCJU_0_YW1o';

    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', apiCall, true);

    request.onload = function () {
    
        var data = JSON.parse(this.response);

        console.log(data);

    }

    request.send();
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

    /*for (var i = 0; i < Object.keys(masterData).length; i++)
    {
        var currentData = masterData[i];
        
        var stationID = currentData['Starting Station ID'];

        if (stationMap.has(stationID))
        {
            var value = stationMap.get(stationID);
            stationMap.set(stationID, value + 1)
        }

        stationMap.set(stationID, 1);
    }*/

    console.log(Object.keys(masterData).length);

    displayMap(stationMap);
}


function displayMap(map)
{
    map.forEach(function(value, key) {
        console.log(key + ' : ' + value);
      });
}




