import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {ProductsState} from "../../store/products.state";
import {NgxsModule} from "@ngxs/store";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        NgxsModule.forRoot([ProductsState]),
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
