import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatCardModule } from '@angular/material/card';
import { SocialProvider } from './helpers/providers/social.provider';
import { ProductProvider } from './helpers/providers/product.provider';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    ProductsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatCardModule,
  ],
  providers: [SocialProvider, ProductProvider, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
