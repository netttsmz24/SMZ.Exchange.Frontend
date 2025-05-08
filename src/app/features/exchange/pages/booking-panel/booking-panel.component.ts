import { Component, NgModule, OnInit } from '@angular/core';
import { StaticDataService } from '../../../../core/services/static-data.service';
import { CurrencyListModel } from '../../../../core/models/public-staticdata.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ExchangePanelComponent } from '../../components/exchange-panel/exchange-panel.component';
import { CashExchangeRate } from '../../../../core/interface/CashExchangeRate';
import { RatesService } from '../../../../core/services/rates.service';
import { ExchangeTransaction } from '../../../../core/models/exchange-transaction.model';
import { ClientHeaderComponent } from "../../../../shared/components/client-header/client-header.component";
import { DisclaimerFooterComponent } from '../../../../shared/components/disclaimer-footer/disclaimer-footer.component';

@Component({
    selector: 'app-booking-panel',
    imports: [
        ClientHeaderComponent,
        ExchangePanelComponent,
        CommonModule,
        FormsModule,
        DisclaimerFooterComponent
    ],
    templateUrl: './booking-panel.component.html',
    styleUrl: './booking-panel.component.css'
})

export class BookingPanelComponent implements OnInit {

    CurrencyList: CurrencyListModel[] = [];
    CashExchangeRates: CashExchangeRate[] = [];
    constructor(
        private staticDataService: StaticDataService,
        private rateService: RatesService
    ) { }

    ngOnInit(): void {
        this.loadCurrencyList();
        this.loadCurrencyRates();
    }

    loadCurrencyList(): void {
        this.staticDataService.getPublicStaticDataRequest().subscribe({
            next: (response) => {
                this.CurrencyList = response.data.currencyList;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    loadCurrencyRates(): void {
        this.rateService.getExchangeRates().subscribe({
            next: (response) => {
                this.CashExchangeRates = response.data.cashExchangeRates
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    onExchangeFormSubmit(data: ExchangeTransaction): void {
        console.log(data);
    }

}
