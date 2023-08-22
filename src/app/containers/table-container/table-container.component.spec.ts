import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TableContainerComponent } from './table-container.component';
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "../../store/products.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "../../components/header/header.component";
import {TableComponent} from "../../components/table/table.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {of, throwError} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {Route, Router} from "@angular/router";
import {RegisterContainerComponent} from "../register-container/register-container.component";
import {Location} from "@angular/common";
import {LoadProducts} from "../../store/product.actions";
import {UpdateContainerComponent} from "../update-container/update-container.component";

const routes: Route[] = [
  { path: '', component: TableContainerComponent },
  { path: 'add-product', component: RegisterContainerComponent },
  {path: 'update-product/:productId', component: UpdateContainerComponent}
];

describe('TableContainerComponent', () => {
  let component: TableContainerComponent;
  let fixture: ComponentFixture<TableContainerComponent>;
  let dataService: DataService;
  let store: Store;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContainerComponent, HeaderComponent, TableComponent ],
      imports: [
        NgxsModule.forRoot([ProductsState]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();

    dataService = TestBed.inject(DataService);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);


    fixture = TestBed.createComponent(TableContainerComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the product list', fakeAsync(() => {
    spyOn(dataService, 'getProducts').and.returnValue(of([
     {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '02/02/2022',
      date_revision: '02/02/2023'
    },
      {
        id: '2',
        name: 'test 2',
        description: 'Description 2',
        logo: 'Logo 2',
        date_release: '02/02/2022',
        date_revision: '02/02/2023'
      }
    ]));
    component.ngOnInit();
    component.searchControl.setValue('test 2');
    tick();
    fixture.detectChanges();
    component.productListFilter$
      .subscribe(list => {
        expect(list.length).toEqual(2);
      })
  }));

  it('should navigate to add product view', fakeAsync(() => {
    component.addProduct();
    tick()
    expect(location.path()).toBe('/add-product');
  }));

  it('should remove a product', () => {

    store.dispatch(new LoadProducts());
    const product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '02/02/2022',
      date_revision: '02/02/2023'
    };
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(dataService, 'getProducts').and.returnValue(of([product]));
    const serviceSpy = spyOn(dataService, 'deleteProduct').and.returnValue(of({}));
    component.removeProduct(product);
    const state = store.selectSnapshot(state => state.products);
    expect(serviceSpy).toHaveBeenCalledWith('1');
    expect(state.list.length).toBe(0);
  });

  it('should throw an error when removing a product', fakeAsync(() => {

    const product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '02/02/2022',
      date_revision: '02/02/2023'
    };
    store.reset({
      ...store.snapshot(),
      products: {
        list: [product],
        loaded: true
      }
    });
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(dataService, 'deleteProduct')
      .and
      .returnValue(throwError(() => new Error('fallo')));
    component.removeProduct(product);
    const state = store.selectSnapshot(state => state.products);
    expect(state.list.length).toBe(1);
  }));

  it('should navigate to update product view', fakeAsync(() => {
    const product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '02/02/2022',
      date_revision: '02/02/2023'
    };
    component.updateProduct(product);
    tick();
    expect(location.path()).toBe('/update-product/1');
  }));
});
