import { Component, OnInit } from '@angular/core';
import { JobService } from '../job/shared/job.service';
import { PartyService } from '../party/shared/party.service';
import { AuthenticationService } from '../login/shared/authenticate.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs = [{name: 'Mechanical', count: 0, img: './../../assets/img/client.png'}, {name: 'Electrical', count: 0, img: './../../assets/img/contractor.png'}, {name: 'Civil', count: 0, img: './../../assets/img/candidate.png'}];
  requests = [{name: 'Client', count: 0, img: './../../assets/img/client.png'}, {name: 'Contractor', count: 0, img: './../../assets/img/contractor.png'}, {name: 'Candidate', count: 0, img: './../../assets/img/candidate.png'}];
  dashboard = [{title: 'Jobs', content: this.jobs}, {title: 'Requests', content: this.requests}];
  constructor(private _router: Router, private _service: AuthenticationService,
              private jobSerice: JobService, private partyservice: PartyService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (!this._service.checkCredentials()) {
      this.snackBar.open('Please login to access this section!', '', { duration: 2000});
      this._service.logout();
      return;
    }
    this.stats();
  }

  stats() {
    this.jobSerice.jobs(0, 100, '').subscribe( res => {
      let mech = 0, elec = 0, civ = 0;
      res.map( job => {
        switch (job.industry) {
          case 'Mechanical': mech++; break;
          case 'Electrical': elec++; break;
          case 'Civil': civ++; break;
        }
      });
      this.jobs[0].count = mech;
      this.jobs[1].count = elec;
      this.jobs[2].count = civ;
    });
    this.partyservice.party().subscribe(res => {
      let client = 0, cand = 0;
      res.map( party => {
        party.query.industry && party.query.title ? cand++ : client++;
      });
      this.requests[0].count = client;
      this.requests[1].count = client;
      this.requests[2].count = cand;
    });
  }
}
