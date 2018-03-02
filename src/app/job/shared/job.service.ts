import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Job} from './job.models';

@Injectable()
export class JobService {

  constructor(
    private http: HttpClient,
  ) { }
  jobs(page: number, limit: number, type: string): Observable<Job[]> {
    const url = `http://localhost:3333/api/manpower/job?page=${page}&limit=${limit}&type=${type}`;
    return this.http.get<Job[]>(url);
  }
}
