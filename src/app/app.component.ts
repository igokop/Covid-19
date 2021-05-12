import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sample } from './models/sample.model'

export interface Country {
  country: string,
  cases: {
    active: number,
    new: string,
    recovered: number,
    total: number
  },
  deaths: {
    new: string,
    total: number
  },
  tests: {
    total: number
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  table: Sample[] = [];
  cases: Country[] = [];
  dataSource = new MatTableDataSource(this.table);
  displayedColumns: string[] = ['country', 'newCases', 'newDeaths', 'recovered', 'tests', 'casesOverall', 'deathsOverall'];

  constructor(private apiService: ApiService){}
 
  ngOnInit(){
    this.apiService.getStats();
    this.apiService.updateStats.subscribe(data => {
      this.cases = data.response;
      for(let i=0; i<234; i++){
        if(this.cases[i].cases.new == null){
          this.cases[i].cases.new = '0';
        } else if(this.cases[i].cases.new){
          const  quantity = this.cases[i].cases.new.split('+')
          this.cases[i].cases.new = quantity[1];
        }

        if(this.cases[i].deaths.new == null){
          this.cases[i].deaths.new = '0';
        } else if(this.cases[i].deaths.new){
          const  quantity = this.cases[i].deaths.new.split('+')
          this.cases[i].deaths.new = quantity[1];
        }
        
        if(this.cases[i].tests.total == null){
          this.cases[i].tests.total = 0;
        }

        if(this.cases[i].cases.total == null){
          this.cases[i].cases.total = 0;
        } 

        if(this.cases[i].cases.recovered == null){
          this.cases[i].cases.recovered = 0;
        }

        if(this.cases[i].deaths.total == null){
          this.cases[i].deaths.total= 0;
        }
        
        let country = this.cases[i].country
        let newCases = +this.cases[i].cases.new
        let newDeaths = +this.cases[i].deaths.new
        let recovered = this.cases[i].cases.recovered
        let tests = this.cases[i].tests.total
        let casesOverall = this.cases[i].cases.total
        let deathsOverall = this.cases[i].deaths.total
        const stat = new Sample(country, newCases, newDeaths, recovered, tests, casesOverall, deathsOverall)
        this.table.push(stat);
      }
      this.dataSource = new MatTableDataSource(this.table);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter: string) => {
        if(data.country.trim().toLowerCase().includes(filter)){
          return true;
        }
      return false;
     };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
