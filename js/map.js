// Austin Handojo
// ICT 4510
// June 4 2023
//mapbox initialize
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhhbmRvam8iLCJhIjoiY2xobzIyNngxMHk5bDNxbnlqczJnZjN1ayJ9.JKeikPm6YIMep5s3aJdZ-A';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/ahandojo/clho5691x00m001po90g85vpt', // style URL
    center: [-104.961753, 39.678121], // starting position [lng, lat]
    zoom: 15, // starting zoom
    });
    const marker = new mapboxgl.Marker()
    .setLngLat([-104.961753,39.678121])
    .addTo(map); // add the marker to the map
    