import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Marcador } from '../class/marcador';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  marcadores: Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA: number;
  latB: number;
  lngA: number;
  lngB: number;
  polyline = false;
  constructor(private storage: Storage) {}

  ngOnInit() {
    this.polygon = false;
    this.polyline = false;
    this.storage.get('dots').then((val) => {
      const marcador: Marcador = JSON.parse(val);
      for (let i in marcador) {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
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
    this.storage.set('dots', JSON.stringify(this.marcadores) );

    }
}
