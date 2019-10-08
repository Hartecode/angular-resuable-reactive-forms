import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator';
import { STATE_CODE } from '../state';

@Component({
  selector: 'ag-form',
  templateUrl: './ag-form.component.html',
  styleUrls: ['./ag-form.component.css']
})
export class AgFormComponent implements OnInit {

  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public states = STATE_CODE.map(s => ({label: s.name,value: s.abbreviation}));

  parentForm = this.fb.group({});

  @Input() formInputs: FieldInput[];
  constructor(private fb: FormBuilder) { }

  // Needs adjusteding 
  // should move to a service
  setValidation(cur: FieldInput) {
    console.log(cur)
    return (!cur.subType) ? this.fb.control(cur.value, Validators.required) :
        (cur.subType === 'email') ? this.fb.control(cur.value, [Validators.required, Validators.pattern(this.emailPattern)],) :
        (cur.subType === 'tel') ?  this.fb.control(cur.value, [Validators.required, phoneNumberValidator]) :  this.fb.control(cur.value, Validators.required);
  }

  ngOnInit() {

    this.formInputs.forEach(cur => {
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

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.parentForm.value);
  }
}

export interface FieldInput {
  fieldName: string;
  label: string;
  subLabel?: string;
  required: boolean;
  type: 'select' | 'input' |'array'| 'nested',
  value?: string | string[]
  subType?: 'text' | 'tel' | 'email',
  options?: {label: string; value: string}[]
  child?: {
    fieldName: string;
    label: string;
    required: boolean;
    type: 'select' | 'input',
    value?: string | string[]
    subType?: 'text' | 'tel' | 'email',
    options?: {label: string; value: string}[]
  }[]
}

export interface SelectField {
  fieldName: string;
  label: string;
  subLabel?: string;
  required: boolean;
  type: 'select';
  value: string;
  options: {label: string; value: string}[];
}

export interface ArrayField {
  fieldName: string;
  label: string;
  subLabel?: string;
  required: boolean;
  type: 'select';
  value: string;
  options: {label: string; value: string}[];
}