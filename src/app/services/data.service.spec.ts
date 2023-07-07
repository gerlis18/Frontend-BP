import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {of} from "rxjs";

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new DataService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the product list', (done: DoneFn) => {

    const expectedProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'Logo 1',
        date_release: '02/02/2022',
        date_revision: '02/02/2023'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    service.getProducts().subscribe({
      next: list => {
        expect(list).toEqual(expectedProducts);
        done()
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .toBe(1);
  });

  it('should create the given product', (done: DoneFn) => {

    const expectedProduct: Product =
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'Logo 1',
        date_release: '02/02/2022',
        date_revision: '02/02/2023'
      };

    httpClientSpy.post.and.returnValue(of([expectedProduct]));

    service.createProduct(expectedProduct).subscribe({
      next: list => {
        expect(list).toEqual([expectedProduct]);
        done()
      },
      error: done.fail
    });
    expect(httpClientSpy.post.calls.count())
      .toBe(1);
  });

  it('should update the given product', (done: DoneFn) => {

    const expectedProduct: Product =
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 1',
        logo: 'Logo 1',
        date_release: '02/02/2022',
        date_revision: '02/02/2023'
      };

    httpClientSpy.put.and.returnValue(of([expectedProduct]));

    service.updateProduct(expectedProduct).subscribe({
      next: list => {
        expect(list).toEqual([expectedProduct]);
        done()
      },
      error: done.fail
    });
    expect(httpClientSpy.put.calls.count())
      .toBe(1);
  });

  it('should delete the given product id', (done: DoneFn) => {

    const expectedID = 'test-id';

    httpClientSpy.delete.and.returnValue(of('product deleted'));

    service.deleteProduct(expectedID).subscribe({
      next: () => {
        done()
      },
      error: done.fail
    });
    expect(httpClientSpy.delete.calls.count())
      .toBe(1);
  });
});
