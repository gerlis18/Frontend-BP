import {Component, OnInit} from '@angular/core';
import {map, Observable, startWith, switchMap} from "rxjs";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {LoadProducts, RemoveProduct, UpdatePagination} from "../../store/product.actions";
import {ProductsState} from "../../store/products.state";
import {FormControl} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
})
export class TableContainerComponent implements OnInit {

  @Select(ProductsState.products) productList$!: Observable<Product[]>;
  @Select(ProductsState.paginationCount) pagination$!: Observable<number>;
  searchControl = new FormControl('');
  productListFilter$!: Observable<Product[]>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new LoadProducts());
    this.productListFilter$ = this.searchControl
      .valueChanges
      .pipe(
        startWith(''),
        switchMap(value => {
          return this.searchProducts(value || '')
        }),
      )
  }

  private searchProducts(value: string): Observable<Product[]> {
    return this.productList$.pipe(
      map(products => {
        return products.filter(product => {
          return product.name.toLowerCase().includes(value);
        })
      })
    );
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  removeProduct(product: Product) {
    const response = confirm('Deseas eliminar este producto?');
    if (response) {
      this.store.dispatch(new RemoveProduct(product.id))
        .subscribe({
          next: () => {
            alert('Producto eliminado con éxito');
          },
          error: (error: HttpErrorResponse) => {
            alert(error.error);
          }
        });
    }
  }

  updateProduct(product: Product) {
    this.router.navigate(['/update-product', product.id]);
  }

  paginationChange(value: number) {
    this.store.dispatch(new UpdatePagination(value));
  }

}
