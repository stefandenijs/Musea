import { AbstractControl, ValidationErrors } from '@angular/forms'

export function validateEndTime(control: AbstractControl): ValidationErrors | null {
  if (control && control.get('startDate') && control.get('endDate')) {
    const startTime = control.get('dayStartTime')?.value
    const endTime = control.get('dayEndTime')?.value

    if (startTime && endTime) {
      return (endTime <= startTime) ? { endTimeError: true } : null
    }
  }
  return null
}
