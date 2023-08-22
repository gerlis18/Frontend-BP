import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TableComponent} from './table.component';
import {ProductsState} from "../../store/products.state";
import {NgxsModule} from "@ngxs/store";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Route} from "@angular/router";
import {UpdateContainerComponent} from "../../containers/update-container/update-container.component";
import {RouterTestingModule} from "@angular/router/testing";

const routes: Route[] = [
  {path: '', component: TableComponent},
  {path: 'update-product/:productId', component: UpdateContainerComponent}
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

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

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the pagination value', fakeAsync(() => {
    const spy = spyOn(component.paginationChange, 'emit');
    component.pagination = 5;
    component.ngOnInit();
    component.paginationControl.setValue(10);
    tick();
    expect(spy).toHaveBeenCalledWith(10);
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
    component.pagination = 5;
    component.productList = [product, {...product, id: '2' }];
    fixture.detectChanges();
    const menu = fixture.debugElement.nativeElement.querySelector('.menu');
    component.toggleMenu(menu);
    fixture.detectChanges();
    const menuUpdated = fixture.debugElement.nativeElement.querySelector('.menu');
    expect(menuUpdated.classList).not.toContain('hide-menu')
  });
});
