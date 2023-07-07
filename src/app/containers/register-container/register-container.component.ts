import {Component, OnDestroy} from '@angular/core';
import {Product} from "../../models/product";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {AddProduct} from "../../store/product.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss']
})
export class RegisterContainerComponent implements OnDestroy {

  private ngOnDestroy$ = new Subject<void>();
  constructor(
    private dataService: DataService,
    private router: Router,
    private store: Store) {
  }


  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product))
      .pipe(
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe(()=> {
        alert('Product created successfully');
        this.router.navigate(['/'])
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

}
