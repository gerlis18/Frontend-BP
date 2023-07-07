import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContainerComponent } from './update-container.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule} from "@ngxs/store";
import {ProductsState} from "../../store/products.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "../../components/header/header.component";

describe('UpdateContainerComponent', () => {
  let component: UpdateContainerComponent;
  let fixture: ComponentFixture<UpdateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContainerComponent, HeaderComponent ],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([ProductsState]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
