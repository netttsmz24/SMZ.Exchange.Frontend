export class PublicStaticDataModel {
    countryList!: CountryListModel[];
    currencyList!: CurrencyListModel[];
}

export class CountryListModel {
    rowNo!: number;
    countryName!: string;
    countryCode!: string;
}

export class CurrencyListModel {
    rowNo!: number;
    countryName!: string;
    currencyName!: string;
    currencyCode!: string;
    units!: number;
}