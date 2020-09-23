import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss']
})
export class EstablishmentComponent implements OnInit {
  public iconArrowLeft =  faArrowLeft;

  public establishment: any = {
    account: "",
    account_d: "",
    account_type: "",
    address: "",
    agency: "",
    agency_d: "",
    bank: "",
    bank_draft: "",
    city: " ",
    id: "",
    identification_document: "",
    index: 0,
    name: "",
    picture: "http://placehold.it/32x32",
  };
  public establishmentForm: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,private api: DataService,private formBuilder: FormBuilder) {
    this.establishmentForm = this.formBuilder.group(this.establishment);
  }

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments(){
    let establishmentId = this.route.snapshot.paramMap.get('id');
    if(!establishmentId) this.router.navigate(['home']);

    this.api.getById(establishmentId).then(data => {
      this.establishment = data;
      this.establishmentForm = this.formBuilder.group(this.establishment);
    }).catch(() => this.router.navigate(['home']));


  }
  onBack(){
    this.router.navigate(['home']);
  }
  onSubmit(establishmentData) {
    this.api.updateEstablishment(establishmentData).then(() => this.router.navigate(['home']));
  }

  onKeyUp(e:any){
    let inputValue = e.target.value;
    console.log(inputValue);
    if(!/^\d*\.?\d*$/.test(inputValue)){
      e.target.value = inputValue.replace(/^\d*\.?\d*$/,'')
    }
  }
}
