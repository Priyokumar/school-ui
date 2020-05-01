import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiEndpoint } from '../model/shared.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();

  sendDocUrl(docUrl: string) {
    this.subject.next({ docUrl });
  }

  getDocUrl(): Observable<any> {
    return this.subject.asObservable();
  }

  uploadDoc(file: File, id: number | string, docFor: string, type: string, name: string): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    const documentBody: DocumentBody = {
      docFor,
      name,
      type
    };

    formdata.append('file', file);
    formdata.append('documentBody', JSON.stringify(documentBody));

    const url = ApiEndpoint.DOCUMENT + '/' + id + '/upload';
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getExtension(fileName: string) {
    const splits = fileName.split('.');
    return '.' + splits[splits.length - 1];
  }

}

export interface DocumentBody {

  docFor: string;
  type: string;
  name: string;

}
