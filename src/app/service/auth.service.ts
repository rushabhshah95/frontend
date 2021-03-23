/* A service to call API */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:8081';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router){}

  // Register User API call
  register(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.API_URL}/auth/register`, user).pipe(
        catchError(this.handleError)
    )
  }

  // Login User API call
  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/auth/sign_in`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        localStorage.setItem('email',res.email);
        localStorage.setItem('uniqueId',res._id);
        this.router.navigate(['user/moment']);
      })
  }

  // Add Moment API call
  addMoment(moment): Observable<any> {
    moment['email'] = localStorage.getItem('email');
    return this.httpClient.post(`${this.API_URL}/addMoment`, moment).pipe(
        catchError(this.handleError)
    )
  }

  // Provide Access token
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  // Check user is loggedIn
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  // Call on click of logut button
  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['login']);
    }
  }

  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Get all moment API
  getAllMoments(): Observable<any> {
    let email = localStorage.getItem('email');
    return this.httpClient.get(`${this.API_URL}/getAllMoment/${email}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Get Moment Image
  getMomentImage(fileName): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/getMoment/${fileName}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Delete Moment 
  deleteMoment(momentId): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/deleteMoment/${momentId}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Handle API Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}