import { Component, OnInit } from '@angular/core';
import { CountryListApiService } from '../services/country-list-api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  constructor(private countryServices:CountryListApiService,private router:Router) { }
  value!:string;
  countryData!:any;
  countryCode?:string
  country=[]
  regions=[]
  full!:string;
  fullregions!:string;
  getVal!:string;
  countries:Array<any>=new Array;
  control = new FormControl();
  filteredCountries!: Observable<string[]>;
  ngOnInit(): void {
    
    this.countryServices.getCountries().subscribe(res => {
      console.log(res)
      
      this.countryData=res;
      for ([this.value] of Object.entries(this.countryData['data'])) {
        this.country=this.countryData['data'][`${this.value}`]['country'];
        // this.regions=this.countryData['data'][`${this.value}`]['region']
        // this.full=`${this.country}`
        // this.fullregions=`${this.regions}`
        console.log("DataData:",this.countryData['data'][`${this.value}`])
         this.countries.push(this.country)
        
      }
      console.log(this.countries)
      this. filteredCountries = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  private _filter(value: any): any {
    const filterValue = this._normalizeValue(value);
    return this.countries.filter(country => this._normalizeValue(country).includes(filterValue));
  }
  private _normalizeValue(value: any) {
    return value.toLowerCase().replace(/\s/g, '');
  }

  OnInput()
  {
    console.log(this.control.value);
    this.countryCode=this.control.value
    this.router.navigate(['university',this.countryCode])
  }
 

}
