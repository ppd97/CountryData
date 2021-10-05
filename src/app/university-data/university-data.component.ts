import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UniversityListApiService } from '../services/university-list-api.service';
import { IuniversityData } from '../models/university.model';
import {MatPaginator} from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-university-data',
  templateUrl: './university-data.component.html',
  styleUrls: ['./university-data.component.css']
})
export class UniversityDataComponent implements OnInit {
countryCode!:any
university!:IuniversityData[];
i!:number;
j!:number;
 
displayedColumns: string[] = ['name','domains','web_pages'];
dataSource=new MatTableDataSource<IuniversityData>(this.university);
@ViewChild(MatPaginator,{static:true})paginator!:MatPaginator;
constructor(private route:ActivatedRoute, private universities:UniversityListApiService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param =>{
      this.countryCode=param.get('country')
    })
    this.allData();
    this.dataSource.paginator=this.paginator;
    //this.universities.getUniversities(this.countryCode).subscribe(res =>this.dataSource as IuniversityData[]);
      // console.log(Object.keys(res).length)
      // this.j=Object.keys(res).length-1
      // for(this.i=0;this.i<= this.j;this.i++)
      // {
      //   this.university.push(Object.values(res)[this.i]) 
      // }
      // console.log("University Data",this.university)

  }
  public allData()
  {
    let resp=this.universities.getUniversities(this.countryCode)
    resp.subscribe(display=>this.dataSource.data=display as IuniversityData[])
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  

}


