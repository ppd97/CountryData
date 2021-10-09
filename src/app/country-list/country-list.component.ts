import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RootObject} from '../models/country.model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

    private countryData:Array<RootObject>=new Array;
    private countryCode!:string
    public  selectControl = new FormControl();
    public options: Array<RootObject>=new Array;

    constructor(
        private countryServices:CountryService,private router:Router) {
          
          }
 
    ngOnInit(): void {
    
        this.countryServices.getCountries().subscribe((res:RootObject)=> {
            
            this.countryData.push(res);
      
              for(let i of this.countryData ){
                  for(let j of Object.entries ( i.data).map(([name,value])=>({name,value}))){
                       this.options.push(j.value.country)
                    }
                }
               
          });    
    }
  
    OnInput(){
      this.countryCode=this.selectControl.value;
      this.router.navigate(['university',this.countryCode])
    }
    
 
}
