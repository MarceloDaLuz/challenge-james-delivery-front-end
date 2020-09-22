import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private REST_API = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments';
  private KEY_LOCAL_DB = 'establishments';

  constructor(private httpClient: HttpClient) {}

  public connectDatabase(){
    if(!localStorage.getItem(this.KEY_LOCAL_DB)){
      this
        .httpClient
        .get(this.REST_API,  {responseType: 'json'})
        .subscribe(
          (data:any) => {
            let localEstablishments = data.map((est: any) => this.formatEstablishment(est));
            localStorage.setItem(this.KEY_LOCAL_DB, JSON.stringify(localEstablishments));
            console.log('termino')
          },
          (err) => console.log('Estabelicimentos não foram encontrados'));
    }
  }

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
  public getEstablishments(){
    let localEstablishments:any = localStorage.getItem(this.KEY_LOCAL_DB);
    if(!localEstablishments) return;
    return JSON.parse(localEstablishments);
  }

  public getEstablishment(id: string){
    const localDb = JSON.parse(localStorage.getItem(this.KEY_LOCAL_DB));

    if(!localDb) return false;

    return localDb.find((item: any) => item.id === id);

  }

  public updateEstablishment(establishment){
    const localDb = JSON.parse(localStorage.getItem(this.KEY_LOCAL_DB));
    if(!localDb) return false;
    let _establishment = localDb.find((item: any) => item.id === establishment.id);
    if(!_establishment) return false;
    localDb[_establishment.index] = establishment;
    localStorage.setItem(this.KEY_LOCAL_DB, JSON.stringify(localDb))
  }
}
