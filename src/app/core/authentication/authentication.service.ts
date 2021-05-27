import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUsernameSubject = new Subject<string>();

  constructor() { }

  public get currentUserValue(): any {
    return localStorage.getItem('loggedInUser');
  }

  login(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.currentUsernameSubject.next(user.userName);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }
}
