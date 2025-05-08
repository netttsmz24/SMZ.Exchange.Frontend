export interface CashExchangeRate {
  currencyCode: string;
  currencyName: string;
  countryName: string;
  units: number;
  buyRate: number;
  sellRate: number;
  change: number;
}
