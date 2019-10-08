import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STATE_CODE } from '../state';
import { FormGeneratorService } from '../service/form-generator.service';

@Component({
  selector: 'ag-form',
  templateUrl: './ag-form.component.html',
  styleUrls: ['./ag-form.component.css']
})
export class AgFormComponent {

  public states = STATE_CODE.map(s => ({label: s.name,value: s.abbreviation}));
  private _formInputs: FieldInput[];
  parentForm = this.fb.group({});

  @Input() 
  set formInputs(val: FieldInput[]) {
    if (val) {
      this._formInputs = val;
      this.parentForm = this.formGenerator.generateForm(val);
    }
  };

  get formInputs() {
    return this._formInputs;
  }
  constructor(
    private fb: FormBuilder,
    private formGenerator: FormGeneratorService
    ) { }

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