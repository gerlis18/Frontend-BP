import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product";
import {IdValidator} from "./id.validator";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;
  @Output() onSubmit = new EventEmitter<Product>();
  @Input() formValue: any;
  minDate!: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.minDate = this.getMinDate();
  }

  ngOnInit() {
    this.createForm();
    if (this.formValue) {
      this.registerForm.setValue(this.formValue);
      this.registerForm.get('id')?.disable();
    } else {
      this.registerForm.get('id')?.setAsyncValidators(IdValidator.createValidator(this.dataService));
    }
  }

  getMinDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      id: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [null, Validators.required],
      dateRelease: [null, Validators.required],
      dateRevision: [{value: null, disabled: true}, Validators.required],
    });

    this.registerForm.get('dateRelease')
      ?.valueChanges
      .subscribe(date => this.onChangeReleaseDate(date));
  }

  resetForm() {
    this.registerForm.reset();
  }

  submitEvent() {
    const formValue = this.registerForm.getRawValue();
    const product: Product =  {
      id: formValue.id,
      name: formValue.name,
      description: formValue.description,
      logo: formValue.logo,
      date_release: formValue.dateRelease,
      date_revision: formValue.dateRevision,
    };
    this.onSubmit.emit(product);
  }

  onChangeReleaseDate(date: string) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    this.registerForm.get('dateRevision')?.setValue(this.formatDate(newDate.toISOString()));
  }

  private formatDate(date: string) {
    return date.split('T')[0]
  }
}
