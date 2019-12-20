import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DashboardService} from '../services/dashboard.service';
import {RequestParams} from '../../../../../utils/models/http.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  requestParams: RequestParams = {
    sort: '',
    order: '',
    page: 1,
    limit: 30
  };

  // Form
  vocabularyForm: FormGroup;

  response;

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) {
    this.vocabularyForm = this.formBuilder.group({
      text: [null,
        Validators.required
      ],
      options: [0,
        Validators.required
      ]
    });
  }

  ngOnInit(): void {
    this.dashboardService.listVocabularies(this.requestParams)
      .subscribe((vocabularies) => {
        console.log(vocabularies);
      });
  }

  handleSubmit(): void {
    const data = { text: this.vocabularyForm.get('text').value };

    console.log(this.dashboardService);

    this.dashboardService.createVocabularies(data)
      .subscribe((test) => {
        console.log(test);
      }, error => {
        console.log(error);
      });
    // console.log(this.vocabularyForm.get('text').value);
  }

}
