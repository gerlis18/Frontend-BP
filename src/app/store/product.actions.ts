import {Product} from "../models/product";


export class LoadProducts {
  static readonly type = '[Product] Load';
}

export class RemoveProduct {
  static readonly type = '[Product] Remove';
  constructor(public id: string) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update';
  constructor(public product: Product) {}
}

export class AddProduct {
  static readonly type = '[Product] Add';
  constructor(public product: Product) {}
}

export class UpdatePagination {
  static readonly type = '[Product] Update pagination';
  constructor(public pagination: number) {}
}
