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
  navigation = [{name: 'Dashboard', path: '/'}, {name: 'Jobs', path: '/job'}, {name: 'Requirements', path: '/requirement'}];


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
