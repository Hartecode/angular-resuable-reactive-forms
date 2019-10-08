import { AbstractControl } from '@angular/forms'

const phoneUSCanada = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

export function phoneNumberValidator( control: AbstractControl ): { [key: string]: any } | null {
  const valid = phoneUSCanada.test(control.value);
  return valid
    ? null
    : { invalidNumber: { valid: false, value: control.value } }
}