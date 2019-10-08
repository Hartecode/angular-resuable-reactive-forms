import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator';
import {FieldInput} from '../ag-form/ag-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  parentForm: FormGroup = this.fb.group({});
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fb: FormBuilder) { }

  // Needs adjusting 
  // should move to a service
  setValidation(cur: FieldInput) {
    return (!cur.subType) ? this.fb.control(cur.value, Validators.required) :
        (cur.subType === 'email') ? this.fb.control(cur.value, [Validators.required, Validators.pattern(this.emailPattern)],) :
        (cur.subType === 'tel') ?  this.fb.control(cur.value, [Validators.required, phoneNumberValidator]) :  this.fb.control(cur.value, Validators.required);
  }

  public generateForm(formInputs) {
    const form = {};
    formInputs.forEach(cur => {
      if (cur.type !== 'array' || cur.type !== 'nested') {
        const val = (cur.required) ? [cur.value, Validators.required] : cur.value;
        form[cur.fieldName] = val;
      }

      if (cur.type === 'array') {
        form[cur.fieldName] = this.fb.array(['']);
      }

      if (cur.type === 'nested') {
        const nestedForm = {};
        cur.child.forEach(item => {
          const val = (item.required) ? [item.value, Validators.required] : item.value;
          nestedForm[item.fieldName] = val;
        });
        form[cur.fieldName] = this.fb.group(nestedForm);        
      }
    });

    return this.fb.group(form);
  }

}
