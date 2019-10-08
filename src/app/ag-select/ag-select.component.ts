import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl
} from '@angular/forms';

@Component({
  selector: 'ag-select',
  templateUrl: './ag-select.component.html',
  styleUrls: ['./ag-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgSelectComponent),
      multi: true
    }
  ]
})
export class AgSelectComponent implements ControlValueAccessor {
  onTouched = () => {};
  onChange = (val: string) => {};
  public value: string;

  @Input() label: string;
  @Input() selectId: string = 'id-select';
  @Input() options: Option[];
  @Input() selectName: string;
  @Input() inputField: FormControl;
  @Input() alertMessage: string;
  @Input() disabled: boolean;

  onBlur() {
    this.onTouched();
  }

  writeValue(val: string): void {
    this.value = val;
    this.onChange(val);
  }

  registerOnChange(fn: (val) => void ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

export interface Option {
  label: string;
  value: string;
}