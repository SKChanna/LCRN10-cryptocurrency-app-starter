export const BASE_URL = 'http://94.23.21.60:8088/hamidApi/';
// export const BASE_URL = 'http://192.168.100.113:9092/';
export const apis = {
  LIST_CUSTOMERS: 'account/filterAccountByMainAccountIdAndKeyword',
  ALL_ACCOUNTS: 'account/getAllAccounts',
  ALL_ACCOUNTS_FILTER_BY_KEYWORD: 'account/filterAccountByKeyword',
  GENERAL_LEDGER: 'report/generateGeneralLedger',
  GET_BALANCE: 'account/balance',
};
