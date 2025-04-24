import { AbstractControl, ValidationErrors } from '@angular/forms'

export function validateEndDate(control: AbstractControl): ValidationErrors | null {
  if (control && control.get('startDate') && control.get('endDate')) {
    const startDate = control.get('startDate')?.value
    const endDate = control.get('endDate')?.value

    if (startDate && endDate) {
      return (endDate <= startDate) ? { endDateError: true } : null
    }
  }
  return null
}
