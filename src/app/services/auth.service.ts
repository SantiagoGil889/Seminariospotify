import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlServer = 'https://music.fly.dev';

  constructor() {}

  async loginUser(credentials: { email: string; password: string }) {
    try {
      const response = await fetch(`${this.urlServer}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: credentials.email,
            password: credentials.password
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login fallido. Código ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async registerUser(userData: { email: string; password: string; name: string; username: string; last_name: string}) {
    try {
      const response = await fetch(`${this.urlServer}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          last_name: userData.last_name
        }
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Registro fallido. Código ${response.status}: ${errorBody}`);
      }

      return await response.json();
    } catch (err) {
      throw err;
    }
  }
}
