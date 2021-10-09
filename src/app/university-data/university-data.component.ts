import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UniversityService } from '../services/university.service';
import { IuniversityData } from '../models/university.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-university-data',
  templateUrl: './university-data.component.html',
  styleUrls: ['./university-data.component.css']
})
export class UniversityDataComponent implements OnInit {
  //Declarations
    public countryCode!:string | null;
    public university!:IuniversityData[];
    displayedColumns: string[] = ['name','domains','web_pages'];
    dataSource = new MatTableDataSource<IuniversityData>(
        this.university
      );

    @ViewChild(
      MatPaginator,
      {
          static:true
      })
      paginator!:MatPaginator;

    //Methods
    constructor(
        private route:ActivatedRoute, private universities:UniversityService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            param =>{
               const countryName = param.get('country')
               this.countryCode=countryName
            });
            
        this.allData();
        this.dataSource.paginator = this.paginator;
    }

    public allData(){
        let response = this.universities.getUniversities(this.countryCode)
        response.subscribe(
            display=>this.dataSource.data=display as IuniversityData[]
          )
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

  }