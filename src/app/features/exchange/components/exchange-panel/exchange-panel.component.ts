import { Component, EventEmitter, input, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyListModel } from '../../../../core/models/public-staticdata.model';
import { CashExchangeRate } from '../../../../core/interface/CashExchangeRate';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExchangeTransaction } from '../../../../core/models/exchange-transaction.model';

const _defaultCurr = "USD";
const _defaultAmount = 100;
enum TransactionType {
    Buy = 1,
    Sell = 2
}

@Component({
    selector: 'app-exchange-panel',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './exchange-panel.component.html',
    styleUrl: './exchange-panel.component.css'
})

export class ExchangePanelComponent implements OnInit, OnChanges, OnDestroy {

    @Input('ExchangeRates') exchangeRates: CashExchangeRate[] = [];
    @Input('CurrencyList') currencyList: CurrencyListModel[] = [];
    @Output("exchangeData") exchangeData: EventEmitter<ExchangeTransaction> = new EventEmitter();

    private formSub!: Subscription;
    public TransactionType = TransactionType;
    hasSubmitted = false;

    transactionForm: FormGroup = new FormGroup({
        transactionType: new FormControl(TransactionType.Buy, [
            Validators.required
        ]),
        currencyCode: new FormControl(_defaultCurr, [
            Validators.required
        ]),
        code: new FormControl({
            value: _defaultCurr,
            disabled: true
        }),
        rate: new FormControl({
            value: 0,
            disabled: true
        }, [
            Validators.required,
            Validators.min(0.00000001)
        ]),
        amount: new FormControl(_defaultAmount, [
            Validators.required,
            Validators.min(0.01)
        ]),
        totalAmount: new FormControl({
            value: 0,
            disabled: true
        }, [
            Validators.required,
            Validators.min(0.01)
        ])
    });

    constructor() { }

    ngOnInit(): void {
        this.formSub = this.transactionForm.valueChanges.subscribe(() => {
            this.onCurrencyConverter();
        })
    }

    ngOnDestroy(): void {
        this.formSub.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['exchangeRates'] || changes['currencyList']) {
            this.onCurrencyConverter();
        }
    }

    onSubmit(): void {

        this.hasSubmitted = true;
        if (this.transactionForm.invalid) return;

        const formData: ExchangeTransaction = this.transactionForm.getRawValue() as ExchangeTransaction;
        this.exchangeData.emit(formData);
    }

    onCurrencyConverter(): void {
        const selectedCurrency: string = this.transactionForm.get('currencyCode')?.value;
        const transactionType: number = this.transactionForm.get('transactionType')?.value;
        const amount: number = this.transactionForm.get('amount')?.value;

        const matchedRate = this.exchangeRates.find(rate =>
            rate.currencyCode === selectedCurrency
        );

        const rate: number | undefined = Number(transactionType) === TransactionType.Buy ?
            matchedRate?.buyRate : matchedRate?.sellRate;

        if (matchedRate && rate && rate > 0) {
            const unit = matchedRate.units || 1;
            const totalAmount = (amount / unit) * rate;
            this.transactionForm.get('rate')?.setValue(rate, { emitEvent: false });
            this.transactionForm.get('totalAmount')?.setValue(totalAmount, { emitEvent: false });
        } else {
            this.transactionForm.get('rate')?.setValue(0, { emitEvent: false });
            this.transactionForm.get('totalAmount')?.setValue(0, { emitEvent: false });
            console.warn('No matching rate found for', selectedCurrency, 'with transaction type', transactionType);
        }
        this.transactionForm.get('code')?.setValue(selectedCurrency, { emitEvent: false });
    }
}
