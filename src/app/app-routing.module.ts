import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { UniversityDataComponent } from './university-data/university-data.component';


const routes: Routes = [
    {path:'',redirectTo:'country-List',pathMatch:'full'},
    {path:'country-List',component:CountryListComponent},
    {path:'university/:country',component:UniversityDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }