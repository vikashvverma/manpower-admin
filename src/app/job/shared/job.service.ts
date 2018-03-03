import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Job } from './job.models';
import { JobTitle } from './job-title.model';

@Injectable()
export class JobService {

  constructor(private http: HttpClient) {
  }

  jobs(page: number, limit: number, type: string): Observable<Job[]> {
    const url = `/api/manpower/job?page=${page}&limit=${limit}&type=${type}`;
    return this.http.get<Job[]>(url);
  }

  edit(job: Job) {
    const url = `/api/manpower/job`;
    const payload = {
      job_id: job.job_id,
      title: job.title,
      location: job.location,
      industry: job.industry,
      available: job.available,
      type_id: job.type_id,
    };
    return this.http.post<string>(url, payload);
  }

  delete(jobID: number) {
    const url = `/api/manpower/job/${jobID}`;
    return this.http.delete<string>(url);
  }

  titles(type: number): Observable<JobTitle[]> {
    const url = `/api/manpower/job/type/${type}`;
    return this.http.get<JobTitle[]>(url);
  }
}
