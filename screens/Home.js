import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox,
    Dimensions
} from 'react-native';
import  {dummyData, COLORS, SIZES, FONTS, icons, images} from "../constants";
import {transactionHistory} from "../constants/dummy";
import {color} from "react-native-reanimated";
import TransactionHistory from "../components/TransactionHistory";
import moment from "moment";
import {generateGeneralLedger} from "../apiServices/apiController";
import {useDispatch, useSelector} from "react-redux";
import * as dashboardStore from '../store/dashboard';
import {serviceGetAccountHeads} from "../apiServices/apiServices";
import TextTicker from 'react-native-text-ticker'
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const [trending, setTrending] = useState(dummyData.trendingCurrencies);
  const cashLedger = useSelector(dashboardStore.cashLedger);
  const cashOpeningBalance = useSelector(dashboardStore.cashOpeningBalance);
  const cashCurrentBalance = useSelector(dashboardStore.cashBalance);
  const generalAccounts = useSelector(dashboardStore.generalAccounts);

  const getDashboardData = async () => {

    dispatch(dashboardStore.setLoading(true));
    const ledgerData = await generateGeneralLedger({id: 6, accountType: "DR", start: new Date('2021-09-01T00:00:00.000Z'), end: new Date()});
    dispatch(dashboardStore.setCashLedger(ledgerData));

    dispatch(dashboardStore.setLoading(true));
    const AccountHeads = await serviceGetAccountHeads();
    if (AccountHeads && AccountHeads.data)
      dispatch(dashboardStore.setGeneralAccounts(AccountHeads.data));

  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getDashboardData();
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{
          width: 150,
          paddingVertical: SIZES.padding - 20,
          paddingHorizontal: SIZES.padding - 20,
          marginLeft: index === 0 ? SIZES.padding : 0,
          marginRight: SIZES.radius,
          marginBottom: SIZES.padding - 15,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          ...styles.shadow
      }}
      onPress={() => navigation.navigate("Transaction", {item, index})}
    >
        {/* Currency */}
        <View style={{flexDirection: 'row'}}>
            <View>
                {/*<Image*/}
                {/*    source={item.image}*/}
                {/*    resizeMode="cover"*/}
                {/*    style={{*/}
                {/*        marginTop: 3,*/}
                {/*        width: 22,*/}
                {/*        height: 22*/}
                {/*    }}*/}
                {/*/>*/}
            </View>
            <View style={{ marginLeft: SIZES.base }}>
                <Text style={{ ...FONTS.h3 }}>{item.accountName}</Text>
              <TextTicker
                style={{ color: COLORS.gray, ...FONTS.body5 }}
                duration={10000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}
              >
                {item.accountDescription}
              </TextTicker>
            </View>
        </View>

        {/* Value */}
        <View style={{ marginTop: SIZES.radius }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1
            }}
          >
            <View
              style={{
                flex: 0.4,
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}
            >
              <Text style={{marginTop: SIZES.base, color: COLORS.green, ...FONTS.body5}} > Debit </Text>
            </View>
            <View
              style={{
                flex: 0.6,
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Text style={{marginTop: SIZES.base, color: COLORS.green, ...FONTS.h5}} > {item.debit} </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1
            }}
          >
            <View
              style={{
                flex: 0.4,
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}
            >
              <Text style={{color: COLORS.black, ...FONTS.body5}} > Credit </Text>
            </View>
            <View
              style={{
                flex: 0.6,
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <Text style={{color: COLORS.black, ...FONTS.h5}} > {item.credit} </Text>
            </View>
          </View>
        </View>
    </TouchableOpacity>
  );

  return (
      <ScrollView>
          <View style={{flex: 1}}>
            <View
              style={{
                  width: '100%',
                  height: 290,
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
                    {/* Header */}
                    <View
                        style={{
                            marginTop: SIZES.padding,
                            width: "100%",
                            alignItems: "flex-end",
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                    <TouchableOpacity
                      style={{
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}
                    >
                        {/*<Image*/}
                        {/*    source={icons.notification_white}*/}
                        {/*    resizeMode="contain"*/}
                        {/*    style={{*/}
                        {/*        flex: 1,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <IoniconsIcon name="exit" color={COLORS.white} size={35} />
                    </TouchableOpacity>
                    </View>

                    {/* Balance */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                      <Text style={{color: COLORS.white, ...FONTS.h3}} > You Have </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Text style={{marginTop: SIZES.base, color: COLORS.white, ...FONTS.h3}} > pkr </Text>
                        <Text style={{marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1}} > {cashCurrentBalance - cashOpeningBalance} </Text>
                      </View>
                      <Text style={{color: COLORS.white, ...FONTS.body5}} > {cashOpeningBalance} Opening Balance </Text>
                    </View>

                    {/* Trending Section */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: '-16%'
                        }}
                    >
                        <Text style={{ marginLeft: SIZES.padding, color: COLORS.white, ...FONTS.h3 }}>
                            Accounts
                        </Text>

                        <FlatList
                            contentContainerStyle={{ marginTop: SIZES.base}}
                            data={generalAccounts}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />

                    </View>
                </ImageBackground>
            </View>
            <View
              style={{
                marginTop: SIZES.base * 8,
                marginHorizontal: SIZES.padding - 10,
                marginBottom: SIZES.padding,
                padding: SIZES.padding - 8,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
              }}
            >

              <Text style={{...FONTS.h3 }}>Latest Transactions</Text>
              <TransactionHistory data={cashLedger} height={Dimensions.get('window').height - 510} />
            </View>
          </View>
      </ScrollView>
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

export default Home;
