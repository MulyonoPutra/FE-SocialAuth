import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from '../models/token-dto';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(private http: HttpClient) {}

  public google(tokenDto: TokenDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(
      this.oauthURL + 'google',
      tokenDto,
      headers
    );
  }

  public facebook(tokenDto: TokenDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(
      this.oauthURL + 'facebook',
      tokenDto,
      headers
    );
  }
}
