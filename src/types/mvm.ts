import { TransactionInput } from './transaction';
import { JsonFragment } from '@ethersproject/abi';
import { Payment } from './transfer';

export interface InvokeCodeParams {
  asset: string;
  amount: string;
  extra: string;
  trace: string;
  process?: string;
}

interface ContractParams {
  contractAddress: string;
  methodName?: string;
  types?: string[];
  values?: any[];
  methodID?: string;
}

export interface ExtraGenerateParams extends ContractParams {
  options?: {
    delegatecall?: boolean; // use delegatecall
    process?: string; // registry process
    address?: string; // registry address
    uploadkey?: string; // auto upload params

    ignoreUpload?: boolean; // ignore upload params
  };
}

export interface PaymentGenerateParams extends ExtraGenerateParams {
  extra?: string;
  payment?: {
    asset?: string;
    amount?: string;
    trace?: string;
    type?: 'payment' | 'tx'; // payment or tx, default is payment
  };
}

export interface MvmClientRequest {
  getMvmTransaction: (params: InvokeCodeParams) => Promise<TransactionInput>;
  abiParamsGenerator: (contractAddress: string, abi: JsonFragment[]) => { [method: string]: Function };
  extraGenerateByInfo: (params: ExtraGenerateParams) => Promise<string>;
  paymentGenerateByInfo: (params: PaymentGenerateParams) => Promise<Payment | TransactionInput>;
}
