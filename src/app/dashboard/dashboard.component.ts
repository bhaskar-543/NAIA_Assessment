import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { patient } from './patientModel';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  display = "none";

  allPatientDetails: patient[] =[];
  header =['name','age','sex','checkin']


  constructor(private appService: AppService , private router:Router) { 
  }

  ngOnInit(): void {
    this.appService.getAllPatientDetails().subscribe((data)=>{

      this.allPatientDetails = data;
      console.log("patient Data",data);

    })

    // this.addPatient();
  }

  addPatient(){
    let temp:patient ={
      name:'temp',
      age:20,
      sex:'male',
      checkIn:'27/04/1998'
    }
    this.appService.insertPatientdetails(temp).subscribe((data)=>{
      console.log("inserted data successfully",data);
      this.appService.getAllPatientDetails().subscribe(data=>{
        this.allPatientDetails=data
      })
      
    })
    console.log("add patient button clicked");
  }

  edit(id?:number){
    console.log("patient",id);
    this.display = "block";
  }
  delete(id?:number){
    console.log("delete",id);
  }

  history(id?:number){
    console.log('history',id);
    
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
