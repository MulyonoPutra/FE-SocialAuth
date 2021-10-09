import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  isLogged: boolean | undefined;
  userLogged: SocialUser | undefined;
  constructor(
    private productService: ProductService,
    private authService: SocialAuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // this.getToken();
    this.productService.list().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getToken() {
    this.authService.authState.subscribe((data) => {
      this.userLogged = data;
      this.isLogged =
        this.userLogged != null && this.tokenService.getToken() != null;
    });
  }
}
