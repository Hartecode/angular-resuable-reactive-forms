import { Component, Input, forwardRef} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'ag-input',
  templateUrl: './ag-input.component.html',
  styleUrls: ['./ag-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgInputComponent),
      multi: true
    }
  ]
})
export class AgInputComponent implements ControlValueAccessor {
  onTouched = () => {};
  onChange = (val: string) => {};
  public value: string;

  @Input() label: string;
  @Input() inputId: string = 'id-sample';
  @Input() inputType: string = 'text';
  @Input() inputName: string;
  @Input() disabled: boolean;
  @Input() inputField;
  @Input() alertMessage: string;
  @Input() required: boolean;

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