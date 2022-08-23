import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}
 

  dummyData(pageNumber, pageSize) {
    return this.http.get('http://gl.ttechapps.info/api/Store/Colors/GetListOfColors', {
      params: new HttpParams().set('PageNumber', pageNumber).set('PageSize', pageSize)
    })
  }

}
