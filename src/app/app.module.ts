import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgFormArrayComponent } from './ag-form-array/ag-form-array.component';
import { AgFormComponent } from './ag-form/ag-form.component';
import { AgInputComponent } from './ag-input/ag-input.component';
import { AgInputWrapperComponent } from './ag-input-wrapper/ag-input-wrapper.component';
import { AgSelectComponent } from './ag-select/ag-select.component';


@NgModule({
  imports:      [ BrowserModule,   ReactiveFormsModule, FormsModule ],
  declarations: [ 
    AppComponent, 
    AgFormArrayComponent,
    AgFormComponent, 
    AgInputComponent, 
    AgInputWrapperComponent,
    AgSelectComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
