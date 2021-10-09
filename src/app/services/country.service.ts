import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { RootObject } from '../models/country.model';

@Injectable({providedIn: 'root'})
export class CountryService {

    constructor(
        private http: HttpClient) {
    }

    getCountries() {
        
        const url = `https://cors-anywhere.herokuapp.com/https://api.first.org/data/v1/countries`; 
        return this.http.get<RootObject>(url);      
    }
}