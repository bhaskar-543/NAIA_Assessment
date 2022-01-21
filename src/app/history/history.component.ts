import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerFactory } from 'ag-grid-community';
import { AppService } from '../app.service';
import { patient } from '../dashboard/patientModel';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  patientDetails: any;
  patientHistory:any;

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['id']
      this.appService.getPatientDetails(id).subscribe((data) => {
        if (data) {
          this.patientDetails = data
          this.patientHistory = data['history']
          console.log("patient history data",this.patientHistory);
          
        }
      })
    })

  }

}
