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
    LogBox
} from 'react-native';
import  {dummyData, COLORS, SIZES, FONTS, icons, images} from "../constants";
import {transactionHistory} from "../constants/dummy";
import {color} from "react-native-reanimated";

const Home = ({ navigation }) => {

    const [trending, setTrending] = useState(dummyData.trendingCurrencies);
    const [transactionHistory, setTransactionHistory] = React.useState(dummyData.transactionHistory);

    useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{
            width: 150,
            paddingVertical: SIZES.padding - 5,
            paddingHorizontal: SIZES.padding - 5,
            marginLeft: index === 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
            marginBottom: SIZES.padding - 15,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            ...styles.shadow
        }}
        onPress={() => navigation.navigate("Transaction")}
      >
          {/* Currency */}
          <View style={{flexDirection: 'row'}}>
              <View>
                  <Image
                      source={item.image}
                      resizeMode="cover"
                      style={{
                          marginTop: 3,
                          width: 22,
                          height: 22
                      }}
                  />
              </View>
              <View style={{ marginLeft: SIZES.base }}>
                  <Text style={{ ...FONTS.h3 }}>{item.currency}</Text>
                  <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.code}</Text>
              </View>
          </View>

          {/* Value */}
          <View style={{ marginTop: SIZES.radius }}>
              <Text style={{ ...FONTS.h3 }}>${item.amount}</Text>
              <Text style={{ color: item.type == 'I' ? COLORS.green : COLORS.red, ...FONTS.h4 }}>${item.amount}</Text>
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
                              width: 35,
                              height: 35,
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}
                        >
                            <Image
                                source={icons.notification_white}
                                resizeMode="contain"
                                style={{
                                    flex: 1,
                                }}
                            />
                        </TouchableOpacity>
                        </View>

                        {/* Balance */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{color: COLORS.white, ...FONTS.h3}} > Your Portfolio Balance </Text>
                            <Text style={{marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1}} > $203,57.44 </Text>
                            <Text style={{color: COLORS.white, ...FONTS.body5}} > +20% Last 24 hours </Text>
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
                                data={trending}
                                renderItem={renderItem}
                                keyExtractor={item => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                            />

                        </View>
                    </ImageBackground>
                </View>

                <View
                  style={{
                    marginTop: SIZES.base * 8,
                    marginHorizontal: SIZES.padding - 10,
                    padding: SIZES.padding - 8,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                  }}
                >

                  <Text style={{...FONTS.h2 }}>Transaction History</Text>
                  <FlatList
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    scrollEnabled={false}
                    data={transactionHistory}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: SIZES.base
                        }}
                        onPress={() => console.log(item)}
                      >
                        <Image
                          source={icons.transaction}
                          style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                          }}
                        />
                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                          <Text style={{ ...FONTS.h4,  }} >{item.description}</Text>
                          <Text style={{ color: COLORS.gray, ...FONTS.body5 }} >{item.date}</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%'
                          }}
                        >
                          <Text style={{ color: item.type == 'B' ? COLORS.green : COLORS.black, ...FONTS.h4 }} >{item.amount} </Text>
                          <Image
                            source={icons.right_arrow}
                            style={{
                              width: 15,
                              height: 15,
                              tintColor: COLORS.gray
                            }}
                          />
                        </View>

                      </TouchableOpacity>
                    )}
                    showVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                      return (
                        <View style={{ width: "100%", height: 0.5, backgroundColor: COLORS.lightGray }} />
                      )
                    }}
                  />
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
