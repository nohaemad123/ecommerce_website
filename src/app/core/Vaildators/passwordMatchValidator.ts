import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(controlName: string, matchingControlName: string):ValidatorFn{

    return (control:AbstractControl): ValidationErrors | null => {

        const password=control.get('controlName');
        const confirmPassword=control.get('matchingControlName');
        if (password !== confirmPassword) {
            return { passwordMismatch: true };
          }
      
          return null;
    }
}