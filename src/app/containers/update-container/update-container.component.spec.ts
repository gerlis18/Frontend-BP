import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UpdateContainerComponent } from './update-container.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NgxsModule, Store} from "@ngxs/store";
import {ProductsState} from "../../store/products.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "../../components/header/header.component";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Location} from "@angular/common";
import {TableContainerComponent} from "../table-container/table-container.component";
import {of} from "rxjs";

const routes: Route[] = [
  {path: '', component: TableContainerComponent},
  {path: 'update-product', component: UpdateContainerComponent},
];

describe('UpdateContainerComponent', () => {
  let component: UpdateContainerComponent;
  let fixture: ComponentFixture<UpdateContainerComponent>;
  let dataService: DataService;
  let router: Router;
  let location: Location;
  let store: Store;
  let activatedRoute: ActivatedRoute;

  const product = {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    logo: 'Logo 1',
    date_release: '02/02/2022',
    date_revision: '02/02/2023'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContainerComponent, HeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        NgxsModule.forRoot([ProductsState]),
        HttpClientTestingModule,
      ]
    })
    .compileComponents();

    dataService = TestBed.inject(DataService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);
    activatedRoute = TestBed.inject(ActivatedRoute);

    store.reset({
      ...store.snapshot(),
      products: {
        list: [product],
        loaded: true
      }
    });
    fixture = TestBed.createComponent(UpdateContainerComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a product when is in the store', () => {
    const spyRoute = spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('1');
    component.ngOnInit();
    expect(component.formValue).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      dateRelease: '02/02/2022',
      dateRevision: '02/02/2023'
    });
  });

  it('should update the product in the store and navigate to home', fakeAsync(() => {
    const updateProduct = {
      ...product,
      name: 'Product 2',
    };
    spyOn(dataService, 'updateProduct').and.returnValue(of([updateProduct]));
    component.updateProduct(updateProduct);
    const storeProduct = store.selectSnapshot(ProductsState.getProduct('1'));
    tick()
    expect(storeProduct).toEqual(updateProduct);
    expect(location.path()).toBe('/');
  }));
});
