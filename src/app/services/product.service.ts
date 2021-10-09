import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productURL = 'http://localhost:8080/product/';

  constructor(private http: HttpClient) {}

  public list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL + 'list', headers);
  }
}
