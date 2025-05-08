import { CashExchangeRate } from "./CashExchangeRate";
import { RemittanceRate } from "./RemittanceRate";
import { TravelCardRate } from "./TravelCardRate";

export interface ExchangeRate {
    cashExchangeRates: CashExchangeRate[];
    remittanceRates: RemittanceRate[];
    travelCardRates: TravelCardRate[];
}