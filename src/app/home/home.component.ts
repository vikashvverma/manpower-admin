import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs = [{name: 'Mechanical', count: 20}, {name: 'Electrical', count: 40}, {name: 'Civil', count: 25}];
  requests = [{name: 'Client', count: 20}, {name: 'Contractor', count: 40}, {name: 'Candidate', count: 25}];
  dashboard = [{title: 'Jobs', content: this.jobs}, {title: 'Requests', content: this.requests}];
  constructor() { }

  ngOnInit() {
  }

}
