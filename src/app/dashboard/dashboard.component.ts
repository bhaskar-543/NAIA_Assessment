import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { patient } from './patientModel';
import { HttpResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  modalRef!: BsModalRef;
  allPatientDetails: patient[] = [];
  header = ['name', 'age', 'sex', 'checkin'];
  genderList =['Male','Female','Undisclosed'];

  presentPatientDetails:any;

  addPatientForm!: patient;
  editPatientForm!: patient;

  errorMsgs = {
    nameError: false,
    ageError: false,
    checkInError: false
  }

  patientForm = this.formBuilder.group({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    sex: new FormControl(''),
    checkIn: new FormControl('', Validators.required)
  });

  constructor(private appService: AppService, private router: Router,
    private modalService: BsModalService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.appService.getAllPatientDetails().subscribe((data) => {

      this.allPatientDetails = data;
      console.log("patient Data", data);

    })

    // this.addPatient();
  }

  addPatient(addTemplate: TemplateRef<any>) {
    this.modalService.show(addTemplate);
    this.patientForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl(''),
      checkIn: new FormControl('', Validators.required)
    });
  }

  savePatient() {
    this.modalService.hide();

    this.patientForm.patchValue({
      checkIn: new DatePipe('en-US').transform(this.patientForm.get('checkIn')?.value, 'dd/MM/yyyy')
    })

    console.log("this.addPatientForm", this.patientForm.value);

    let insertData: patient = this.patientForm.value;
    this.appService.insertPatientdetails(insertData).subscribe((data) => {
      if (data) {
        this.allPatientDetails.push(data)
      }
    })

    this.patientForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl(''),
      checkIn: new FormControl('', Validators.required)
    });

    // if(this.addPatientForm.name == '' || this.addPatientForm.name.trim().length == 0){
    //   this.errorMsgs.nameError = true
    // }
    // if(this.addPatientForm.age == 0 || this.addPatientForm.age == undefined){
    //   this.errorMsgs.ageError = true
    // }
    // if(this.addPatientForm.checkIn == '' || this.addPatientForm.checkIn == undefined){
    //   this.errorMsgs.checkInError = true
    // }

  }

  updatePatientDetails(){

    this.modalService.hide();

    this.patientForm.patchValue({
      checkIn: new DatePipe('en-US').transform(this.patientForm.get('checkIn')?.value, 'dd/MM/yyyy')
    })

    // console.log("this.addPatientForm", this.patientForm.value);

    let updateData: patient = this.patientForm.value;
    this.appService.updatePatientDetails(this.presentPatientDetails['id'],updateData).subscribe((updateddata) => {
      if (updateddata) {
        console.log("updated successfully",updateddata);
        this.appService.getAllPatientDetails().subscribe((getData)=>{
          this.allPatientDetails = getData;
        })
      }
    })

    this.patientForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl(''),
      checkIn: new FormControl('', Validators.required)
    });

  }

  openEditModal(template: TemplateRef<any>, id?: number) {
    
    this.presentPatientDetails = this.allPatientDetails.find(element => element.id == id);

    let dateParts = this.presentPatientDetails['checkIn'].split("/");

    let date= new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    
    let tempDate = date.getFullYear()+'-'+(("0" + (date.getMonth() + 1)).slice(-2))+'-'+("0" + date.getDate()).slice(-2) ;
    

    this.patientForm = this.formBuilder.group({
      id: new FormControl(this.presentPatientDetails['id']),
      name: new FormControl(this.presentPatientDetails['name'], Validators.required),
      age: new FormControl(this.presentPatientDetails['age'], Validators.required),
      sex: new FormControl(this.presentPatientDetails['sex']),
      checkIn: new FormControl(tempDate, Validators.required)
    });

    this.modalService.show(template);
    console.log("the form details",this.patientForm);
    
    
  }



  openDeleteModal(deleteTemplate: TemplateRef<any>, id?: number) {
    this.presentPatientDetails = this.allPatientDetails.find(element => element.id == id);
    
    this.modalService.show(deleteTemplate);
  }
  deletePatient(id:number){
    this.modalService.hide();
    this.appService.deletePatientDetails(id).subscribe((delData)=>{
      console.log("deleted data",delData);
      if(delData){
        this.allPatientDetails = this.allPatientDetails.filter(element => element.id !==id)
      }
    })
  }

  history(id?: number) {
    console.log('history', id);

  }

  close() {
    this.modalService.hide();
    // this.patientForm = this.formBuilder.group({
    //   id: new FormControl(''),
    //   name: new FormControl('', Validators.required),
    //   age: new FormControl('', Validators.required),
    //   sex: new FormControl(''),
    //   checkIn: new FormControl('', Validators.required)
    // });
  }


}
