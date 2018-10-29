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
    console.log(dataSet);
}





