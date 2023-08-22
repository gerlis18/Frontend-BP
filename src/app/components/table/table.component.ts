import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() productList!: Product[] | null;
  @Input() pagination!: number | null;
  @Output() remove = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();
  @Output() paginationChange = new EventEmitter<number>();
  paginationControl = new FormControl();

  constructor() {
  }

  ngOnInit() {
    this.paginationControl.setValue(this.pagination)
    this.paginationControl
      .valueChanges
      .subscribe((value: number | null) => {
        if (value) {
          this.paginationChange.emit(value);
        }
      });
  }

  toggleMenu(menu: HTMLDivElement) {
    document.querySelectorAll('.menu').forEach((item: Element) => {
      if (item.getAttribute('id') !== menu.getAttribute('id')) {
        item.classList.add('hide-menu');
      }
    });
    menu.classList.toggle('hide-menu');
  }

  removeEvent(product: Product, menuElement: any) {
    this.remove.emit(product);
    this.toggleMenu(menuElement);
  }

  updateEvent(product: Product) {
    this.update.emit(product);
  }


}
