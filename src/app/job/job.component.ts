import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JobType } from './shared/job-type.model';
import { Job } from './shared/job.models';
import { JobService } from './shared/job.service';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { JobDialogComponent } from './job-dialog/job-dialog.component';
import { AuthenticationService } from '../login/shared/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  private job: Job;
  private jobTypes: JobType[];
  private type: JobType;
  private page: number;
  private limit: number;

  displayedColumns = ['job_id', 'title', 'industry', 'location', 'date_created', 'date_updated', 'available'];
  dataSource: MatTableDataSource<Job>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _service: AuthenticationService,
              private jobService: JobService, public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this._service.checkCredentials()) {
      this.snackBar.open('Please login to access this section!', '', { duration: 2000});
      this._service.logout();
      return;
    }
    this.jobTypes = [new JobType(0, 'All'), new JobType(1, 'Mechanical'), new JobType(2, 'Electrical'), new JobType(3, 'Civil')];
    this.type = this.jobTypes[0];
    this.page = 0;
    this.limit = 100;
    this.search(0);

  }

  search(page: number) {
    const type = this.type.type_id ? this.type.industry : '';
    this.jobService.jobs(this.page + page, this.limit, type).subscribe(data => {
      this.page = this.page + page;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.setSortPaginator();
    });
  }

  edit(job) {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: 'auto',
      data: job || new Job(),
      panelClass: 'no-padding'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('The dialog was closed', result);
      this.job = { ...result, type_id: this.jobType(result.industry)};
      this.jobService.edit(this.job).subscribe(data => {
        this.snackBar.open(data, '', { duration: 2000, extraClasses: ['snackbar']});
        this.search(0);
      }, err => {
        this.snackBar.open('Could not save!', '', { duration: 2000, extraClasses: ['snackbar']});
      });
    });
  }

  delete(jobID) {
    this.jobService.delete(jobID).subscribe( data => {
      this.snackBar.open(data, '', { duration: 2000});
      this.search(0);
    });
  }

  jobType(industry) {
    return this.jobTypes.filter( type => type.industry === industry)[0].type_id;
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
