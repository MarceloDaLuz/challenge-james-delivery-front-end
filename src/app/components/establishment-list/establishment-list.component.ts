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

  constructor(private api: DataService, private router: Router ) {    }

  ngOnInit(): void {
    this.api.getAll().then(data => this.establishments = data);
  }

  openEstablishment(id: string){
    if(!id) return;

    this.router.navigate(['establishment', id]);
  }
}
