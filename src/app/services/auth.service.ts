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

  registerUser(data: any): Promise<{ status: string; message: string }> {
    return new Promise((resolve, reject) => {
      if (data.email === 'duplicado@email.com') {
        resolve({ status: 'error', message: 'El correo ya está registrado' });
      }

      if (data.email && data.password && data.nombre && data.apellido) {
        resolve({ status: 'accept', message: 'Registro exitoso' });
      } else {
        resolve({ status: 'error', message: 'Datos incompletos' });
      }
    });
  }


}
