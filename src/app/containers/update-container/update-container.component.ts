import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsState} from "../../store/products.state";
import {LoadProducts, UpdateProduct} from "../../store/product.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject, takeUntil} from "rxjs";
import {ProductStateModel} from "../../store/product-state-model";
import {Product} from "../../models/product";

@Component({
  selector: 'app-update-container',
  templateUrl: './update-container.component.html',
  styleUrls: ['./update-container.component.scss']
})
export class UpdateContainerComponent implements OnInit, OnDestroy {

  @Select(ProductsState) state$!: Observable<ProductStateModel>;
  private productId: string | null = null;
  formValue: any;
  private ngOnDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
    ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');

    this.state$
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(state => {
      if (this.productId && state.loaded) {
        this.store.select(ProductsState.getProduct(this.productId))
          .subscribe(product => {
            if (product) {
              this.loadProduct(product);
            }
          });
      } else {
        this.store.dispatch(new LoadProducts());
      }
    });
  }

  loadProduct(product: Product) {
    this.formValue = {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      dateRelease: this.formatDate(product.date_release),
      dateRevision: this.formatDate(product.date_revision),
    };
  }

  private formatDate(date: string) {
    return date.split('T')[0]
  }

  updateProduct(product: Product) {
    this.store.dispatch(new UpdateProduct(product))
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(() => this.router.navigate(['/']))
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

}
