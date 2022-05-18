import "ol/ol.css";
import * as jsts from 'jsts/dist/jsts.min.js';

import GeoJSON from "ol/format/GeoJSON";
import LinearRing from "ol/geom/LinearRing";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import {
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";

const json = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.015625, 12.940322128384627],
            [-74.7509765625, 11.39387923296741],
            [-76.9482421875, 8.885071663468993],
            [-78.57421875, 6.664607562172573],
            [-77.9150390625, 3.5134210456400448],
            [-79.40917968749999, 1.4500404973608074],
            [-76.37695312499999, -0.5273363048115043],
            [-73.3447265625, -2.460181181020993],
            [-71.455078125, -2.943040910055132],
            [-70.57617187499999, -3.118576216781991],
            [-71.1474609375, -4.477856485570586],
            [-69.697265625, -4.872047700241915],
            [-68.90625, -1.098565496040652],
            [-68.994140625, 1.2743089918452106],
            [-67.6318359375, 1.4939713066293239],
            [-66.8408203125, 0.8788717828324276],
            [-66.533203125, 1.625758360412755],
            [-67.1044921875, 2.8113711933311403],
            [-67.412109375, 5.00339434502215],
            [-67.19238281249999, 6.315298538330033],
            [-69.2578125, 6.446317749457659],
            [-70.1806640625, 7.449624260197816],
            [-71.8505859375, 7.536764322084078],
            [-72.59765625, 9.362352822055605],
            [-72.6416015625, 10.35815140094367],
            [-71.89453125, 11.469257905863257],
            [-71.136474609375, 11.813588069771273],
            [-70.7958984375, 12.286333810713812],
            [-70.982666015625, 12.790374787613601],
            [-71.015625, 12.940322128384627],
          ],
        ],
      },
    },
  ],
};


// const source = new VectorSource();

    // console.log(json);
    const format = new GeoJSON();
    const features = format.readFeatures(json, {
      featureProjection: "EPSG:3857",
    });

    // console.log(features);

const parser = new jsts.io.OL3Parser();
    parser.inject(
      Point,
      LineString,
      LinearRing,
      Polygon,
      MultiPoint,
      MultiLineString,
      MultiPolygon
);
    
// project a lat/lon point to a map coordinate
const project = (x, y) => fromLonLat([x, y]);

// create a point string with format POINT(x y)
const point = (x, y) => `POINT(${x} ${y})`;

// let xy = project(-73.1299, 7.1219);

// create a point string from lat lon coordinates
const pointFromLonLat = (x, y) => {
    const p = project(x, y);
    return point(p[0], p[1]);
}


// console.log(xy);

var reader = new jsts.io.WKTReader();
var jstsPointColombia = reader.read(
    pointFromLonLat(-73.1299, 7.1219)// puntos de Colombia en longitud y latitud
);
     
var jstsPointExterior = reader.read(
    pointFromLonLat(-69.23, -4)
);

var jstsPointExterior_1 = reader.read(
  pointFromLonLat(-98.613, 38.82259)
);
var jstsPointExterior_2 = reader.read(
    pointFromLonLat(-73.1299, 40.1219)
);
var jstsPointExterior_3 = reader.read(pointFromLonLat(-73.1299, 4.1219));


const feature = features[0];
//   // convert the OpenLayers geometry to a JSTS geometry
const jstsGeom = parser.read(feature.getGeometry());
// console.log(jstsGeom);

console.log('contener:  ', jstsPointColombia.within(jstsGeom));
console.log("contener:  ", jstsPointExterior.within(jstsGeom));
console.log("contener:  ", jstsPointExterior_1.within(jstsGeom));
console.log("contener:  ", jstsPointExterior_2.within(jstsGeom));
console.log("contener:  ", jstsPointExterior_3.within(jstsGeom));
    //   // create a buffer of 40 meters around each line
    //   const buffered = jstsGeom.buffer(40);

    //   // convert back from JSTS and replace the geometry on the feature
    //   feature.setGeometry(parser.write(buffered));


// source.addFeatures(features);

  

// const vectorLayer = new VectorLayer({
//   source: source,
// });

const rasterLayer = new TileLayer({
  source: new OSM(),
});

const map = new Map({
  layers: [rasterLayer, /*vectorLayer*/],
  target: document.getElementById("map"),
  view: new View({
    center: fromLonLat([-72, 4]),
    zoom: 5,
  }),
});
