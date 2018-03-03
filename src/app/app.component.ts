import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/shared/authenticate.service';
import { User } from './login/shared/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy, OnInit {
  user: User;
  authenticated: boolean;
  title = 'Manpower Admin';
  titleSidebar = 'Manpower Admin';
  mobileQuery: MediaQueryList;
  navigation = [{name: 'Dashboard', path: '/'}, {name: 'Jobs', path: '/job'}, {name: 'Requirements', path: '/party'}];


  private _mobileQueryListener: () => void;

  constructor(private _router: Router, private _service: AuthenticationService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public snackBar: MatSnackBar) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = new User(localStorage.getItem('username'), localStorage.getItem('password'));

  }

  ngOnInit() {
    this.login();
    this._service.change.subscribe(type => {
      console.log(type, 'authenticated');
      this.authenticated = type;
    });
  }

  login() {
    this._service.login(this.user).subscribe(res => {
      this.snackBar.open('Logged in successfully!', '', {duration: 2000, extraClasses: ['snackbar']});
      this.authenticated = true;
    }, err => {
      this.snackBar.open('Please login to access dashboard!', '', {duration: 2000, extraClasses: ['snackbar']});
      this._service.logout();
      this.user = new User('', '');
      this.authenticated = false;
    });
  }

  loggedIn() {
    return this._service.checkCredentials();
  }

  logout() {
    this._service.logout();
    this.authenticated = false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  home() {
    this._router.navigate(['/home']);
  }

}
