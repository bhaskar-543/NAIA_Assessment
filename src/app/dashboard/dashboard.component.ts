import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { patient } from './patientModel';
import { HttpResponse } from '@angular/common/http';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  modalRef!:BsModalRef ;
  allPatientDetails: patient[] =[];
  header =['name','age','sex','checkin']


  constructor(private appService: AppService , private router:Router  ,private modalService:BsModalService) { 
  }

  ngOnInit(): void {
    this.appService.getAllPatientDetails().subscribe((data)=>{

      this.allPatientDetails = data;
      console.log("patient Data",data);

    })

    // this.addPatient();
  }

  addPatient(addTemplate:TemplateRef<any>){
    this.modalService.show(addTemplate);
    // console.log("patient",id);

    // let temp:patient ={
    //   name:'temp',
    //   age:20,
    //   sex:'male',
    //   checkIn:'27/04/1998'
    // }
    // this.appService.insertPatientdetails(temp).subscribe((data)=>{
    //   console.log("inserted data successfully",data);
    //   this.appService.getAllPatientDetails().subscribe(data=>{
    //     this.allPatientDetails=data
    //   })
      
    // })
    // console.log("add patient button clicked");
  }

  edit(template:TemplateRef<any> ,id?:number){
    this.modalService.show(template)
    console.log("patient",id);
  }
  delete(deleteTemplate:TemplateRef<any>,id?:number){
    this.modalService.show(deleteTemplate)
    console.log("delete",id);
  }

  history(id?:number){
    console.log('history',id);
    
  }


}
