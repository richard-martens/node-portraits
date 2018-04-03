import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class MatImageLoaderService {

  constructor(private http: HttpClient) { }

  public uploadFile(file: File, apiEndPoint: string): Observable<object> {
    let formData: FormData = new FormData();
    let httpService = this.http;

    formData.append('uploadFile', file, file.name);

    return new Observable<object>((subscriber: Subscriber<object>) => {
      fetch(`${apiEndPoint}`, {
        method: 'POST',
        body: formData
      }).then((response:Response) => {
        if(response.status !== 200) {
          subscriber.error(new Error(response.statusText));
        } else {
          subscriber.next(response.json());
        }
        subscriber.complete();
      });
    });


    /*let headers = new HttpHeaders();
    // No need to include Content-Type in Angular 4 
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return httpService.post(`${apiEndPoint}`, formData, { headers: headers });*/

  }
}
