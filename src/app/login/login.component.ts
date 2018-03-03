import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './shared/authenticate.service';
import { User } from './shared/user.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
  public user: User;

  constructor(private _router: Router, private _service: AuthenticationService, public snackBar: MatSnackBar) {
    this.user = new User('', '');
  }

  ngOnInit() {
    if (this._service.checkCredentials()) {
      this._router.navigate(['/home']);
    }
  }

  login() {
    if (this.user.username === '' || this.user.password === '') {
      this.snackBar.open('All fields are necessary!', '', {duration: 2000, extraClasses: ['snackbar']});
      return;
    }

    this._service.login(this.user).subscribe(res => {
      this.snackBar.open('Logged in successfully!', '', {duration: 2000, extraClasses: ['snackbar']});
      localStorage.setItem('username', this.user.username);
      localStorage.setItem('password', this.user.password);
      this._router.navigate(['/home']);
      this._service.emit(true);
      window.location.reload();
    }, err => {
      this._service.logout();
      this.snackBar.open('Invalid username or password!', '', {duration: 2000, extraClasses: ['snackbar']});
    });
  }
}
