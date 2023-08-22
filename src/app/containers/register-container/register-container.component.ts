import {Component, OnDestroy} from '@angular/core';
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {AddProduct} from "../../store/product.actions";
import {Store} from "@ngxs/store";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss']
})
export class RegisterContainerComponent implements OnDestroy {

  private ngOnDestroy$ = new Subject<void>();
  constructor(
    private router: Router,
    private store: Store) {
  }


  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product))
      .pipe(
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe({
        next: ()=> {
          alert('Product created successfully');
          this.router.navigate(['/'])
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

}
