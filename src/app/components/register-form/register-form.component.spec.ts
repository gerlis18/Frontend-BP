import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the form values when onInit', () => {
    const formValue = {
      id: '1',
      name: 'test',
      description: 'test',
      logo: 'test',
      dateRelease: '02/02/2021',
      dateRevision: '02/02/2022'
    };
    component.formValue = formValue;
    component.ngOnInit();
    expect(component.registerForm.getRawValue()).toEqual(formValue);
  });

  it('should create the form when on init', () => {
    component.ngOnInit();
    expect(component.registerForm).toBeTruthy();
  });

  it('should reset the from when reset button is clicked', () => {
    const formValue = {
      id: '1',
      name: 'test',
      description: 'test',
      logo: 'test',
      dateRelease: '02/02/2021',
      dateRevision: '02/02/2022'
    };
    component.formValue = formValue;
    component.ngOnInit();
    component.resetForm();
    expect(component.registerForm.getRawValue()).not.toEqual(formValue);
  });

  it('should emit the form value when submit button is clicked', () => {
    spyOn(component.onSubmit, 'emit');
    const formValue = {
      id: '1',
      name: 'test',
      description: 'test',
      logo: 'test',
      dateRelease: '02/02/2021',
      dateRevision: '02/02/2022'
    };
    component.formValue = formValue;
    component.ngOnInit();
    component.submitEvent();
    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      id: '1',
      name: 'test',
      description: 'test',
      logo: 'test',
      date_release: formValue.dateRelease,
      date_revision: formValue.dateRevision,
    });
  })
});
