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
    console.log(cur)
    return (!cur.subType) ? this.fb.control(cur.value, Validators.required) :
        (cur.subType === 'email') ? this.fb.control(cur.value, [Validators.required, Validators.pattern(this.emailPattern)],) :
        (cur.subType === 'tel') ?  this.fb.control(cur.value, [Validators.required, phoneNumberValidator]) :  this.fb.control(cur.value, Validators.required);
  }

  public generateForm(formInputs) {
    formInputs.forEach(cur => {
      const defaultVal = [''];
      if (cur.required && (cur.type !== 'array')) {
        const validation = this.setValidation(cur);
        this.parentForm.addControl(cur.fieldName, this.setValidation(cur));
      }

      if (cur.type === 'array') {
        this.parentForm.addControl(cur.fieldName, this.fb.array([this.fb.control('')]) );
      }

      if (cur.type === 'nested') {
        const nestedGroup = this.fb.group({});
        cur.child.forEach(item => {
          nestedGroup.addControl(item.fieldName, this.setValidation(item))
        });
        this.parentForm.addControl(cur.fieldName, nestedGroup);
      }

      this.parentForm.addControl(cur.fieldName, this.setValidation(cur));
    });

    return this.parentForm;
  }

}
