import { InfoCovidComponent } from './info-covid/info-covid.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo:"/home",
    pathMatch:"full"
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"infocovid",
    component: InfoCovidComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
