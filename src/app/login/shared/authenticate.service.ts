import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { User } from './user.model';
import { Success } from './success.model';


@Injectable()
export class AuthenticationService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private _router: Router, private http: HttpClient) {
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.emit(false);
    this._router.navigate(['/login']);
  }

  login(user: User) {
    const url = '/api/login';
    return this.http.post<Success>(url, user);
  }

  checkCredentials() {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      return true;
    }
    this._router.navigate(['/login']);
  }

  emit(type) {
    this.change.emit(type);
  }
}
