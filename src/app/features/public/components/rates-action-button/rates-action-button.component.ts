import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AppRoutes } from '../../../../core/constants/app.routes';

@Component({
	selector: 'app-rates-action-button',
	// imports: [],
	standalone: false,
	templateUrl: './rates-action-button.component.html',
	styleUrl: './rates-action-button.component.css'
})
export class RatesActionButtonComponent implements ICellRendererAngularComp {

	public params: any;

	constructor(private router: Router) { }

	agInit(params: any): void {
		this.params = params;
	}

	onClick() {
		this.router.navigate(["/", AppRoutes.AUTH, AppRoutes.LOGIN]);
	}

	refresh(params: any): boolean {
		return false; // return false if you don't need to refresh the cell
	}

}
