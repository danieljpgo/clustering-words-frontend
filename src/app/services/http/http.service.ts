import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Interface
import {RequestParams, RequestAttribute} from '../../../utils/models/http.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly apiUrl: string = environment.apiUrl;

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }

  constructor(private readonly http: HttpClient) { }

  genericGet<T>(endpoint: string, id: string): Observable<T> {
    let url = `${this.apiUrl}/${endpoint}/${id}`;
    return this.http.get<T>(url)
      .pipe(map((response: T) => {
        return response;
      }))
      .pipe(catchError(HttpService.handleError));
  }

  genericGetList<T>(endpoint: string, requestParams: RequestParams, attribute?: RequestAttribute[]): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    let params = new HttpParams()
      .set('page', requestParams.page.toString())
      .set('sort', requestParams.sort)
      .set('limit', requestParams.limit.toString());
    if (!!attribute) {
      attribute.map((att) => params = params.append(att.param, att.value));
    }
    return this.http.get<T>(url, { params })
      .pipe(map((response: T) => {
        return response;
      }))
      .pipe(catchError(HttpService.handleError));
  }

  genericPost<T>(endpoint: string, data: any, headers: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<T>(url, data, httpOptions)
      .pipe(map((response: T) => {
        return response;
      }))
      .pipe(catchError(HttpService.handleError));
  }

  genericPut<T>(endpoint: string, id: string, data: any, customUrl?: string): Observable<T> {
    let url;
    if (!(!!customUrl)) {
      url = `${this.apiUrl}/${endpoint}/${id}`;
    } else {
      url = `${this.apiUrl}/${endpoint}/${id}${customUrl}`;
    }
    return this.http.put<T>(url, data)
      .pipe(map((response: T) => {
        return response;
      }))
      .pipe(catchError(HttpService.handleError));
  }

  genericDelete<T>(endpoint: string, id: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    return this.http.delete<T>(url)
      .pipe(map((response: T) => {
        return response;
      }))
      .pipe(catchError(HttpService.handleError));
  }
}
