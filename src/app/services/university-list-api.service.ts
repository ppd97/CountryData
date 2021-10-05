import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UniversityListApiService {

  constructor(private http: HttpClient) { }
  proxy= 'https://cors-anywhere.herokuapp.com/';
  url= `https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=`;
  urlPath!:string;
  getUniversities(pass: string)
  {
    this.urlPath=this.url+pass
    return this.http.get(this.urlPath);
  }
}
