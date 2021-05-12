import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  updateStats: EventEmitter<any> = new EventEmitter();

  getStats(){
    let headers = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '7b76a6be8dmsh41239617554ee04p1967b7jsn01aeae444e9c',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
      })
    }
    this.http.get('https://covid-193.p.rapidapi.com/statistics', headers).subscribe(data =>{
      this.updateStats.emit(data);
    })
  }
}
