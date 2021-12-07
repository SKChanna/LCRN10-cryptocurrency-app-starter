import {
  serviceFilterAllAccounts,
  serviceGenerateGeneralLedger,
  serviceGetBalance,
  serviceGetCustomers
} from './apiServices';
import * as accounts from '../store/accounts';
import moment from "moment";

const loadAllAccounts = async (dispatch = null, filter, update) => {
  if (dispatch)
    dispatch(accounts.setLoading(true));
  const r = await serviceFilterAllAccounts({
    keyword: filter.keyword,
    pageNo: filter.pageNo,
    pageSize: filter.pageSize,
  });
  if (r && r.data) {
    if (dispatch)
      dispatch(accounts.setList({list: r.data, update}));
    return r.data;
  }
  return []
};

const generateGeneralLedger = async ({ id, accountType, start = new Date(), end = new Date()}) => {
  const data = { ledger: [], currentBalance: 0, openingBalance: 0 };
  let response = await serviceGenerateGeneralLedger({
    fromDate: moment(start).format("YYYY-MM-DD")+"T00:00:00",
    pageNo: 0,
    pageSize: 9999999,
    reportId: id,
    toDate: moment(end).format("YYYY-MM-DD")+"T23:59:59",
  });
  if (response && response.data) {
    let tempBalance = 0;
    response.data.map((l) => {
      if(accountType == 'DR'){
        tempBalance += (Math.abs(parseFloat(l.debit)) - Math.abs(parseFloat(l.credit)));
      } else if(accountType == 'CR'){
        tempBalance += (Math.abs(parseFloat(l.credit))-Math.abs(parseFloat(l.debit)));
      }
    })
    data.currentBalance = tempBalance;
    data.ledger = response.data;
  }
  console.log("before Opening ", accountType ,{...data, ledger: null});
  response = await serviceGetBalance({
    fromDate: moment(start).format("YYYY-MM-DD")+"T00:00:00",
    accountId: id,
    toDate: moment(start).format("YYYY-MM-DD")+"T00:00:00",
  });
  if (response && response.data) {
    data.openingBalance = response.data[0].openingBalance;
  }
  console.log("After opening ", accountType ,{...data, ledger: null, calculatedBalance: (data.openingBalance + data.currentBalance)});
  return data;
};

export {loadAllAccounts, generateGeneralLedger};
