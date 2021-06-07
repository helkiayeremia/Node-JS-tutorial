const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGVsa2lheWVyZW1pYSIsImEiOiJja3BtcWtwNWcwaTNhMnBtZWhhMGdnZ2VlIn0.GhjvHYYcDAinUi0lojFUqg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/helkiayeremia/ckpmrz0ci0bo418nyovet3qrb',
  scrollZoom: false
  //   center: [-118.113491, 34.111745],
  //   zoom: 10,
  //   interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extends map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
