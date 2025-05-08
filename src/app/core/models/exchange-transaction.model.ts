import { Attachment } from "./attachment.model";

export interface PersonDetails {
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    icppNo: string;
    dob: string;
    nationality: string;
    contactNo: string;
    icppNoAttachment: Attachment;
}

export interface boPersonDetails {
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    icppNo: string;
    dob: string;
    nationality: string;
    contactNo: string;
    icppNoAttachment: Attachment;
    address: string;
    emailAddress: string;
    nameOfEmployer: string;
    occupation: string;
    purposeOfTransaction: string;
    purposeOfTransSupportDoc: Attachment;
    sourceOfFunds: string;
    sourceOfFundsSupportDoc: Attachment;
    estimatedIncomePerAnnum: number;
    incomeSupportDoc: Attachment;
    volumeLargeReason: string;
    volumeLargeReasonSupportDoc: Attachment;
}

export interface ptobPersonDetails {
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    icppNo: string;
    dob: string;
    nationality: string;
    contactNo: string;
    icppNoAttachment: Attachment;
}

export interface ExchangeTransaction {
    transactionType: number;
    currencyCode: string;
    rate: number;
    amount: number;
    totalAmount: number;
    customerCategory: number;
    customerType: number;
    amlFlag: string;
    boDetails: PersonDetails;
    ptobDetails: PersonDetails;
}