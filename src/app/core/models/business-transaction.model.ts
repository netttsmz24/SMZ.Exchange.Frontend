import { Attachment } from "./attachment.model";

export interface Individual {
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    dob: string;
    nationality: string;
    icppNo: string;
    iD_Attachment: Attachment;
  }
  
  export interface NewCompanyDetails {
    nameOfCompany: string;
    dateOfIncorp: string;
    typeOfCompany: string;
    principalBusinessActivity: string;
    emailAddress: string;
    purposeOfTransaction: string;
    ssmProfileAttachment: Attachment;
    placeOfIncorporation: string;
    registrationNo: string;
    address: string;
    contactNo: string;
    sourceOfFunds: string;
    sourceOfFundsAttachment: Attachment;
    shareHoldersList: Individual[];
    seniorManagersList: Individual[];
    authorizedPersonList: Individual[];
    logisticPersonsList: Individual[];
    authorizationLetter: Attachment;
  }
  
  export interface BusinessExchangeTransaction {
    userId: string;
    transactionType: number;
    currencyCode: string;
    rate: number;
    amount: number;
    totalAmount: number;
    customerCategory: number;
    customerType: number;
    amlFlag: string;
    newCompanyDetails: NewCompanyDetails;
  }