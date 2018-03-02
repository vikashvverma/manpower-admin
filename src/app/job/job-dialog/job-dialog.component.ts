import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { JobType } from '../shared/job-type.model';
import { JobService } from '../shared/job.service';
import { JobTitle } from '../shared/job-title.model';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JobDialogComponent implements OnInit {
  private id: number;
  jobTypes: JobType[];
  selected: string;
  jobTitles: JobTitle[];
  jobTitle: JobTitle;
  selectedTitle: string;

  constructor(public dialogRef: MatDialogRef<JobDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private jobService: JobService) {
    this.jobTypes = [new JobType(1, 'Mechanical'), new JobType(2, 'Electrical'), new JobType(3, 'Civil')];
  }

  ngOnInit() {
    this.id = this.data.job_id;
    this.selected = this.data.industry || 'Mechanical';
    this.selectedTitle = this.data.title;
    this.pickTitle();
  }

  pickTitle() {
    this.jobService.titles(this.jobType(this.selected)).subscribe(res => {
      this.jobTitles = res;
      this.selectedTitle = this.jobTitles[0].title;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  jobType(industry) {
    return this.jobTypes.filter( type => type.industry === industry)[0].type_id;
  }

}
