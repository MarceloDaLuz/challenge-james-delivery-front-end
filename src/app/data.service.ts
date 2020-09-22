import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private REST_API = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments';
  private KEY_LOCAL_DB = 'establishments';

  constructor(private httpClient: HttpClient) {}



  /**
   * @function formatEstablishment
   * @param establishment
   * @description a função deve modelar o dada conforme os requistos, verificar no figma!
   */
  private formatEstablishment(establishment: any){

    let address = establishment.address.split(',');
    establishment.bank = establishment.hasOwnProperty('bank') ? establishment.bank : '';
    establishment.account_type = establishment.hasOwnProperty('account_type') ? establishment.account_type : '';
    establishment.identification_document = establishment.hasOwnProperty('identification_document') ? establishment.identification_document : '';
    establishment.agency = establishment.hasOwnProperty('agency') ? establishment.agency : '';
    establishment.agency_d = establishment.hasOwnProperty('agency_d') ? establishment.agency_d : '';
    establishment.account = establishment.hasOwnProperty('account') ? establishment.account : '';
    establishment.account_d = establishment.hasOwnProperty('account_d') ? establishment.account_d : '';
    establishment.bank_draft = establishment.hasOwnProperty('bank_draft') ? establishment.bank_draft : '';
    establishment.city = address[1]; //city
    establishment.address = address.filter((addressData: any[]) => addressData != establishment.city).join(',');
    return establishment
  }

  /**
   * @function getEstablishments
   * @description a função deve pegar os dados que estão em "establishment" no banco de dados
   */
  async getAll(){
    let establishments:any;
    await this
      .connectDatabase()
      .then((data) => establishments = data);
    return establishments;
  }

  async getById(id: string){
    let establishment:any;
    await this
      .connectDatabase()
      .then(data => {
        establishment = data.find((item: any) => item.id === id);
      });
    return establishment;
  }

  async updateEstablishment(establishment:any){
    let completed:boolean = false;
    await this
      .connectDatabase()
      .then(data => {
        let _establishment = data.find((item: any) => item.id === establishment.id);
        if(!_establishment) return false;
        data[_establishment.index] = establishment;
        localStorage.setItem(this.KEY_LOCAL_DB, JSON.stringify(data));
        completed = true;
      })
    return completed;
  }

  async connectDatabase(){
    let establishmentsData = localStorage.getItem(this.KEY_LOCAL_DB)
    if(!establishmentsData){
      let establishments: any = await this.httpClient.get(this.REST_API,  {responseType: 'json'}).toPromise();
      establishmentsData = establishments.map((establishment:any) => this.formatEstablishment(establishment));
      establishmentsData = JSON.stringify(establishmentsData);
      localStorage.setItem(this.KEY_LOCAL_DB, establishmentsData);
    }

    return JSON.parse(establishmentsData);
  }
}
