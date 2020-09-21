import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments';

  constructor(private httpClient: HttpClient) { }

  public getEstablishments(){

    const localEstablishments = localStorage.getItem('establishments')

    if(localEstablishments){
      return JSON.parse(localEstablishments);

    }else{
      return this
        .httpClient
        .get(this.REST_API)
        .subscribe((data)=> {
          localStorage.setItem('establishments', JSON.stringify(data))
          return data;
        });
    }

  }
}
