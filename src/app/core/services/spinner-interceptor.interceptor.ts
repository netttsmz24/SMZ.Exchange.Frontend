import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
	const spinnerService = inject(SpinnerService);

	const skipSpinner = req.headers.has('X-Skip-Spinner');

	const modifiedReq = skipSpinner
		? req.clone({ headers: req.headers.delete('X-Skip-Spinner') })
		: req;

	if (!skipSpinner) {
		spinnerService.incrementRequestCount();
		if (spinnerService.getRequestCount() === 1) {
			spinnerService.show();
		}
	}

	return next(modifiedReq).pipe(
		finalize(() => {
			if (!skipSpinner) {
				spinnerService.decrementRequestCount();
				if (spinnerService.getRequestCount() === 0) {
					spinnerService.hide();
				}
			}
		})
	);
};
