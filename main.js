import 'ol/ol.css';
import { Circle, Fill, Style } from 'ol/style';
import { Feature, Button, Map, Overlay, View } from 'ol/index';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { useGeographic } from 'ol/proj';

//import * as Coordinates from './app.js';

useGeographic();

const place = [-74.297333, 4.570868];


const point = new Point(place);


const map = new Map({
  target: 'map',
  view: new View({
    center: place,
    zoom: 10,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(point)],
      }),
      style: new Style({
        image: new Circle({
          radius: 9,
          fill: new Fill({ color: 'red' }),
        }),
      }),
    }),
  ],
});


const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10],
});
map.addOverlay(popup);

// function formatCoordinate(coordinate) {
//   return `
//     <table>
//       <tbody>
//         <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
//         <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
//       </tbody>
//     </table>`;
// }

// const info = document.getElementById('info');
// map.on('moveend', function () {
//   const view = map.getView();
//   const center = view.getCenter();
//   info.innerHTML = formatCoordinate(center);
// });

map.on('click', function (event) {
  $(element).popover('dispose');

  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
    const coordinate = feature.getGeometry().getCoordinates();
    popup.setPosition([
      coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
      coordinate[1],
    ]);
    $(element).popover({
      container: element.parentElement,
      html: true,
      sanitize: false,
      content: formatCoordinate(coordinate),
      placement: 'top',
    });
    $(element).popover('show');
  }
});



// const navigatePosition = () => {
//   const coordinates = geolocation.getPosition();
//   if (coordinates) {
//     map.getView().animate({
//       center: coordinates,
//       zoom: 12,
//     });
//   }
// };

map.on('pointermove', function (event) {
  if (map.hasFeatureAtPixel(event.pixel)) {
    map.getViewport().style.cursor = 'pointer';
  } else {
    map.getViewport().style.cursor = 'inherit';
  }
});

document.getElementById("getCoordinates").onclick = function (e) {
  let lonlat = []
  
  latitud = document.getElementById('lat').value;
  longitud = document.getElementById('lon').value;

  lonlat.push(longitud, latitud); 

  console.log(lonlat);

  map.getView().animate({
    center: lonlat,
    zoom: 12
  })
}

