import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Marcador } from '../class/marcador';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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
    this.storage.get('lines').then((val) => {
      const marcador: Marcador = JSON.parse(val);
      for (let i in marcador) {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
        
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
  ingresarMarcador(lat, lng, title, description) {
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

  agregarMarcador(evento) {
    console.log(`Lat a: ${this.latA} Long a: ${this.lngA}`);
    console.log(`Lat b: ${this.latB} Long b: ${this.lngB}`);
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    // Almacenamiento en local storage
    this.storage.set('lines', JSON.stringify(this.marcadores) );
    // Creación de la línea
    if (this.marcadores.length > 0) {
      this.polyline = true;
        this.latA = this.latB;
        this.lngA = this.lngB;
        this.latB = parseFloat(evento.coords.lat);
        this.lngB = parseFloat(evento.coords.lng);
        this.polyline = true;
     }
    }

}
