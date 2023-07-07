import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContainerComponent } from './table-container.component';
import {NgxsModule} from "@ngxs/store";
import {ProductsState} from "../../store/products.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "../../components/header/header.component";
import {TableComponent} from "../../components/table/table.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('TableContainerComponent', () => {
  let component: TableContainerComponent;
  let fixture: ComponentFixture<TableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContainerComponent, HeaderComponent, TableComponent ],
      imports: [
        NgxsModule.forRoot([ProductsState]),
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
