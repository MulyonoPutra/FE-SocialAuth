import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { TokenDTO } from '../models/token-dto';
import { OauthService } from '../services/oauth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  TOKEN_KEY = 'AuthToken';
  socialUser: SocialUser | undefined;
  userLogged: SocialUser | undefined;
  isLogged: boolean | undefined;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((data) => {
      this.userLogged = data;
      this.isLogged =
        this.userLogged != null && this.tokenService.getToken() != null;
    });
  }

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.socialUser = data;
        const tokenGoogle = new TokenDTO(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          (res) => {
            console.log(res.value);
            //sessionStorage.setItem(this.TOKEN_KEY, res.value);
            this.tokenService.setToken(res.value);
            this.isLogged = true; 
            this.router.navigate(['/']);
          },
          (err) => {
            console.log(err);
            this.logOut();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.socialUser = data;
        const tokenFace = new TokenDTO(this.socialUser.authToken);
        this.oauthService.facebook(tokenFace).subscribe(
          (res) => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
            this.router.navigate(['/home']);
          },
          (err) => {
            console.log(err);
            this.logOut();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logOut(): void {
    this.authService.signOut().then((data) => {
      this.tokenService.logOut();
      this.isLogged = false;
    });
  }
}
