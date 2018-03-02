import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JobType } from './shared/job-type.model';
import { Job } from './shared/job.models';
import { JobService } from './shared/job.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  private jobs: Job[];
  private jobTypes: JobType[];
  private type: JobType;
  private page: number;
  private limit: number;

  displayedColumns = ['job_id', 'title', 'industry', 'location', 'date_created', 'date_updated', 'available'];
  dataSource: MatTableDataSource<Job>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobTypes = [new JobType(0, 'All'), new JobType(1, 'Mechanical'), new JobType(2, 'Electrical'), new JobType(3, 'Civil')];
    this.type = this.jobTypes[0];
    this.page = 0;
    this.limit = 100;
    this.search(0);

  }

  search(page: number) {
    const type = this.type.type_id ? this.type.industry : '';
    this.jobService.jobs(this.page + page, this.limit, type).subscribe(data => {
      this.jobs = data;
      this.page = this.page + page;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.setSortPaginator();
    });
  }

  delete(jobID) {
    console.log(jobID);
  }

  setSortPaginator() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
