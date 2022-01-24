import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { patient } from './patientModel';
import { HttpResponse } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild("editModal") edit_Template!: TemplateRef<any>;
  @ViewChild("addPatientModal") add_Template!: TemplateRef<any>;
  @ViewChild("deleteModal") delete_Template!: TemplateRef<any>;

  allPatientDetails: patient[] = [];

  //-----ag grid-------//
  gridApi:any;
  columnDefs: ColDef[] = [

    { headerName: 'Name', field: 'name' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Sex', field: 'sex' },
    { headerName: 'Check-in', field: 'checkIn' },
    { headerName: 'Actions', cellRenderer:
    function (params) {
      return  '<div class="grid-action-cell action-button update d-flex justify-content-around" >'+
      '<img data-action="edit" title="Open an Edit modal" src="assets/svg/pencil-fill.svg" />'+
      '<img data-action="delete" title="Open the Delete modal" src="assets/svg/trash.svg" />'+
      '<img data-action="history" src="assets/svg/doctor.svg" title="Open the Patient s History page" style="width: 24px;height: 24px;" />'+
      '</div>'
      
    } 
    }
  ];
  //---------aggrid----------//

  modalRef!: BsModalRef;
  // allPatientDetails: patient[] = [];
  header = ['name', 'age', 'sex', 'checkin'];
  genderList = ['Male', 'Female', 'Undisclosed'];

  presentPatientDetails: any;

  addPatientForm!: patient;
  editPatientForm!: patient;

  submittedForm: boolean = false;

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
    private modalService: BsModalService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.appService.getAllPatientDetails().subscribe((data) => {

      this.allPatientDetails = data;
      console.log("patient Data", data);
    })

    // this.addPatient();
  }

  addPatient(addTemplate: TemplateRef<any>) {
    this.submittedForm = false;
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
    this.submittedForm = true;
    if (this.patientForm.invalid) {
      return
    }
    this.modalService.hide();

    this.patientForm.patchValue({
      checkIn: new DatePipe('en-US').transform(this.patientForm.get('checkIn')?.value, 'dd/MM/yyyy')
    })

    console.log("this.addPatientForm", this.patientForm.value);

    let insertData: patient = this.patientForm.value;
    this.appService.insertPatientdetails(insertData).subscribe((data) => {
      if (data) {
        this.toastr.success('New Patient Details added Successfully', 'Success Notification');
        this.allPatientDetails.push(data);
        this.gridApi.refreshView();
      }
    })

  }

  updatePatientDetails() {
    this.submittedForm = true;
    if (this.patientForm.invalid) {
      return;
    }

    this.modalService.hide();

    this.patientForm.patchValue({
      checkIn: new DatePipe('en-US').transform(this.patientForm.get('checkIn')?.value, 'dd/MM/yyyy')
    })

    // console.log("this.addPatientForm", this.patientForm.value);

    let updateData: patient = this.patientForm.value;
    this.appService.updatePatientDetails(this.presentPatientDetails['id'], updateData).subscribe((updateddata) => {
      if (updateddata) {
        console.log("updated successfully", updateddata);
        this.toastr.success('Patient Details updated Successfully', 'Success Notification');
        this.appService.getAllPatientDetails().subscribe((getData) => {
          this.allPatientDetails = getData;
          this.gridApi.refreshView();
        })
      }
    })

  }

  openEditModal(template: TemplateRef<any>, id?: number) {
    this.submittedForm = false;

    this.presentPatientDetails = this.allPatientDetails.find(element => element.id == id);

    let dateParts = this.presentPatientDetails['checkIn'].split("/");
    let date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    let tempDate = date.getFullYear() + '-' + (("0" + (date.getMonth() + 1)).slice(-2)) + '-' + ("0" + date.getDate()).slice(-2);


    this.patientForm = this.formBuilder.group({
      id: new FormControl(this.presentPatientDetails['id']),
      name: new FormControl(this.presentPatientDetails['name'], Validators.required),
      age: new FormControl(this.presentPatientDetails['age'], Validators.required),
      sex: new FormControl(this.presentPatientDetails['sex']),
      checkIn: new FormControl(tempDate, Validators.required)
    });

    this.modalService.show(template);
    console.log("the form details", this.patientForm);


  }



  openDeleteModal(deleteTemplate: TemplateRef<any>, id?: number) {
    this.presentPatientDetails = this.allPatientDetails.find(element => element.id == id);

    this.modalService.show(deleteTemplate);
  }
  deletePatient(id: number) {
    this.modalService.hide();
    this.appService.deletePatientDetails(id).subscribe((delData) => {
      console.log("deleted data", delData);
      if (delData) {
        this.toastr.success('Patient Details Deleted Successfully', 'Success Notification');
        this.allPatientDetails = this.allPatientDetails.filter(element => element.id !== id)
      }
    })
  }

  history(id?: number) {
    console.log('history', id);

  }

  close() {
    this.modalService.hide();
    
  }

  
  onCellClicked(params:any){
    let action = params.event.target.dataset.action
    
    if(action == 'edit'){
      this.openEditModal(this.edit_Template,params.data.id)
    }else if(action == 'delete'){
      this.openDeleteModal(this.delete_Template, params.data.id)
    }else if(action == 'history'){
      this.router.navigateByUrl('/history/'+params.data.id)
    }
  }
  onGridReady(params:any){
    this.gridApi = params.api;
  }


}
