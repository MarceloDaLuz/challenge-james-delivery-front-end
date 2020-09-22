import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {

  establishments = [];

  constructor(private api: DataService, private router: Router ) {
    this.establishments = this.api.getEstablishments();
  }

  ngOnInit(): void {

  }

  openEstablishment(id: string){
    if(!id) return;

    this.router.navigate(['establishment', id]);
  }
}
