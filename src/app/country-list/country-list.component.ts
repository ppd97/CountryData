import { Component, OnInit } from '@angular/core';
import { CountryListApiService } from '../services/country-list-api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { RootObject} from './country.model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  constructor(private countryServices:CountryListApiService,private router:Router) { }
  value!:string;
  countryData=<RootObject>{};
  dataArray:Array<RootObject>=new Array;
  countryCode?:string
  fullData:Array<RootObject>=new Array;
  getVal!:string;
  countries:Array<any>=new Array;
  control = new FormControl();
  filteredCountries!: Observable<string[]>;
  ngOnInit(): void {
    
    this.countryServices.getCountries().subscribe((res:any)=> {
      
      this.countryData=res;
      this.dataArray.push(this.countryData);
      //console.log("Country Data",Object.entries(this.countryData['data']['DZ']['country']))
      for(let i of this.dataArray)
      {
          for(let j of Object.entries ( i.data).map(([name,value])=>({name,value})))
          {
                this.fullData.push(j.value.country)
          }

      }
     
      this. filteredCountries = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  private _filter(value: any): any {
    const filterValue = this._normalizeValue(value);
    return this.fullData.filter(country => this._normalizeValue(country).includes(filterValue));
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
