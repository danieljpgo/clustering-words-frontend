import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DashboardService} from '../services/dashboard.service';
import {RequestParams} from '../../../../../utils/models/http.interface';
import {animations} from '../../../../../utils/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: animations
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
  vocabularyGenForm: FormGroup;

  vocabularies = [];
  selectId;
  respost;

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) {
    this.vocabularyForm = this.formBuilder.group({
      text: [null,
        Validators.required
      ]
    });
    this.vocabularyGenForm = this.formBuilder.group({
      options: [0,
        Validators.required
      ]
    });
  }

  ngOnInit(): void {
    this.handleListVocab();
  }

  handleSubmitText(): void {
    const data = { text: this.vocabularyForm.get('text').value };
    this.dashboardService.createVocabularies(data)
      .subscribe(() => {
        this.handleListVocab();
      }, error => {
        console.log(error);
      });
  }


  handleSelect(vocabulary: any): void {
    this.selectId = vocabulary.id;
  }

  handleSelectGen(id: string): void {
    switch (this.vocabularyGenForm.get('options').value) {
      case 0: this.dashboardService.getVocabIsolated(id)
        .subscribe((value) => {
          this.respost = value;
        });
              break;
      case 1: this.dashboardService.getVocabGroup(id)
        .subscribe((value) => {
          this.respost = value;
        });
              break;
      case 2: this.dashboardService.getVocabIsolatedVector(id)
        .subscribe((value) => {
          this.respost = value;
        });
              break;
      case 3: this.dashboardService.getVocabGroupVector(id)
        .subscribe((value) => {
          this.respost = value;
        });
              break;
    }
  }

  handleListVocab(): void {
    this.dashboardService.listVocabularies(this.requestParams)
      .subscribe((vocabularies: any[]) => {
        this.vocabularies = vocabularies;
      });
  }

}
