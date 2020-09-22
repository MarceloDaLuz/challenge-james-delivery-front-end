import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss']
})
export class EstablishmentComponent implements OnInit {
  public iconArrowLeft =  faArrowLeft;

  public establishment: any;
  public establishmentForm: any;

  constructor(private route: ActivatedRoute,private router: Router,private api: DataService,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    let establishmentId = this.route.snapshot.paramMap.get('id');
    if(!establishmentId) this.router.navigate(['home']);
    //get establishment
    let establishment = this.api.getEstablishment(establishmentId);
    if(!establishment) this.router.navigate(['home']);

    this.establishment = establishment;
    this.establishmentForm = this.formBuilder.group(establishment);
  }

  onBack(){
    this.router.navigate(['home']);
  }
  onSubmit(establishmentData) {
    this.api.updateEstablishment(establishmentData)
    this.router.navigate(['home']);
  }

}
