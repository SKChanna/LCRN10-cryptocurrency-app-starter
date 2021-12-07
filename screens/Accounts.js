import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity, Image
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, defaults, FONTS, icons, SIZES} from "../constants";
import {useSelector, useDispatch} from "react-redux";
import * as accounts from '../store/accounts';
import {loadAllAccounts} from "../apiServices/apiController";
import {FlatList, TextInput} from "react-native-gesture-handler";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {acc} from "react-native-reanimated";

const Accounts = ({ navigation }) => {
  const [filter, setFilter] = useState({
    keyword: '',
    pageNo: defaults.filter.pageNo,
    pageSize: defaults.filter.pageSize,
  });
  const data = useSelector(accounts.list);
  const loading = useSelector(accounts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || data.length == 0) {
      loadAllAccounts(dispatch, filter, false);
    } else {
      let pageNo = parseInt(data.length / defaults.filter.pageSize);
      if (data.length % defaults.filter.pageSize != 0) {
        pageNo += 1;
      }
      setFilter({...filter, pageNo});
    }
  }, []);

  const handleKeywordChange = (value) => {
    const tempFilter = {...filter, pageNo: 0, keyword: value};
    setFilter(tempFilter);
    loadAllAccounts(dispatch, tempFilter, false);
  };

  const handleNavigationToLedger = (data) => {
    dispatch(accounts.setSelected(data));
    props.navigation.navigate('Profile');
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 0,
          paddingHorizontal: SIZES.padding
        }}
      >
        <TextInput
          search
          placeholder="Search"
          value={filter.keyword}
          onChangeText={(s) => handleKeywordChange(s)}
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.white
        }}
      >
        <FlatList
          data={data}
          renderItem={(data) => {
            const account = data.item;
            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate("Transaction", {item: account})
              }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 10,
                  }}
                >
                  <View style={{ flex: 0.2 }} >
                    <IoniconsIcon name="ios-person-circle" size={50} color={COLORS.lightGray} />
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ ...FONTS.h4,  }} >{account.accountName}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body5 }} >{account.contactNumber}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.4
                    }}
                  >
                    <View style={{ flex: 0.8, marginLeft: SIZES.radius }}>
                      <Text style={{ ...FONTS.h4,  }} >{account.parentAccountName}</Text>
                      <Text style={{ color: COLORS.gray, ...FONTS.body5 }} >Parent Account</Text>
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
                </View>
              </TouchableOpacity>
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            const tempFilter = {...filter, pageNo: filter.pageNo + 1};
            setFilter(tempFilter);
            loadAllAccounts(dispatch, tempFilter, true);
          }}
          refreshing={loading}
          contentContainerStyle={{ marginTop: SIZES.radius }}
          scrollEnabled={true}
          keyExtractor={item => `${item.id}`}
          showVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View style={{ width: "100%", height: 0.5, backgroundColor: COLORS.lightGray }} />
            )
          }}
        />
      </View>
    </SafeAreaView>
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
  }
})

export default Accounts;
