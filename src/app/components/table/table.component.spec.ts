import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TableComponent} from './table.component';
import {ProductsState} from "../../store/products.state";
import {NgxsModule, Store} from "@ngxs/store";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {of, throwError} from "rxjs";
import {LoadProducts} from "../../store/product.actions";
import {Route, Router} from "@angular/router";
import {UpdateContainerComponent} from "../../containers/update-container/update-container.component";
import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";

const routes: Route[] = [
  {path: '', component: TableComponent},
  {path: 'update-product/:productId', component: UpdateContainerComponent}
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let dataService: DataService;
  let store: Store;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
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
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the pagination value', fakeAsync(() => {
    component.ngOnInit();
    component.paginationControl.setValue(10);
    tick();
    expect(component.pagination).toEqual(10);
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
    component.productList = [product];
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
    component.productList = [product];
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

  it('should toggle the menu on the view', () => {
    const product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '02/02/2022',
      date_revision: '02/02/2023'
    };
    component.productList = [product, {...product, id: '2' }];
    fixture.detectChanges();
    const menu = fixture.debugElement.nativeElement.querySelector('.menu');
    component.toggleMenu(menu);
    fixture.detectChanges();
    const menuUpdated = fixture.debugElement.nativeElement.querySelector('.menu');
    expect(menuUpdated.classList).not.toContain('hide-menu')
  });
});
