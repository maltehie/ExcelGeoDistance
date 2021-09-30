/**
 * Calculate the road distance between two addresses
 * @customfunction
 * @param {string} originAddress 
 * @param {string} destinationAddress 
 * @returns {string} Road distance between the two addresses in m.
 */
async function dist(originAddress, destinationAddress){
  return await calculateDistance(originAddress, destinationAddress);
} 

async function calculateDistance(originAddress, destinationAddress){

  var origCoordinates = await resolveAddress(originAddress);
  var destCoordinates = await resolveAddress(destinationAddress);
  var resposeJson;

  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c3fca60771b847e28d85e326d947320a&start='+
  origCoordinates[0]+','+origCoordinates[1]+
  '&end='+destCoordinates[0]+','+destCoordinates[1]);
  
  
request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
request.send();

return new Promise(resolve => {
request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    //console.log('Headers:', this.getAllResponseHeaders());
    //console.log('Body:', this.responseText);
    
    responseJson = JSON.parse(this.responseText);
    var dist = responseJson.features[0].properties.segments[0].distance;
    console.log('Distance: ', dist);
    resolve(dist);
  }
};
});
}

function resolveAddress(address){
  
  address = address.replace(/ /g, '%20');
  var responseJson;
  
  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248c3fca60771b847e28d85e326d947320a&text='+address+'&layers=address');

  request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
  
    
  request.send();

return new Promise(resolve => {
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
     console.log('Status:', this.status);
     //console.log('Headers:', this.getAllResponseHeaders());
     //console.log('Body:', this.responseText);
     responseJson = JSON.parse(this.responseText);
     
     var coo = responseJson.features[0].geometry.coordinates;
     console.log('Coordinates: ', coo);
     resolve(coo);
   }
  };
  });
}