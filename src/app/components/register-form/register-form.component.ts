import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;
  @Output() onSubmit: EventEmitter<Product> = new EventEmitter();
  @Input() formValue: any;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
    if (this.formValue) {
      this.registerForm.setValue(this.formValue);
      this.registerForm.get('id')?.disable();
    }
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
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
