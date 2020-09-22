import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component';
import { EstablishmentComponent } from './components/establishment/establishment.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: 'home', component: EstablishmentListComponent },
  { path: 'establishment/:id', component: EstablishmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
