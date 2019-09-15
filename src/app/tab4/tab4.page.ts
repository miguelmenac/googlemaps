import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private storage: Storage) {}

  marcadores: Marcador[] = [];
  contador = 0;
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA: number;
  latB: number;
  lngA: number;
  lngB: number;
  polyline = false;
  ngOnInit() {
    this.polygon = false;
    this.polyline = false;
    this.storage.get('poligono').then((val) => {
      const marcador: Marcador = JSON.parse(val);
      for (let i in marcador) {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
        if (parseInt(i) <= 2) {
          this.paths.push(marcador[i]);
        }
        if (parseInt(i) == 3) {
          this.polygon = true;
          this.latA = (marcador[i].lat);
          this.lngA = (marcador[i].lng);
        }
        if (parseInt(i) == 4) {
          this.latB = (marcador[4].lat);
          this.lngB = (marcador[4].lng);
          this.polyline = true;
        }
      }
    });
  }

  ingresarMarcador(lat, lng, title, description){
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    // Almacenamiento en local storage
    this.storage.set('poligono', JSON.stringify(this.marcadores));
    console.log(this.marcadores.length);
    // Creación del polígono
    if (this.marcadores.length % 2) {
      this.paths = this.marcadores;
      this.polygon = true;
      } else {
      this.polygon = false;
      }
    }
  }
