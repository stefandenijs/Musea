import { AbstractControl, ValidationErrors } from '@angular/forms'

export function notInFuture(control: AbstractControl): ValidationErrors | null {
  const now = new Date()
  const notAllowed = new Date(control.value) > now
  return notAllowed ? { notInFuture: { value: control.value } } : null
}
