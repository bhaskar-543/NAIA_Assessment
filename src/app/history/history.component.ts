import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerFactory } from 'ag-grid-community';
import { AppService } from '../app.service';
import { patient } from '../dashboard/patientModel';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  smokingDetails = ['Heavy Smoker','Moderate Smoker','Light Smoker','Casual Smoker','Non-Smoker']
  drinkingDetails =['Heavy Drinker','Moderate Drinker','Light Drinker','Casual Drinker','Non-Drinker']
  drugsDetails = ['Amphetamines','Heroine','Barbiturates','Marijuana','No Drugs']
  surgeryDetails = ['Heart Surgery','Breast Surgery','Leg Surgery','Arm Surgery']

  patientDetails!: patient;
  patientHistory:any;
  id!:number;

  constructor(private route: ActivatedRoute, private appService: AppService,private formBuilder: FormBuilder) { }


  historyForm = this.formBuilder.group({
    basicStats: this.formBuilder.group({
      height:new FormControl('', Validators.required),
      weight:new FormControl('', Validators.required),
    }),
    smoking: new FormControl('', Validators.required),
    alcoholDrinking: new FormControl('', Validators.required),
    drugUsage: this.formBuilder.array(this.drugsDetails.map(x => !1)),
    surgeries: this.formBuilder.array(this.surgeryDetails.map(x => !1)) ,
    otherDrugUsage: new FormControl(''),
    otherSurgery: new FormControl(''),
  });
  

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.appService.getPatientDetails(this.id).subscribe((data) => {
        if (data) {
          this.patientDetails = data
          if(data['history']){
            this.historyForm = this.formBuilder.group({
              basicStats: this.formBuilder.group({
                height:new FormControl(this.patientDetails.history?.basicStats.height, Validators.required),
                weight:new FormControl(this.patientDetails.history?.basicStats.weight, Validators.required),
              }),
              smoking: new FormControl(this.patientDetails.history?.smoking, Validators.required),
              alcoholDrinking: new FormControl(this.patientDetails.history?.alcoholDrinking, Validators.required),
              drugUsage: this.formBuilder.array(this.drugsDetails.map(x => this.patientDetails.history?.drugUsage.includes(x))),
              surgeries: this.formBuilder.array(this.drugsDetails.map(x => this.patientDetails.history?.drugUsage.includes(x))) ,
              otherDrugUsage: new FormControl(this.patientDetails.history?.otherDrugUsage),
              otherSurgery: new FormControl(this.patientDetails.history?.otherSurgery),
            });

          }
          console.log("patient history data",this.patientHistory);
          
        }
      })
    })
  }

  saveHistoryDetails(){
    console.log("History form ",this.historyForm.value);

    let saveHistoryObj:any ={};

    saveHistoryObj['history']=this.historyForm.value;
    saveHistoryObj['history']['drugUsage'] = this.drugsDetails.filter((drug,i)=>{
      return (this.historyForm.get('drugUsage')?.value[i])
    })
    saveHistoryObj['history']['surgeries'] = this.surgeryDetails.filter((surgery,i)=>{
      return (this.historyForm.get('surgeries')?.value[i])
    })
    console.log("saveHistoryObj",saveHistoryObj);
    console.log("saveHistoryObj validity",this.historyForm.invalid);

   
    this.appService.updatePatientHistoryDetails(this.id,saveHistoryObj).subscribe((patchedData)=>{
      console.log("patched Data",patchedData);
      
    })

    
    
  }

  getBMI(){
    let height= this.historyForm.get('basicStats')?.get('height')?.value;
    let weight= this.historyForm.get('basicStats')?.get('weight')?.value;
    if(height && weight){
        return (weight / ((height * height) / 10000)).toFixed(2)
    }else{
      return 'BMI'
    }
  }

}
