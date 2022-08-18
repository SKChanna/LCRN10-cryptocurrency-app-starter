// export const BASE_URL = 'http://94.23.21.60:8088/hamidApi/';
export const BASE_URL = 'http://192.168.100.113:9091/';
export const apis = {
  LIST_CUSTOMERS: 'account/filterAccountByMainAccountIdAndKeyword',
  ALL_ACCOUNTS: 'account/getAllAccounts',
  ALL_ACCOUNTS_FILTER_BY_KEYWORD: 'account/filterAccountByKeyword',
  GENERAL_LEDGER: 'report/generateGeneralLedger',
  GET_BALANCE: 'account/balance',
  ACCOUNT_HEADS: 'account/getAccountHeads',
  GENERAL_ENTRY: 'account/generalEntry/0',
  ASSETS:  'account/getAssets',
  EQUITY: 'account/getEquity',
  LIABILITY: 'account/getLiabilities'
};
