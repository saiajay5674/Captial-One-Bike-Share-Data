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

    console.log(Object.entries(dataSet)[0][1][115]);

    var masterData = Object.entries(dataSet)[0][1];

    //var avgDistance = findAverageDistance(masterData);

    //console.log(avgDistance);


    
}
// Try using Google Maps Api

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





