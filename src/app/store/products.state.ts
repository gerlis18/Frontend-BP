import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext} from "@ngxs/store";
import {ProductStateModel} from "./product-state-model";
import {DataService} from "../services/data.service";
import {AddProduct, LoadProducts, RemoveProduct, UpdateProduct} from "./product.actions";
import {Product} from "../models/product";
import {catchError, tap, throwError} from "rxjs";

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    list: [],
    loaded: false
  }
})
@Injectable()
export class ProductsState {

  constructor(private dataService: DataService) {
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    this.dataService.getProducts()
      .subscribe({
        next: (list: Product[]) => {
          ctx.setState({
            ...state,
            list,
            loaded: true
          })
        }
      });
  }

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<ProductStateModel>, action: RemoveProduct) {
    const state = ctx.getState();
    return this.dataService.deleteProduct(action.id)
      .pipe(
        tap(() => {
          ctx.setState({
            ...state,
            list: state.list.filter(item => item.id !== action.id)
          })
        }),
        catchError(err => {
          return throwError(err);
        })
      )
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    const state = ctx.getState();
    this.dataService.updateProduct(action.product)
      .subscribe({
        next: () => {
          ctx.setState({
            ...state,
            list: state.list.map(item => item.id === action.product.id ? action.product : item)
          })
        }
      });
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    const state = ctx.getState();
    this.dataService.createProduct(action.product)
      .subscribe({
        next: () => {
          ctx.setState({
            ...state,
            list: [...state.list, action.product]
          })
        }
      });
  }

  @Selector()
  static products(state: ProductStateModel) {
    return state.list;
  }

  static getProduct(id: string | null) {
    return createSelector([ProductsState], (state: ProductStateModel) => {
      if (!id) return null;
      return state.list.find(item => item.id === id);
    });
  }

}
