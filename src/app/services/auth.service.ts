import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (
        credentials.email === "prueba@gmail.com" &&
        credentials.password === "prueba1234"
      ) {
        accept("login correcto");
      } else {
        reject("login incorrecto");
      }
    });
  }
}
