import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions'
import { Apollo } from 'apollo-angular';
import { Location } from '@angular/common';
import { StorageService } from './storage.service';
import { GET_USER_PROFILE } from '../auth/login/login.graphql';

export interface AuthTokenModel {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authority: any;
  objectPerms: any;
  perms: any;
  principal: any;
  private errorCode: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionService: NgxPermissionsService,
    private location: Location,
    private apollo: Apollo,
    private storageService: StorageService,
  ) { }

  async login(username: string, password: string): Promise<AuthTokenModel> {
    const body = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization:
        'Bearer ' +
        window.btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET),
    });
    console.log(headers)
    return await lastValueFrom(
      this.http
        .post<AuthTokenModel>(
          environment.GRAPHQL_URL + `/oauth2/access_token`,
          body,
          { headers }
        )
        .pipe(
          map((tokenDetails) => {
            if (tokenDetails && tokenDetails.access_token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.storageService.setItem(
                'currentClient',
                tokenDetails.access_token
              );
              this.storageService.setItem(
                'refreshToken',
                tokenDetails.refresh_token
              );
              this.storageService.setItem(
                'expireTime',
                tokenDetails.expires_in
              );
              const expiry =
                Math.round(Date.now() / 1000) + tokenDetails.expires_in; // time valid token in ISO-8601
              this.storageService.setItem('expiry', expiry);
              // navigate to landing
              this.authRole('LOGIN');
            }
            return tokenDetails;
          })
        )
    );
  }

  alreadyLoggedIn() {
    return !!localStorage.getItem('currentClient');
  }

  logout(sessionExpired = false): any {
    const currentClient = this.storageService.getItem('currentClient');
    // this.permissionsService.flushPermissions();
    const body = new HttpParams().set('token', currentClient);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    });
    localStorage.clear();
    this.storageService.clearStorage();
    if (sessionExpired) {
      localStorage.setItem('urlToRedirect', this.router.url);
      this.storageService.setItem('sessionExpired', 'true');
    }
    this.router.navigate(['home'], { replaceUrl: true });
    this.location.replaceState('/');
  }

  async authRole(from: 'LOGIN' | 'OTHER' = 'OTHER') {
    this.perms = localStorage.getItem('currentClient');
    console.log("this are the data", this.perms)
    if (this.perms) {
      console.log("what here")
      return await this.apollo
        .query({
          query: GET_USER_PROFILE,
          fetchPolicy: 'network-only',
        })
        .pipe(

          map((data) => {
            if (data) {
              let result: any = Object.values(data)[0];
              console.log("this is the data", data)
              result = result.getUserProfile;
              if (result.response.status) {
                this.storageService.setItem('profile', result.data);
                console.log("Inside the codes")
                  if (from === 'LOGIN'){
                    console.log("Inside the login")
                    this.router.navigate(['/dashboard']);
                  }
                    
                 else {
                  console.log("fail one")
                  this.router.navigate(['/dashboard']);
                }
              } else {
                console.log("fail two")
              }
            }
          })
        )
        .toPromise();
    }
  }
}