import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../../services/http/http.service';

// Interface
import {RequestParams} from '../../../../../utils/models/http.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Endpoints
  private readonly endpointVocabularies: string = 'vocabularies';
  private readonly endpointVocabIsolated: string = 'vocabularies/isolated';
  private readonly endpointVocabIsolatedVector: string = 'vocabularies/isolated/vector';
  private readonly endpointVocabGroup: string = 'vocabularies/group';
  private readonly endpointVocabGroupVector: string = 'vocabularies/group/vector';

  constructor(private readonly httpService: HttpService) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Vocabularies
  // -----------------------------------------------------------------------------------------------------

  listVocabularies(requestParams: RequestParams): Observable<[]> {
    return this.httpService.genericGetList<any>(this.endpointVocabularies, requestParams, [])
      .pipe(map((response: []) => response));
  }

  createVocabularies(data: any): Observable<any> {
    return this.httpService.genericPost<any>(this.endpointVocabularies, data, '')
      .pipe(map((response: any) => response));
  }

  getVocabIsolated(id: string): Observable<any> {
    return this.httpService.genericGet<any>(this.endpointVocabIsolated, id)
      .pipe(map((response: any) => response));
  }

  getVocabIsolatedVector(id: string): Observable<any> {
    return this.httpService.genericGet<any>(this.endpointVocabIsolatedVector, id)
      .pipe(map((response: any) => response));
  }

  getVocabGroup(id: string): Observable<any> {
    return this.httpService.genericGet<any>(this.endpointVocabGroup, id)
      .pipe(map((response: any) => response));
  }

  getVocabGroupVector(id: string): Observable<any> {
    return this.httpService.genericGet<any>(this.endpointVocabGroupVector, id)
      .pipe(map((response: any) => response));
  }


}
