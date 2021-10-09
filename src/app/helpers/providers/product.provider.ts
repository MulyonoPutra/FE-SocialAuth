import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductInterceptor } from "src/app/interceptors/product.interceptor";

export const ProductProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true },
];
