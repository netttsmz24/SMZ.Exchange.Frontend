import { Component, OnInit } from '@angular/core';
import { CashExchangeRate } from '../../../../core/interface/CashExchangeRate';
import { RemittanceRate } from '../../../../core/interface/RemittanceRate';
import { RatesService } from '../../../../core/services/rates.service';
import { AppRoutes } from '../../../../core/constants/app.routes';
@Component({
  selector: 'app-home',
  // imports: [],
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  // app routes
  appRoutes: any = AppRoutes;
  // Data
  public cashRates: CashExchangeRate[] = [];
  public remittanceRates: RemittanceRate[] = [];

  // Error state
  public hasError = false;
  public errorMessage = '';

  constructor(private ratesService: RatesService) {

  }

  ngOnInit(): void {
    this.fetchRates();
  }

  private fetchRates(): void {
    // Reset state
    this.hasError = false;
    this.errorMessage = '';
    this.ratesService.getExchangeRates().subscribe({
      next: (response) => {
        const data = response?.data;
        this.cashRates = data?.cashExchangeRates || [];
        this.remittanceRates = data?.remittanceRates || [];
      },
      error: (err) => {
        this.hasError = true;
        this.errorMessage = 'Failed to fetch exchange rates. Please try again later.';
      }
    });
  }
} 
