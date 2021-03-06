import { Injectable } from '@angular/core';
import { Http, Headers, Response, HttpModule } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;


  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/users/register';
    return this.http.post(url, user, { headers: headers }).pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/users/authenticate';
    return this.http.post(url, user, { headers: headers }).pipe(map(res => res.json()));
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
