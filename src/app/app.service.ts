import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patient } from './dashboard/patientModel';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  patientDataUrl : String = "http://localhost:3000/patientDetails";
  constructor(private http:HttpClient) { }

  getPatientDetails(id:number){
    return this.http.get<patient>(this.patientDataUrl+'/'+id);
  }
  getAllPatientDetails(){
    return this.http.get<patient[]>(this.patientDataUrl+'');
  }

  insertPatientdetails(patient:patient){
    return this.http.post(this.patientDataUrl+'',patient)

  }
}
