import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchOtherValidator(otherControlName: string): ValidatorFn {
    return (control: AbstractControl) => {
        if (!control.parent) return null;

        const otherControl = control.parent.get(otherControlName);
        if (!otherControl) return null;

        return control.value === otherControl.value ? null : { mismatch: true };
    };
}
