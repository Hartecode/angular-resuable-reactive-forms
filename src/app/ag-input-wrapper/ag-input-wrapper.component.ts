import { Component, Input } from '@angular/core';
import {
  FormControl
} from '@angular/forms';

@Component({
  selector: 'ag-input-wrapper',
  templateUrl: './ag-input-wrapper.component.html',
  styleUrls: ['./ag-input-wrapper.component.css']
})
export class AgInputWrapperComponent {
  @Input() inputField: FormControl;
  @Input() alertMessage: string;

}