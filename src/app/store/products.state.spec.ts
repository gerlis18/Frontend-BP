import {NgxsModule, Store} from "@ngxs/store";
import {TestBed} from "@angular/core/testing";
import {ProductsState} from "./products.state";
import {ProductStateModel} from "./product-state-model";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RemoveProduct} from "./product.actions";
import {DataService} from "../services/data.service";
import {of} from "rxjs";

describe('ProductsState', () => {
  let store: Store;
  let dataService: DataService;

  const state: ProductStateModel = {
    list: [
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
        name: 'Product 2',
        description: 'Description 2',
        logo: 'Logo 2',
        date_release: '02/02/2022',
        date_revision: '02/02/2023'
      }
    ],
    loaded: true,
    pagination: 5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ProductsState]),
        HttpClientTestingModule
      ]
    });
    store = TestBed.inject(Store);
    dataService = TestBed.inject(DataService);
  });

  it('should select requested product object from state', () => {
    const value = ProductsState.getProduct('1')(state);
    expect(value).toEqual(state.list[0]);
  });

  it('should not select requested product object from state', () => {
    const value = ProductsState.getProduct(null)(state);
    expect(value).toBeNull();
  });

  it('should invoke remove product action', () => {
    spyOn(dataService, 'deleteProduct').and.returnValue(of({}))
    store.reset({
      ...store.snapshot(),
      products: state
    })
    store.dispatch(new RemoveProduct('1'));
    const currentState = store.selectSnapshot(state => state.products);
    expect(currentState.list.length).toBe(1);
  });

});
