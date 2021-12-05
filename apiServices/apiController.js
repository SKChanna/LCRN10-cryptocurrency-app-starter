import {serviceFilterAllAccounts, serviceGetCustomers} from './apiServices';
import * as accounts from '../store/accounts';

const loadAllAccounts = async ({ dispatch, filter, update }) => {
  dispatch(accounts.setLoading(true));
  const r = await serviceFilterAllAccounts({
    keyword: filter.keyword,
    pageNo: filter.pageNo,
    pageSize: filter.pageSize,
  });
  if (r && r.data) {
    dispatch(accounts.setList({list: r.data, update}));
  }
  dispatch(accounts.setLoading(false));
};

export {loadAllAccounts};
