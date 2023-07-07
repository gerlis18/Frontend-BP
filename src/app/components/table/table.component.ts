import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {Store} from "@ngxs/store";
import {RemoveProduct} from "../../store/product.actions";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() productList!: Product[] | null;
  pagination = 5;
  paginationControl = new FormControl(this.pagination);

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.paginationControl
      .valueChanges
      .subscribe((value: number | null) => {
        if (value) {
          this.pagination = value;
        }
    });
  }

  toggleMenu(menu: HTMLDivElement) {
    document.querySelectorAll('.menu').forEach((item: Element) => {
        item.classList.add('hide-menu');
    });
    menu.classList.toggle('hide-menu');
  }

  removeProduct(product: Product) {
    const response = confirm('Deseas eliminar este producto?');
    if (response) {
      this.store.dispatch(new RemoveProduct(product.id))
        .subscribe(() => {
          alert('Product removed');
        });
    }
  }

  updateProduct(product: Product) {
    this.router.navigate(['/update-product', product.id]);
  }


}
