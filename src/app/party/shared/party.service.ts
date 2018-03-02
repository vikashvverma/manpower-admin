import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import {Party} from './party.models';
import { JobTitle } from '../../job/shared/job-title.model';

@Injectable()
export class PartyService {
private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
  save(party: Party): Observable<any> {
    const url = '/api/manpower/party';
    return this.http.post(url, JSON.stringify(party)).retry(3);
  }
  party(): Observable<Party[]> {
    const url = `/api/manpower/party`;
    return this.http.get<Party[]>(url);
  }
}
