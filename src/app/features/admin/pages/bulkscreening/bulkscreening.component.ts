import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
    themeQuartz,
    themeBalham,
    ColDef,
    ColGroupDef,
    Theme,
} from 'ag-grid-community';
import { screeningData } from './data';
import { DateUtility } from '../../../../shared/utils/date';

const borderStyle: any = {
    style: "solid",
    width: 2,
    color: "#C5C6C7",
}

@Component({
    selector: 'app-bulkscreening',
    imports: [
        AgGridAngular
    ],
    templateUrl: './bulkscreening.component.html',
    styleUrl: './bulkscreening.component.css'
})
export class BulkscreeningComponent {
    rowData: any = screeningData;
    cashColumnDefs: (ColDef | ColGroupDef)[] = [
        {
            headerName: "Descp Date Screened",
            marryChildren: true,
            children: [
                {
                    headerName: "Trn No",
                    field: "TransNo",
                    colId: "TrnNo",
                    headerClass: "bs-ag-firstHeader-subheader",
                    width: 100,
                    cellClass: "bs-ag-commonCellStyle"
                },
                {
                    headerName: "DD/MM/YY HH:MM",
                    field: "TransDate",
                    colId: "TrnDate",
                    headerClass: "bs-ag-firstHeader-subheader",
                    width: 180,
                    cellClass: "bs-ag-commonCellStyle"
                }
            ],
            wrapHeaderText: true,
            autoHeaderHeight: true,
            headerClass: "bs-ag-firstHeader",
        },
        {
            headerName: "Transaction Made",
            marryChildren: true,
            children: [
                {
                    headerName: "Parameter 1",
                    colId: "parameter1",
                    marryChildren: true,
                    headerClass: "bs-ag-secondHeader-subheader-1",
                    children: [
                        { headerName: "Name 1", field: "FirstName", colId: "FirstName", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                        { headerName: "Name 2", field: "SecondName", colId: "SecondName", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                        { headerName: "Name 3", field: "ThirdName", colId: "ThirdName", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                        { headerName: "Name 4", field: "FourthName", colId: "FourthName", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
                {
                    headerName: "2 Para",
                    colId: "parameter2",
                    marryChildren: true,
                    headerClass: "bs-ag-secondHeader-subheader-1",
                    children: [
                        { headerName: "ID/PP No", field: "ICPPNo", colId: "ICPPNo", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
                {
                    headerName: "3 Para",
                    colId: "parameter3",
                    marryChildren: true,
                    headerClass: "bs-ag-secondHeader-subheader-1",
                    children: [
                        { headerName: "DOB", field: "DOB", colId: "DOB", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
                {
                    headerName: "4 Para",
                    colId: "parameter4",
                    marryChildren: true,
                    headerClass: "bs-ag-secondHeader-subheader-1",
                    children: [
                        { headerName: "Nationality", field: "Nationality", colId: "Nationality", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
            ],
            headerClass: "bs-ag-secondHeader"
        },
        {
            headerName: "Parameter",
            marryChildren: true,
            headerClass: "bs-ag-secondHeader",
            children: [
                {
                    headerName: "4",
                    colId: "ScoreParameter",
                    marryChildren: true,
                    headerClass: "bs-ag-secondHeader",
                    children: [
                        { headerName: "Score", field: "Score", colId: "Score", headerClass: "bs-ag-secondHeader-subheader-2", width: 180, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
            ]
        },
        {
            headerName: "Screened with DB (dd/mm/yy)",
            marryChildren: true,
            headerClass: "bs-ag-fourthHeader",
            children: [
                { headerName: "UNSCR", field: "UNSCR", colId: "UNSCR", headerClass: "bs-ag-fourthHeader-subheader-1", width: 170, cellClass: "bs-ag-commonCellStyle" },
                { headerName: "MOHA", field: "MOHA", colId: "MOHA", headerClass: "bs-ag-fourthHeader-subheader-1", width: 170, cellClass: "bs-ag-commonCellStyle" },
                { headerName: "OFAC", field: "OFAC", colId: "OFAC", headerClass: "bs-ag-fourthHeader-subheader-1", width: 170, cellClass: "bs-ag-commonCellStyle" },
                { headerName: "PEPS", field: "PEPS", colId: "PEPS", headerClass: "bs-ag-fourthHeader-subheader-1", width: 170, cellClass: "bs-ag-commonCellStyle" },
            ]
        },
        {
            headerName: "SCREENING SCORE",
            marryChildren: true,
            children: [
                {
                    headerName: "1 Parameter",
                    colId: "ss_parameter1",
                    marryChildren: true,
                    children: [
                        { headerName: "Name 1", field: "SS_FirstName", colId: "FirstName", width: 100, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                        { headerName: "Name 2", field: "SS_SecondName", colId: "SecondName", width: 100, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                        { headerName: "Name 3", field: "SS_ThirdName", colId: "ThirdName", width: 100, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                        { headerName: "Name 4", field: "SS_FourthName", colId: "FourthName", width: 100, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                    ],
                    headerClass: "bs-ag-firstHeader-subheader",
                },
                {
                    headerName: "2 Para",
                    colId: "ss_parameter2",
                    marryChildren: true,
                    children: [
                        { headerName: "ID/PP No", field: "SS_ICPPNo", colId: "SS_ICPPNo", width: 110, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                    ],
                    headerClass: "bs-ag-firstHeader-subheader",
                },
                {
                    headerName: "3 Para",
                    colId: "ss_parameter3",
                    marryChildren: true,
                    children: [
                        { headerName: "DOB", field: "SS_DOB", colId: "SS_DOB", width: 110, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                    ],
                    headerClass: "bs-ag-firstHeader-subheader",
                },
                {
                    headerName: "4 Para",
                    colId: "ss_parameter4",
                    marryChildren: true,
                    children: [
                        { headerName: "Nationality", field: "SS_Nationality", colId: "SS_Nationality", width: 110, headerClass: "bs-ag-firstHeader-subheader2", cellClass: "bs-ag-commonCellStyle" },
                    ],
                    headerClass: "bs-ag-firstHeader-subheader",
                },
            ],
            headerClass: "bs-ag-firstHeader",
        },
        {
            headerName: "Matrix",
            marryChildren: true,
            headerClass: "bs-ag-matrixHeader",
            children: [
                {
                    headerName: "4",
                    colId: "Matrix",
                    marryChildren: true,
                    headerClass: "bs-ag-matrixHeader-subheader",
                    children: [
                        { headerName: "Risk Score", field: "RiskScore", colId: "RiskScore", headerClass: "bs-ag-matrixHeader-subheader1", width: 130, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
            ]
        },
        {
            headerName: "Risk%",
            marryChildren: true,
            headerClass: "bs-ag-riskHeader",
            children: [
                {
                    headerName: "100%",
                    colId: "Risk",
                    marryChildren: true,
                    headerClass: "bs-ag-riskHeader-subHeader",
                    children: [
                        {
                            headerName: "Risk%", field: "RiskPercent", colId: "RiskPercent", headerClass: "bs-ag-riskHeader-subHeader1", width: 140, cellClass: "bs-ag-commonCellStyle"
                        },
                    ]
                },
            ]
        },
        {
            headerName: "FLAG",
            marryChildren: true,
            headerClass: "bs-ag-riskHeader",
            children: [
                {
                    headerName: "Risk",
                    colId: "FLAG",
                    headerClass: "bs-ag-riskHeader-subHeader",
                    marryChildren: true,
                    children: [
                        { headerName: ">=85%", field: "RP_Morethen85", colId: "RP_Morethen85", headerClass: "bs-ag-riskHeader-subHeader1", width: 140, cellClass: "bs-ag-commonCellStyle" },
                    ]
                },
            ]
        },
    ];
    defaultColDef: any = {};
    pagination: boolean = true;
    paginationPageSize: number = 10;
    paginationPageSizeSelector: number[] = [10, 20, 50, 100];
    myTheme = themeBalham.withParams({
        borderColor: "#000000",
        wrapperBorder: borderStyle,
        wrapperBorderRadius: 0,
        headerRowBorder: borderStyle,
        headerColumnBorder: borderStyle,
        rowBorder: borderStyle,
        columnBorder: borderStyle,
        borderRadius: 0,
    });
    public theme: Theme | "legacy" = this.myTheme;
    currentDate:any =  ""
    overlayLoadingTemplate = `<span class="ag-overlay-loading-center">Loading exchange rates...</span>`;
    overlayNoRowsTemplate = `<span class="ag-overlay-no-rows-center">No Rows To Show</span>`;

    constructor() {
        this.currentDate = new DateUtility().getCurrenctDate();
    }

    onCashGridReady(event: any): void {
        // console.log('grid ready');
    }

}
