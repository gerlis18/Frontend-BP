import {Product} from "../models/product";

export interface ProductStateModel {
  list: Product[];
  loaded: boolean;
  pagination: number;
}

