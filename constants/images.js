import {Image} from "react-native";
import React from "react";
import {COLORS} from "./theme";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

const banner = require("../assets/images/banner.png");
const curveBanner = require("../assets/images/curveBanner.png");
const bitcoin = require("../assets/images/bitcoin.png");
const ethereum = require("../assets/images/ethereum.png");
const litecoin = require("../assets/images/litecoin.png");
const ripple = require("../assets/images/ripple.png");

const equity = require("../assets/images/equity.png");
const asset = require("../assets/images/asset.png");
const liability = require("../assets/images/liability.png");
const expense = require("../assets/images/expense.png");
const revenue = require("../assets/images/revenue.png");
const cash = require("../assets/images/cash.png");
const loss = require("../assets/images/loss.png");
const profit = require("../assets/images/netProfit.png");
const receiveable = require("../assets/images/receiveable.png");
const investment = require("../assets/images/investment.png");
const inventory = require("../assets/images/inventory.png");
const sales = require("../assets/images/sales.png");
const costOfGoods = require("../assets/images/costOfGoods.png");


export const AccountAvatar = ({id, ...props}) => {
    // 1 = Assets
    // 2 = Liabilities
    // 3 = equity
    // 4 = Revenue
    // 5 = Expenses

    if (id <= 11 || id == 14) {
        let source = litecoin;
        if (id == 1) source = asset;
        else if (id == 2) source = liability;
        else if (id == 3) source = equity;
        else if (id == 4) source = revenue;
        else if (id == 5) source = expense;
        else if (id == 6) source = cash;
        else if (id == 7) source = receiveable;
        else if (id == 8) source = liability;
        else if (id == 9) source = sales;
        else if (id == 10) source = costOfGoods;
        else if (id == 11) source = inventory;
        else if (id == 14) source = investment;

        return (
          <Image
            source={source}
            {...props}
          />
        )
    }  else {
        return <IoniconsIcon name="ios-person-circle"  color={COLORS.lightGray} {...props} />
    }
}

export default {
    banner,
    curveBanner,
    bitcoin,
    ethereum,
    litecoin,
    ripple,

    equity,
    asset,
    liability,
    expense,
    revenue,
    cash,
    loss,
    profit,
    receiveable,
    inventory,
    investment,
    costOfGoods,
    sales
}
