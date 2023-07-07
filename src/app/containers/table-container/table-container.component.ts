import {Component, OnInit} from '@angular/core';
import {map, Observable, of, startWith, switchMap, tap} from "rxjs";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {LoadProducts} from "../../store/product.actions";
import {ProductsState} from "../../store/products.state";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
})
export class TableContainerComponent implements OnInit {

  @Select(ProductsState.products) productList$!: Observable<Product[]>;
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
    this.router.navigate(['/add-product'])
  }

}
