import request from './requests';
import {apis} from './apis';



export const serviceGetAssets = async (data) => {
  const response = await request('post', apis.ASSETS, data);
  return response;
};
export const serviceGetLiabilities = async (data) => {
  const response = await request('post', apis.LIABILITY, data);
  return response;
};

export const serviceGetEquities = async (data) => {
  const response = await request('post', apis.EQUITY, data);
  return response;
};
export const serviceFilterAllAccounts = async (data) => {
  const response = await request(
    'post',
    apis.ALL_ACCOUNTS_FILTER_BY_KEYWORD,
    data,
  );
  return response;
};
export const serviceAllAccounts = async (data) => {
  const response = await request('post', apis.ALL_ACCOUNTS, data);
  return response;
};
export const serviceGetCustomers = async (data) => {
  const response = await request('post', apis.LIST_CUSTOMERS, data);
  return response;
};
export const serviceGenerateGeneralLedger = async (data) => {
  const response = await request('post', apis.GENERAL_LEDGER, data);
  return response;
};
export const serviceGetBalance = async (data) => {
  const response = await request('post', apis.GET_BALANCE, data);
  return response;
};
export const serviceGetAccountHeads = async () => {
  const response = await request('get', apis.ACCOUNT_HEADS);
  return response;
};
