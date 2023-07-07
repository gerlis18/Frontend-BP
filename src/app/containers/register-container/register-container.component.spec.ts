import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContainerComponent } from './register-container.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule} from "@ngxs/store";
import {ProductsState} from "../../store/products.state";
import {HeaderComponent} from "../../components/header/header.component";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('RegisterContainerComponent', () => {
  let component: RegisterContainerComponent;
  let fixture: ComponentFixture<RegisterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterContainerComponent, HeaderComponent, RegisterFormComponent ],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([ProductsState]),
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
