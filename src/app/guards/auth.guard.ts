import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const currentUser = JSON.parse(
      this.cookieService.get('currentUser') || '{}'
    );
              if (Object.keys(currentUser).length > 0) {
            this.router.navigate(['/pages/home'])
            return false
        } else {
            return true
        }

  }
}
