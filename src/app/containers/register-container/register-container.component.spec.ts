import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContainerComponent } from './register-container.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "../../store/products.state";
import {HeaderComponent} from "../../components/header/header.component";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../models/product";
import {RouterTestingModule} from "@angular/router/testing";
import {Route} from "@angular/router";
import {TableContainerComponent} from "../table-container/table-container.component";
import {Location} from "@angular/common";
import {DataService} from "../../services/data.service";
import {of} from "rxjs";


const routes: Route[] = [
  { path: '', component: TableContainerComponent },
  { path: 'register', component: RegisterContainerComponent },
];

describe('RegisterContainerComponent', () => {
  let component: RegisterContainerComponent;
  let fixture: ComponentFixture<RegisterContainerComponent>;
  let store: Store;
  let location: Location;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterContainerComponent, HeaderComponent, RegisterFormComponent ],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([ProductsState]),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();

    store = TestBed.inject(Store);
    location = TestBed.inject(Location);
    dataService = TestBed.inject(DataService);

    fixture = TestBed.createComponent(RegisterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a product to the store', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '02/02/2022',
      date_revision: '02/02/2023'
    };
    spyOn(dataService, 'createProduct').and.returnValue(of([product]));
    component.addProduct(product);
    const products = store.selectSnapshot(state => state.products.list)
    expect(products.length).toEqual(1);
    expect(location.path()).toBe('');
  });
});
