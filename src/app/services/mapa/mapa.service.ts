import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private headers;
  private apiUrl = environment.base_url + '/CLIENTES';

  constructor( private http: HttpClient ) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getClientId( client : any ) {
    return this.http.get(this.apiUrl + '/GetCLIENTId/' + client );
  }

  public postPolygon( data: any ) {
    return this.http.post( this.apiUrl + '/PostCLIENT_POLYGON', data );
  }

  public deletePolygon( data: any ) {
    return this.http.put( this.apiUrl + '/DeleteCLIENT_POLYGON', data );
  }
}
