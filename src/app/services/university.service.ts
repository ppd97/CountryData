import {Injectable} from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UniversityService {
    
    constructor(
        private http: HttpClient) {
    }

    getUniversities(pass:string |null ) {
        
        const url = `http://universities.hipolabs.com/search?country=${pass}`;
        return this.http.get(url);      
    }
}
