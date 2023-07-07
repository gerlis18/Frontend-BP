import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  private headers = new HttpHeaders({
    authorId: 1239082
  });

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL, { headers: this.headers });
  }

  createProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.BASE_URL, product, { headers: this.headers })
  }

  updateProduct(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(this.BASE_URL, product, { headers: this.headers })
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.BASE_URL, {
      headers: this.headers,
      params: {
        id: productId
      }
    });
  }
}
