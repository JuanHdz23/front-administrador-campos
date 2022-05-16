import { Component, OnInit } from '@angular/core';
import { Client, Coords } from 'src/app/interfaces/client.interface';
import { MapaService } from '../../services/mapa/mapa.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapaForm!: FormGroup ;

  map: any;
  latitud: number = 29.1138337;
  longitud: number = -110.8471923;
  info_client: any;

  searchText = '';

  constructor(
    private formBuilder: FormBuilder,
    private _mapService: MapaService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.mapaForm = this.formBuilder.group({
      search: ['']
    });
  }

  loadData() {
    this._mapService.getClientId('00001').subscribe((client: any) => {
      this.info_client = client.cliente;
      this.initMap();
    });
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: this.latitud, lng: this.longitud },
      zoom: 15,
    });

    this.map.setMapTypeId('satellite');

    this.info_client.map((polygon: any) => {
      const coordinates: Coords[] = [];
      polygon.polygon.coordinates[0].map( (coords: any) => {
        coordinates.push({ lat: coords[0], lng: coords[1] })
      });

      const graph_polygon = new google.maps.Polygon({
        paths: coordinates,
        strokeColor: "#42C0FB",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#42C0FB",
        fillOpacity: 0.35,
      });

      graph_polygon.setMap( this.map );
    });
  }

  addPolygon() {
    let client = '';

    if ( this.info_client[0].length > 0) {
      client = this.info_client[0];
    } else {
      client = '00001';
    }

    const wkt = {
      type: 'Polygon', coordinates: [
        [ [29.117824, -110.839834], [29.118195, -110.837972], [29.120089, -110.838372],
          [29.119966, -110.840093], [29.117824, -110.839834] ]
      ]
    };

    const polygonData: any = {
      client,
      name: 'Nuevo Predio 2',
      location: 'Mesa de Seri - Hermosillo',
      polygon: wkt
    }

    this._mapService.postPolygon( polygonData ).subscribe({
      next: (result: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Información Guardada Correctamente',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });

        this.loadData();
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un error en su registro, por favor intentelo nuevamente.'
        });
      }
    });
  }

  deletePolygon( polygon: any ) {
    const polygonData: any = {
      id: polygon.id
    }

    this._mapService.deletePolygon( polygonData ).subscribe({
      next: (result: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Información Actualizada',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });

        this.loadData();
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un error en su registro, por favor intentelo nuevamente.'
        });
      }
    });
  }

}
