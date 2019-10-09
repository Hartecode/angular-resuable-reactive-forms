import {Injectable} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import {phoneNumberValidator} from '../validators/phone-validator';
import {FieldInput} from '../ag-form/ag-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fb: FormBuilder) { }

  private emailValidation:AbstractControlOptions = { 
    validators: [Validators.required, Validators.pattern(this.emailPattern)],
    updateOn: 'blur' };
  
  private phoneValidation: ValidatorFn[] = [Validators.required, phoneNumberValidator];

  // set the validation based on type
  private setValidationControl(cur: FieldInput) {
    return (cur.subType === 'email') ? [cur.value, this.emailValidation] :
        (cur.subType === 'tel') ?  [cur.value, this.phoneValidation] :
        [cur.value, Validators.required];
  }

  public generateForm(formInputs: FieldInput[]): FormGroup {
    const controlsConfig = formInputs.reduce((acc, cur) => {
      const holder = {};
      if (cur.type === 'input' || cur.type === 'select') {
        const val = (cur.required) ? this.setValidationControl(cur) : cur.value;
        holder[cur.fieldName] = val;
      }

      if (cur.type === 'array') {
        holder[cur.fieldName] = this.fb.array(cur.value as any[]);
      }

      if (cur.type === 'nested') {
        holder[cur.fieldName] = this.generateForm(cur.child);        
      }

      return {
        ...acc,
        ...holder
      };
    }, {});

    return this.fb.group(controlsConfig);
  }

}
