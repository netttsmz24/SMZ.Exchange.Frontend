import { ChangeDetectionStrategy, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Location } from '@angular/common';
import { RatesService } from '../../../../core/services/rates.service';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, ICellRendererParams, Theme } from 'ag-grid-community';
import { CashExchangeRate } from '../../../../core/interface/CashExchangeRate';
import { RemittanceRate } from '../../../../core/interface/RemittanceRate';
import { TravelCardRate } from '../../../../core/interface/TravelCardRate';
import { RatesActionButtonComponent } from '../../components/rates-action-button/rates-action-button.component';
import { AppRoutes } from '../../../../core/constants/app.routes';

ModuleRegistry.registerModules([AllCommunityModule]);

const borderStyle: any = {
    // borderTop: "2px solid #C5C6C7",
    // borderBottom: "2px solid #C5C6C7",
    // borderLeft: "none",
    // borderRight: "none"
}

const bstyle: any = {
    style: "solid",
    width: 2,
    color: "#C5C6C7",
}

const blackTextHeaderStyle: any = {
    color: "#1b1b1b",
    textTransform: "uppercase",
    fontWeight: 600
}

const redTextHeaderStyle: any = {
    color: "#cc0000",
    textTransform: "uppercase",
    fontWeight: 600
}

const greenTextHeaderStyle: any = {
    color: "#008000",
    textTransform: "uppercase",
    fontWeight: 600
}

const cellStyle: any = {
    color: "#000000",
    textTransform: "uppercase",
    fontWeight: 500
}

const countryCodeCellStyle: any = {
    color: "#cc0000",
    textTransform: "uppercase",
    fontWeight: 500
}

@Component({
    selector: 'app-rate-display',
    standalone: false,
    templateUrl: './rate-display.component.html',
    styleUrl: './rate-display.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RateDisplayComponent implements OnInit {

    // ViewChild
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
    appRoutes: any = AppRoutes;

    // APIs
    public cashGridApi: any;
    public cashGridColumnApi: any;
    public remittanceGridApi: any;
    public remittanceGridColumnApi: any;
    public travelCardGridApi: any;
    public travelCardGridColumnApi: any;


    myTheme = themeQuartz.withParams({
        borderColor: "#000000",
        wrapperBorder: borderStyle,
        wrapperBorderRadius: 0,
        headerRowBorder: borderStyle,
        headerColumnBorder: borderStyle,
        rowBorder: borderStyle,
        columnBorder: borderStyle,
        borderRadius: 0,
    });
    // Theme and overlays
    public theme: Theme | "legacy" = this.myTheme;

    overlayLoadingTemplate = `<span class="ag-overlay-loading-center">Loading exchange rates...</span>`;
    overlayNoRowsTemplate = `<span class="ag-overlay-no-rows-center">No Rows To Show</span>`;

    // Data
    public cashRates: CashExchangeRate[] = [];
    public remittanceRates: RemittanceRate[] = [];
    public travelCardRates: TravelCardRate[] = [];

    // Grid Columns
    public cashColumnDefs: ColDef[] = [];
    public remittanceColumnDefs: ColDef[] = [];
    public travelCardColumnDefs: ColDef[] = [];

    public defaultColDef: ColDef = {
        resizable: true,
        sortable: true,
        minWidth: 150,
        flex: 1,
    };

    // Error state
    public hasError = false;
    public errorMessage = '';

    constructor(
        private location: Location,
        private ratesService: RatesService
    ) { }

    ngOnInit(): void {
        this.setCashColumns();
        this.setRemittanceColumns();
        this.setTravelCardColumns();
        this.fetchRates();
    }

    private fetchRates(): void {
        // Reset state
        this.hasError = false;
        this.errorMessage = '';
        const skipSpinner: boolean = true; // avoid app spinner (using ag grid table loading spinner)
        this.ratesService.getExchangeRates(skipSpinner).subscribe({
            next: (response) => {
                const data = response?.data;
                this.cashRates = data?.cashExchangeRates || [];
                this.remittanceRates = data?.remittanceRates || [];
                this.travelCardRates = data?.travelCardRates || [];

                this.updateGridOverlay(this.cashGridApi, this.cashRates);
                this.updateGridOverlay(this.remittanceGridApi, this.remittanceRates);
                this.updateGridOverlay(this.travelCardGridApi, this.travelCardRates);
            },
            error: (err) => {
                this.hasError = true;
                this.errorMessage = 'Failed to fetch exchange rates. Please try again later.';
                this.cashGridApi?.showNoRowsOverlay();
                this.remittanceGridApi?.showNoRowsOverlay();
                this.travelCardGridApi?.showNoRowsOverlay();
            }
        });
    }

    public retry(): void {
        this.fetchRates();
    }

    private updateGridOverlay(gridApi: any, data: any[]): void {
        if (!gridApi) return;
        data.length === 0 ? gridApi.showNoRowsOverlay() : gridApi.hideOverlay();
        gridApi.setGridOption("rowData", data);
    }

    // Set column definitions
    private setCashColumns(): void {
        this.cashColumnDefs = [
            {
                headerName: 'Country', field: 'countryName', filter: true,
                headerClass: ['Header-Cell', 'BlackTextHeader'],
                headerStyle: blackTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'Currency Code',
                field: 'currencyCode',
                filter: true,
                headerStyle: blackTextHeaderStyle,
                cellStyle: countryCodeCellStyle
            },
            {
                headerName: 'Currency Unit',
                field: 'units',
                headerStyle: redTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'We Buy (You Sell)',
                field: 'buyRate',
                valueFormatter: this.formatRate,
                headerStyle: redTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'We Sell (You Buy)',
                field: 'sellRate',
                valueFormatter: this.formatRate,
                headerStyle: greenTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'Action',
                field: 'currencyCode',
                cellRenderer: RatesActionButtonComponent,
                headerStyle: blackTextHeaderStyle,
                cellStyle: {
                    padding: "0px",
                    backgroundColor: "#ff0000",
                    borderStyle: bstyle
                }
            },
            {
                headerName: 'Change (+-)',
                field: 'markup',
                valueFormatter: this.formatPercent,
                headerStyle: blackTextHeaderStyle,
                cellStyle: cellStyle
            }
        ];
    }

    private setRemittanceColumns(): void {
        this.remittanceColumnDefs = [
            {
                headerName: 'Country', field: 'countryName', filter: true,
                headerClass: ['Header-Cell', 'BlackTextHeader'],
                headerStyle: blackTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'Currency Code',
                field: 'currencyCode',
                filter: true,
                headerStyle: blackTextHeaderStyle,
                cellStyle: countryCodeCellStyle
            },
            {
                headerName: 'Currency Unit',
                field: 'units',
                headerStyle: redTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'We Buy (You Sell)',
                field: 'buyRate',
                valueFormatter: this.formatRate,
                headerStyle: redTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'We Sell (You Buy)',
                field: 'sellRate',
                valueFormatter: this.formatRate,
                headerStyle: greenTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'Action',
                field: 'currencyCode',
                cellRenderer: RatesActionButtonComponent,
                headerStyle: blackTextHeaderStyle,
                cellStyle: {
                    color: "#000000",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    padding: "0px"
                }
            },
            {
                headerName: 'Change (+-)',
                field: 'markup',
                valueFormatter: this.formatPercent,
                headerStyle: blackTextHeaderStyle,
                cellStyle: cellStyle
            }
        ];
    }

    private setTravelCardColumns(): void {
        this.travelCardColumnDefs = [
            {
                headerName: 'Country', field: 'countryName', filter: true,
                headerClass: ['Header-Cell', 'BlackTextHeader'],
                headerStyle: blackTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'Currency Code',
                field: 'currencyCode',
                filter: true,
                headerStyle: blackTextHeaderStyle,
                cellStyle: countryCodeCellStyle
            },
            {
                headerName: 'Currency Unit',
                field: 'units',
                headerStyle: redTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'We Buy (You Sell)',
                field: 'buyRate',
                valueFormatter: this.formatRate,
                headerStyle: redTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'We Sell (You Buy)',
                field: 'sellRate',
                valueFormatter: this.formatRate,
                headerStyle: greenTextHeaderStyle,
                cellStyle: cellStyle
            },
            {
                headerName: 'Action',
                field: 'currencyCode',
                cellRenderer: RatesActionButtonComponent,
                headerStyle: blackTextHeaderStyle,
                cellStyle: {
                    color: "#000000",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    padding: "0px"
                }
            },
            {
                headerName: 'Change (+-)',
                field: 'markup',
                valueFormatter: this.formatPercent,
                headerStyle: blackTextHeaderStyle,
                cellStyle: cellStyle
            }
        ];
    }

    // Grid Ready Events
    onCashGridReady(params: any): void {
        this.cashGridApi = params.api;
        this.cashGridColumnApi = params.columnApi;
        this.cashGridApi.showLoadingOverlay();
    }

    onRemittanceGridReady(params: any): void {
        this.remittanceGridApi = params.api;
        this.remittanceGridColumnApi = params.columnApi;
        this.remittanceGridApi.showLoadingOverlay();
    }

    onTravelCardGridReady(params: any): void {
        this.travelCardGridApi = params.api;
        this.travelCardGridColumnApi = params.columnApi;
        this.travelCardGridApi.showLoadingOverlay();
    }

    // Formatters
    public formatRate(params: any): string {
        return params.value ? params.value.toFixed(4) : '-';
    }

    public formatPercent(params: any): string {
        return params.value != null ? `${params.value.toFixed(2)}%` : '-';
    }

    public goBack(): void {
        this.location.back();
    }
}
