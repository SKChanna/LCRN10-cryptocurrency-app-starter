import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, Dimensions, ImageBackground, FlatList,
  Button
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, FONTS, icons, images, SIZES} from "../constants";
import {TouchableOpacity} from "react-native-gesture-handler";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import * as dashboardStore from "../store/dashboard";
import {generateGeneralLedger} from "../apiServices/apiController";
import TransactionHistory from "../components/TransactionHistory";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {roundNumber} from "../utils";
import {AccountAvatar} from "../constants/images";

const Transaction = ({ route, navigation }) => {
  const [account, setAccount] = useState({});
  const [ledger, setLedger] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);

  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDatePickerChange = (date) => {
    console.log('changed date', date);
    setStartDate(date);
    setIsStartDatePickerVisible(false);
    getLedgerData(account, date, endDate);
  };
  const handleEndDatePickerChange = (date) => {
    setEndDate(date);
    setIsEndDatePickerVisible(false);
    getLedgerData(account, startDate, date);
  };

  const getLedgerData = async (account, start,  end) => {
    console.log("Calling Ledger data ", account);
    const ledgerData = await generateGeneralLedger({id: account.id, accountType: account.accountNature, start, end});
    setLedger(ledgerData.ledger);
    setOpeningBalance(ledgerData.openingBalance);
    setCurrentBalance(ledgerData.currentBalance);
  }

  useEffect(() => {
    const {item} = route.params;
    setAccount(item);
    if (item != null && item.id) {
      getLedgerData(item, startDate, endDate);
    }
  }, []);

  return (
    <SafeAreaView>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDatePickerChange}
        onCancel={() => setIsStartDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDatePickerChange}
        onCancel={() => setIsEndDatePickerVisible(false)}
      />
      <View
        style={{
          width: '100%',
          height: 200,
          ...styles.shadow
        }}
      >
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          {/* The Header */}
          <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', paddingVertical: SIZES.padding - 10 }} >
            <View style={{ flex: 1, alignItems: 'flex-start' }} >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => navigation.goBack()}
              >
                <IoniconsIcon name="chevron-back" size={20} color={COLORS.white} />
                <Text style={{ marginLeft: SIZES.base - 8, ...FONTS.h3, color: COLORS.white }}>Back</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flex: 1, alignItems: 'flex-end' }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onPress={() => alert("coming soon")}
              >
                <IoniconsIcon name="cloud-download" size={25} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Balance */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              marginBottom: 30
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/*<IoniconsIcon name="ios-person-circle" size={50} color={COLORS.white} />*/}
              <AccountAvatar
                id={account.id}
                size={50}
                color={COLORS.white}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{color: COLORS.white, ...FONTS.h3}} >{account.accountName}</Text>
              { account.contactNumber ? <Text style={{color: COLORS.white, ...FONTS.body4}} >{account.contactNumber}</Text> : null }
              { account.parentAccountName ? <Text style={{color: COLORS.white, ...FONTS.body4}} >{account.parentAccountName}</Text> : null }
            </View>

          </View>

          <View
            style={{
              position: 'absolute',
              bottom: -30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              height: 50,
              borderRadius: SIZES.radius,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              shadowColor: COLORS.gray,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.30,
              shadowRadius: 4.65,

              elevation: 8,
            }}
          >
            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  ...FONTS.h4
                }}
              >
                {roundNumber(openingBalance)}
              </Text>
              <Text
                style={{
                  ...FONTS.body5
                }}
              >
                Opening Balance
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: 1,
                height: '100%'
              }}
            />
            <View
              style={{
                flex: 0.6,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  ...FONTS.h4
                }}
              >
                {roundNumber(currentBalance + openingBalance)}
              </Text>
              <Text
                style={{
                  ...FONTS.body5
                }}
              >
                Balance
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          marginTop: SIZES.padding * 2,
          marginHorizontal: SIZES.padding - 10,
          padding: SIZES.padding - 8,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flex: 0.5,
              alignItems: 'flex-start'
            }}
          >
            <TouchableOpacity
              onPress={() => setIsStartDatePickerVisible(true)}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black
                }}
              >
                {moment(startDate).format('MMM Do YY')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.06,
              alignItems: 'center'
            }}
          >
            <IoniconsIcon name='caret-forward' size={10} color={COLORS.black} />
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: 'flex-end'
            }}
          >
            <TouchableOpacity
              onPress={() => setIsEndDatePickerVisible(true)}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black
                }}
              >
                {moment(endDate).format('MMM Do YY')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TransactionHistory data={ledger} height={Dimensions.get('window').height - 400} />
      </View>
    </SafeAreaView>
  )
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
  }
})

export default Transaction;
