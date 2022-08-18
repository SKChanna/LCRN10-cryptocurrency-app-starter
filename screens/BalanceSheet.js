import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Button } from 'react-native-paper';
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, defaults, dummyData, FONTS, icons, images, SIZES} from "../constants";
import {useSelector, useDispatch} from "react-redux";
import * as accounts from '../store/accounts';
import {generateGeneralLedger, loadAllAccounts} from "../apiServices/apiController";
import {FlatList, ScrollView, TextInput} from "react-native-gesture-handler";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {acc, eq} from "react-native-reanimated";
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  serviceAddGeneralEntry,
  serviceGetAccountHeads,
  serviceGetAssets, serviceGetEquities,
  serviceGetLiabilities
} from "../apiServices/apiServices";
import {Toast} from "react-native-toast-message/lib/src/Toast";
import * as dashboardStore from "../store/dashboard";
import {AccountAvatar} from "../constants/images";
import {roundNumber} from "../utils";
import ListItem from "../components/ListItem";
import Modal from "react-native-modal";

const BalanceSheet = ({ navigation }) => {

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const generalAccounts = useSelector(dashboardStore.generalAccounts);
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [equities, setEquities] = useState([]);
  const [profit, setProfit] = useState(0);
  const [revenueAccount, setRevenueAccount] = useState(null);
  const [expenseAccount, setExpenseAccount] = useState(null);

  const getBalanceSheetData = async () => {
    const AccountHeads = await serviceGetAccountHeads();
    if (AccountHeads && AccountHeads.data)
      dispatch(dashboardStore.setGeneralAccounts(AccountHeads.data));

    const requestData = {pageNo:0,pageSize:999999999};

    const Assets = await serviceGetAssets(requestData);
    if (Assets && Assets.data)
      setAssets(Assets.data);

    const Liabilities = await serviceGetLiabilities(requestData);
    if (Liabilities && Liabilities.data)
      setLiabilities(Liabilities.data);

    const Equities = await serviceGetEquities(requestData);
    if (Equities && Equities.data)
      setEquities(Equities.data);

    console.log("~~~~~~~       Balance Sheet Data      ~~~~~~~~~~~~~~");
    console.log(AccountHeads.data);
    console.log(Assets.data);
    console.log(Liabilities.data);
    console.log(Equities.data);

  }

  useEffect(() => {
    let tempExpenseAccount = expenseAccount;
    let tempRevenueAccount = revenueAccount;

    generalAccounts.map( (head) => {
      if (head.accountName==='Expenses') {
        tempExpenseAccount = head;
      }
      else if( head.accountName==='Revenue') {
        tempRevenueAccount = head;
      }
    });

    setProfit(tempRevenueAccount.balance - tempExpenseAccount.balance);

    setExpenseAccount(tempExpenseAccount);
    setRevenueAccount(tempRevenueAccount);

  }, [generalAccounts]);

  useEffect(() => {
    getBalanceSheetData()
  }, []);

  let totalAssetsBalance = 0;
  let totalLiabilitiesBalance = 0;
  let totalEquitiesBalance = 0;

  const ListItem = ({ account }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Transaction", {item: account});
        setIsModalVisible(false);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
      }}
    >
      <View style={{ flex: 0.2 }} >
        <AccountAvatar
          id={account.id}
          size={35}
          color={COLORS.lightGray}
          resizeMode="cover"
          style={{
            marginVertical: 2,
            width: 35,
            height: 35
          }}
        />
      </View>
      <View style={{ flex: 0.5 }}>
        <Text style={{ ...FONTS.body5,  }} >{account.accountName}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 0.4
        }}
      >
        <View style={{ flex: 0.8, alignItems: 'flex-end', marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h5,  }} >{roundNumber(account.balance)}</Text>
        </View>
        <View style={{ flex: 0.2 }} >
          <Image
            source={icons.right_arrow}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.gray
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView>
      <View
        style={{
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding -10
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              ...FONTS.h2
            }}
          >
            BalanceSheet
          </Text>
        </View>

        <View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              margin: 5,
              ...styles.shadow
            }}
          >
            <Text style={{...FONTS.h4}} >ASSETS</Text>
            <Text style={{...FONTS.h4}} >Current Assets</Text>

            <View style={{ marginVertical: SIZES.padding }} >
              {
                assets.map((asset)=>{
                  totalAssetsBalance += asset.balance;
                  return (
                    <ListItem account={asset} key={asset.id} />
                  )
                })
              }
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              flexDirection: 'row',
              borderRadius: 10,
              padding: 10,
              margin: 5,
              marginTop: SIZES.padding,
              ...styles.shadow
            }}
          >
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}
            >
              <Text style={{...FONTS.h4}} >Total Assets</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1
              }}
            >
              <Text style={{...FONTS.h4}} >{roundNumber(totalAssetsBalance)}</Text>
            </View>

          </View>


          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              margin: 5,
              ...styles.shadow
            }}
          >
            <Text style={{...FONTS.h4}} >LIABILITIES & EQUITIES</Text>
            <Text style={{...FONTS.h4}} >Current Liabilities</Text>

            <View style={{ marginVertical: SIZES.padding }} >
              {
                liabilities.map((liability)=>{
                  totalLiabilitiesBalance += liability.balance;
                  return (
                    <ListItem account={liability} key={liability.id} />
                  )
                })
              }
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.padding - 14
                }}
              >
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}
                >
                  <Text style={{...FONTS.body4}} >Total Liabilities</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    flex: 1
                  }}
                >
                  <Text style={{...FONTS.body4}} >{roundNumber(totalLiabilitiesBalance)}</Text>
                </View>

              </View>
            </View>

            <Text style={{...FONTS.h4}} >Current Equities</Text>

            <View style={{ marginVertical: SIZES.padding }} >
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}
              >
                {
                  revenueAccount && expenseAccount && (
                    <>
                      { profit >= 0 && (
                        <>
                          <View style={{ flex: 0.2 }} >
                            <Image
                              source={images.profit}
                              resizeMode="cover"
                              style={{
                                marginVertical: 2,
                                width: 35,
                                height: 35
                              }}
                            />
                          </View>
                          <View style={{ flex: 0.5 }}>
                            <Text style={{ ...FONTS.body5,  }} >Profit</Text>
                          </View>
                        </>
                      )}

                      { profit < 0 && (
                        <>
                          <View style={{ flex: 0.2 }} >
                            <Image
                              source={images.loss}
                              resizeMode="cover"
                              style={{
                                marginVertical: 2,
                                width: 35,
                                height: 35
                              }}
                            />
                          </View>
                          <View style={{ flex: 0.5 }}>
                            <Text style={{ ...FONTS.body5,  }} >Loss</Text>
                          </View>
                        </>
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 0.4
                        }}
                      >
                        <View style={{ flex: 0.8, alignItems: 'flex-end', marginLeft: SIZES.radius }}>
                          <Text style={{ ...FONTS.h5,  }} >{roundNumber(profit)}</Text>
                        </View>
                        <View style={{ flex: 0.2 }} >
                          <Image
                            source={icons.right_arrow}
                            style={{
                              width: 15,
                              height: 15,
                              tintColor: COLORS.gray
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )
                }

                {
                  revenueAccount == null || expenseAccount == null && (
                    <>
                      <>
                        <View style={{ flex: 0.2 }} >
                          <IoniconsIcon
                            size={35}
                            color={COLORS.red}
                            name="alert-circle-outline"
                          />
                        </View>
                        <View style={{ flex: 0.5 }}>
                          <Text style={{ ...FONTS.body5, color: COLORS.red }} >failed to calculate profit</Text>
                        </View>
                      </>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 0.4
                        }}
                      >
                        <View style={{ flex: 0.8, alignItems: 'flex-end', marginLeft: SIZES.radius }}>
                          <Text style={{ ...FONTS.h5, color: COLORS.red }} ></Text>
                        </View>
                        <View style={{ flex: 0.2 }} >
                          <Image
                            source={icons.right_arrow}
                            style={{
                              width: 15,
                              height: 15,
                              tintColor: COLORS.gray
                            }}
                          />
                        </View>
                      </View>
                    </>
                  )
                }

              </TouchableOpacity>
              {
                equities.map((equity)=>{
                  totalEquitiesBalance += equity.balance;
                  return (
                    <ListItem account={equity} key={equity.id} />
                  )
                })
              }
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.padding - 14
                }}
              >
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}
                >
                  <Text style={{...FONTS.body4}} >Total Equities</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    flex: 1
                  }}
                >
                  <Text style={{...FONTS.body4}} >{roundNumber(totalEquitiesBalance + profit)}</Text>
                </View>

              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              flexDirection: 'row',
              borderRadius: 10,
              padding: 10,
              margin: 5,
              marginTop: SIZES.padding,
              ...styles.shadow
            }}
          >
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}
            >
              <Text style={{...FONTS.h4}} >Total Liabilities & Equities</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1
              }}
            >
              <Text style={{...FONTS.h4}} >{roundNumber((totalEquitiesBalance+profit) + totalLiabilitiesBalance)}</Text>
            </View>

          </View>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        coverScreen={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            padding: SIZES.padding - 10,
            marginVertical: SIZES.padding
          }}
        >
          <View
            style={{
              padding: 10
            }}
          >
            { revenueAccount && <ListItem account={revenueAccount} /> }
            { expenseAccount && <ListItem account={expenseAccount} /> }

            { !revenueAccount && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Transaction", {item: {
                      id: 4,
                      accountName: 'Revenue'
                    }});setIsModalVisible(false)
                  setIsModalVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}
              >
                <View style={{ flex: 0.2 }} >
                  <IoniconsIcon
                    size={35}
                    color={COLORS.red}
                    name="alert-circle-outline"
                  />
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={{ ...FONTS.body5, color: COLORS.red }} >Failed to load revenue</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 0.4
                  }}
                >
                  <View style={{ flex: 0.8, alignItems: 'flex-end', marginLeft: SIZES.radius }}>
                    <Text style={{ ...FONTS.h5, color: COLORS.red }} > --- </Text>
                  </View>
                  <View style={{ flex: 0.2 }} >
                    <Image
                      source={icons.right_arrow}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.gray
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            { !expenseAccount && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Transaction", {item: {
                      id: 5,
                      accountName: 'Expense'
                    }});
                  setIsModalVisible(false)
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}
              >
                <View style={{ flex: 0.2 }} >
                  <IoniconsIcon
                    size={35}
                    color={COLORS.red}
                    name="alert-circle-outline"
                  />
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={{ ...FONTS.body5, color: COLORS.red }} >Failed to load expense</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 0.4
                  }}
                >
                  <View style={{ flex: 0.8, alignItems: 'flex-end', marginLeft: SIZES.radius }}>
                    <Text style={{ ...FONTS.h5, color: COLORS.red }} > --- </Text>
                  </View>
                  <View style={{ flex: 0.2 }} >
                    <Image
                      source={icons.right_arrow}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.gray
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end'
            }}
          >
            <TouchableOpacity
              onPress={() => toggleModal()}
            >
              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body5
                }}
              >
                close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
export default BalanceSheet;
