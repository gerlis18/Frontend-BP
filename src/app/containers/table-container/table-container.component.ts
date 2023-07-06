import {Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import {Observable} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
})
export class TableContainerComponent implements OnInit {

  productList$!: Observable<Product[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.productList$ = this.dataService.getProducts();
  }
}
