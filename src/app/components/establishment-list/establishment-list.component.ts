import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {

  establishments = [];

  constructor(private api: DataService) { }

  ngOnInit(): void {

    this
      .api
      .getEstablishments()
      .subscribe((data: any[]) => {

        //remove a cidade do fake address
        this.establishments = data.map((establishment) => {
          let address = establishment.address.split(',');
          establishment.city = address[1]; //city
          establishment.address = address.filter(addressData => addressData != establishment.city).join(',');
          return establishment;
        });
      });
  }

}
