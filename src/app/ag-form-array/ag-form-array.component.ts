import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'ag-form-array',
  templateUrl: './ag-form-array.component.html',
  styleUrls: ['./ag-form-array.component.css']
})
export class AgFormArrayComponent {

  @Input() label: string;
  @Input() subLabel: string;
  @Input() type: string = 'text';
  @Input() name: string;
  @Input() formName: string;
  @Input() parentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  get arrayField(): FormArray { 
    return this.parentForm.get(this.formName) as FormArray; 
  }

  addField() {
    this.arrayField.push(this.fb.control(''));
  }

  removeField(index: number) {
    this.arrayField.removeAt(index);
  }
}