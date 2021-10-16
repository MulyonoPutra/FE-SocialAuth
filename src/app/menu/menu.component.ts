
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class MenuComponent implements OnInit, AfterViewInit {
  socialUser: SocialUser | undefined;
  userLogged: SocialUser | undefined;
  isLogged: boolean | undefined;
  private isVisible = true;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((data) => {
      this.userLogged = data;
      this.isLogged =
        this.userLogged != null && this.tokenService.getToken() != null;
    });
  }

  ngAfterViewInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter((direction) => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter((direction) => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  logOut(): void {
    this.authService.signOut().then((data) => {
      this.tokenService.logOut();
      this.router.navigate(['/login']);
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      dialogRef.close();
      this.dialog.closeAll()
    });
  }

  
}
