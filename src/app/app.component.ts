import { Component } from '@angular/core';
import { FieldInput } from './ag-form/ag-form.component';
import { STATE_CODE } from './state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  private sampleDataOne:FieldInput[] = [
    {
      fieldName: 'firstName',
      label: 'First Name',
      required: true,
      type: 'input',
      subType: 'text',
      value: ''
    },
    {
      fieldName: 'lastName',
      label: 'Last Name',
      required: false,
      type: 'input',
      subType: 'text',
      value: ''
    },
    {
      fieldName: 'address',
      label: 'Address',
      subLabel: '',
      required: false,
      type: 'nested',
      child: [
        {
          fieldName: 'Street',
          label: 'Street',
          required: true,
          type: 'input',
          subType: 'text',
          value: ''
        },
        {
          fieldName: 'city',
          label: 'City',
          required: true,
          type: 'input',
          subType: 'text',
          value: ''
        },
        {
          fieldName: 'state',
          label: 'State',
          required: true,
          type: 'select',
          value: '',
          options: STATE_CODE.map(s => ({label: s.name,value: s.abbreviation}))
        },
        {
          fieldName: 'zipCode',
          label: 'Zip',
          required: true,
          type: 'input',
          subType: 'text',
          value: ''
        }
      ]
    },
    {
      fieldName: 'email',
      label: 'Email',
      required: true,
      type: 'input',
      subType: 'email',
      value: ''
    },
    {
      fieldName: 'contactNumber',
      label: 'Conent',
      subLabel: 'Phone',
      required: false,
      type: 'array',
      value: [''],
      subType: 'tel'
    }
  ];

  private sampleDataTwo: FieldInput[] = [
    {
      fieldName: 'questionOne',
      label: 'What is your faviorate program langauge?',
      required: false,
      type: 'input',
      subType: 'text',
      value: ''
    },
    {
      fieldName: 'questionTwo',
      label: 'What is you faviorate frame work?',
      required: false,
      type: 'input',
      subType: 'text',
      value: 'please'
    }
  ];

  public data: FieldInput[] = this.sampleDataOne;

}
