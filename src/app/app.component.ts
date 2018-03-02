import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import { MatCheckbox } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Manpower Admin';
  titleSidebar = 'Manpower Admin';
  mobileQuery: MediaQueryList;
  fillerNav = ['Dashboard', 'Jobs', 'Requirements'];
  jobs = [{name: 'Mechanical', count: 20}, {name: 'Electrical', count: 40}, {name: 'Civil', count: 25}];
  requests = [{name: 'Client', count: 20}, {name: 'Contractor', count: 40}, {name: 'Candidate', count: 25}];
  dashboard = [{title: 'Jobs', content: this.jobs}, {title: 'Requests', content: this.requests}];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
