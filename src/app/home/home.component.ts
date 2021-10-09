import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userLogged: SocialUser | undefined;

  isLogged: boolean | undefined;

  pages = new Array(10);

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((data) => {
      this.userLogged = data;
      this.isLogged =
        this.userLogged != null && this.tokenService.getToken() != null;
    });
  }
}
