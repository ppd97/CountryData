import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CountryListApiService {
  proxy = 'https://cors-anywhere.herokuapp.com/';
  url=`${this.proxy}https://api.first.org/data/v1/countries`;
  constructor(private http: HttpClient) { }

  getCountries()
  {
    return this.http.get(this.url);
  }

}
