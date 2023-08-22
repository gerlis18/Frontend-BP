import {DataService} from "../../services/data.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";

export class IdValidator {
  static createValidator(dataService: DataService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return dataService
        .idVerification(control.value)
        .pipe(
          map(result => {
            return result ? { 'idInvalid': true } : {}
          })
        )
    }
  }
}
