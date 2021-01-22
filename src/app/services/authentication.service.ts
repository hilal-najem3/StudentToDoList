import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
 
const TOKEN_KEY = 'my-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  // token = '';
 
  constructor(private afAuth: AngularFireAuth) {
    // this.loadToken();
  }
 
  // async loadToken() {
    // const token = await Storage.get({ key: TOKEN_KEY });    
    // if (token && token.value) {
    //   console.log('set token: ', token.value);
    //   this.token = token.value;
    //   this.isAuthenticated.next(true);
    // } else {
    //   this.isAuthenticated.next(false);
    // }
  // }

  register(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
 
  // login(credentials: {email, password}): Observable<any> {
  //   return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
  //     map((data: any) => data.token),
  //     switchMap(token => {
  //       return from(Storage.set({key: TOKEN_KEY, value: token}));
  //     }),
  //     tap(_ => {
  //       this.isAuthenticated.next(true);
  //     })
  //   )
  // }

  login(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
 
  // logout(): Promise<void> {
  //   this.isAuthenticated.next(false);
  //   return Storage.remove({key: TOKEN_KEY});
  // }

  logout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }
}