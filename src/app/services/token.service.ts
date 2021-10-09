import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


const TOKEN_KEY = 'CookiesToken';


@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(private cookieService: CookieService) {}

  public getToken(): string {
    return this.cookieService.get(TOKEN_KEY) || '{}';
  }

  public setToken(token: string): void {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token);
  }

  logOut(): void {
    this.cookieService.deleteAll();
  }
}
