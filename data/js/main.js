import "ol/ol.css";
import { Circle, Fill, Style } from "ol/style";
import { Feature, Button, Map, Overlay, View } from "ol/index";
import { OSM, Vector as VectorSource } from "ol/source";
import { Point } from "ol/geom";
import { MapboxVector, Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
//import * as Coordinates from './app.js';
useGeographic();

const map = new Map({
  target: "map",
  view: new View({
    center: [-74.297333, 4.570868],
    zoom: 5,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
});
// Modal

class Modal {
  constructor(modal, target) {
      this.isOpen = false;
      this.modal = modal;
      this.target = target;
      this.closeModal = modal.querySelectorAll('[data-close]');

      this.target.addEventListener("click", (e) => {
          if (this.isOpen) {
              return this.close();
          }
          return this.open();
      });
      this.closeModal.forEach(item => {
          item.addEventListener("click", (e) => {
              this.close();
          });
      });
  }  
  open() {
      this.modal.classList.add('show-modal');
      setTimeout(() => {
          this.animateIn();
      }, 10);
  }
  close() {
      this.animateOut();
      setTimeout(() => {
          this.modal.classList.remove('show-modal');
      }, 250);
  }
  animateIn() {
      this.modal.classList.add('animate-modal');
  }
  animateOut() {
      this.modal.classList.remove('animate-modal');
  }
}

const modal = new Modal(
  document.querySelector('.modal'),
  document.querySelector('[data-toggle="modal"]')
  )



// fin modal

document.getElementById("getCoordinates").onclick = function (e) {
  var lonlat = [];
  latitud = document.getElementById("lat").value;
  longitud = document.getElementById("lon").value;

  if (latitud === null || latitud === "" || longitud === null || longitud === "") {
    Swal.fire({
      title: 'Error!',
      text: 'No puede haber un campo vacio',
      icon: 'error',
      confirmButtonText: 'volver'
    });
    document.getElementById('lat').focus();
  } else if (!(latitud >= -4.22500 && latitud <= 12.46277)) {
    Swal.fire({
      title: 'Error!',
      text: 'La latitud ingresada se encuentra fuera de la zona de cobertura',
      icon: 'error',
      confirmButtonText: 'volver'
    });
  } else if (!(longitud >= -79.00633 && longitud <= -66.84833)) {
    Swal.fire({
      title: 'Error!',
      text: 'La longitud ingresada se encuentra fuera de la zona de cobertura',
      icon: 'error',
      confirmButtonText: 'volver'
    });
  } else {
    lonlat.push(longitud, latitud);

     map.getView().animate({
       center: lonlat,
       zoom: 14,
       duration: 2000, 
     })

  //  var newView = new View({
  //     center: lonlat,
  //     zoom: 14
  //   });
  //    map.setView(newView);
    
    const point = new Point(lonlat)
    var vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [new Feature(point)],
      }),
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: "red" }),
        }),
      }),
    });
    map.addLayer(vectorLayer);
    
  }
}

