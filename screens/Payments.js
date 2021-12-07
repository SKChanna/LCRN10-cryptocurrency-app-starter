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
import {COLORS, defaults, FONTS, icons, SIZES} from "../constants";
import {useSelector, useDispatch} from "react-redux";
import * as accounts from '../store/accounts';
import {loadAllAccounts} from "../apiServices/apiController";
import {FlatList, TextInput} from "react-native-gesture-handler";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {acc} from "react-native-reanimated";
import SearchableDropdown from 'react-native-searchable-dropdown';
import {serviceAddGeneralEntry} from "../apiServices/apiServices";
import {Toast} from "react-native-toast-message/lib/src/Toast";

const InitialState = {
  values : {
    fromAccount: null,
    toAccount: null,
    amount: '',
    description: ''
  },
  errors: {
    fromAccount: null,
    toAccount: null,
    amount: null
  }
}

const Payments = ({ navigation }) => {

  const [values, setValues] = useState(InitialState.values);
  const [errors, setErrors] = useState(InitialState.errors);

  const [isLoading, setIsLoading] = useState(false);

  const validate = (data) => {
    const tempErrors = {...errors};
    for (const key in data) {
      if (key != 'description') {
        if (data[key] == null || data[key] == '') {
          tempErrors[key] = true
        } else {
          tempErrors[key] = false
        }
      }
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x == false)
  }

  const handleChange = (data) => {
    validate(data);
    setValues({...values, ...data});
  }

  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const loadData = async (value) => {
    const filter = {pageSize: 10, pageNo: 0, keyword: value};
    const response = await loadAllAccounts(null, filter, false);
    const list = response.map((a) => ({ account: a, name: `${a.accountName}` }))
    setData(list);
  }

  useEffect(() => {
    if (!data || data.length == 0 ) loadData('');
  }, [])

  const handleSubmit = async () => {
    if (validate(values)) {
      console.log('----- Submittting -----', values);
      const data = {
        creditAccount: values.fromAccount.account.id,
        value: values.amount,
        debitAccount: values.toAccount.account.id,
        transactionId: "--",
        description: "From "+values.fromAccount.account.id +" : "+values.fromAccount.account.accountName +" and To "+values.toAccount.account.id+" : "+values.toAccount.account.accountName+"  "+values.description,
        date: new Date()
      }
      setIsLoading(true);
      const response = await serviceAddGeneralEntry(data);
      if (response) {
        setValues(InitialState.values);
        setErrors(InitialState.errors);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Payment Done ✅',
          position: 'bottom',
          onPress: () => Toast.hide()
        });
      }
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
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
            Payments
          </Text>
        </View>

        <View style={{ padding: 10, marginTop: SIZES.padding * 2, backgroundColor: COLORS.white, borderRadius: SIZES.radius, ...styles.shadow }} >
          <View>
            <Text style={{ ...FONTS.body4 }} > From Account </Text>
            <SearchableDropdown
              onItemSelect={(item) => {
                handleChange({fromAccount: item})
              }}
              // containerStyle={{ padding: SIZES.padding }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: COLORS.black,
                borderColor: COLORS.lightGray,
                borderWidth: 1,
                borderRadius: SIZES.radius,
              }}
              itemTextStyle={{ color: COLORS.white }}
              itemsContainerStyle={{ maxHeight: 200 }}
              items={data}
              textInputProps={
                {
                  placeholder: values.fromAccount ? values.fromAccount.name : 'Search...',
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  onTextChange: loadData
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
            {errors.fromAccount ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                <Text style={{ ...FONTS.body5, color: COLORS.red }} > required * </Text>
              </View>
            ) : null}
          </View>
          <View style={{ marginTop: SIZES.padding - 10 }} >
            <Text style={{ ...FONTS.body4 }} > To Account </Text>
            <SearchableDropdown
              onItemSelect={(item) => {
                handleChange({toAccount: item})
              }}
              // containerStyle={{ padding: SIZES.padding }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: COLORS.black,
                borderColor: COLORS.lightGray,
                borderWidth: 1,
                borderRadius: SIZES.radius,
              }}
              itemTextStyle={{ color: COLORS.white }}
              itemsContainerStyle={{ maxHeight: 200 }}
              items={data}
              textInputProps={
                {
                  placeholder: values.toAccount ? values.toAccount.name : 'Search...',
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  onTextChange: loadData
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
            {errors.toAccount ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                <Text style={{ ...FONTS.body5, color: COLORS.red }} > required * </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={{ padding: 10, marginTop: SIZES.padding, backgroundColor: COLORS.white, borderRadius: SIZES.radius, ...styles.shadow }} >
          <View>
            <Text style={{ ...FONTS.body4 }} > Amount </Text>
            <TextInput
              style={{ ...styles.input }}
              placeholder="Amount here..."
              value={values.amount}
              onChangeText={(s) => handleChange({amount: s})}
              keyboardType="number-pad"
            />
            {errors.amount ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                <Text style={{ ...FONTS.body5, color: COLORS.red }} > required * </Text>
              </View>
            ) : null}
          </View>
          <View style={{ marginTop: SIZES.padding  }} >
            <Text style={{ ...FONTS.body4 }} > Description </Text>
            <TextInput
              style={{ ...styles.input }}
              placeholder="Description here..."
              value={values.description}
              multiline
              numberOfLines={5}
              onChangeText={(s) => handleChange({description: s})}
            />
          </View>
          <View style={{ marginTop: SIZES.padding * 2 }}>
            <Button
              icon="checkmark-done-circle-outline"
              mode="contained"
              onPress={handleSubmit}
              color={COLORS.primary}
              style={{
                borderRadius: SIZES.radius
              }}
              loading={isLoading}
            >
              DONE
            </Button>
          </View>
        </View>
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
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default Payments;

{/*/!* Multi *!/*/}
{/*<SearchableDropdown*/}
{/*  multi={true}*/}
{/*  selectedItems={selectedItems}*/}
{/*  onItemSelect={(item) => {*/}
{/*    const items = selectedItems;*/}
{/*    items.push(item)*/}
{/*    setSelectedItems(items);*/}
{/*  }}*/}
{/*  containerStyle={{ padding: 5 }}*/}
{/*  onRemoveItem={(item, index) => {*/}
{/*    const items = selectedItems.filter((sitem) => sitem.id !== item.id);*/}
{/*    setSelectedItems(items);*/}
{/*  }}*/}
{/*  itemStyle={{*/}
{/*    padding: 10,*/}
{/*    marginTop: 2,*/}
{/*    backgroundColor: '#ddd',*/}
{/*    borderColor: '#bbb',*/}
{/*    borderWidth: 1,*/}
{/*    borderRadius: 5,*/}
{/*  }}*/}
{/*  itemTextStyle={{ color: '#222' }}*/}
{/*  itemsContainerStyle={{ maxHeight: 140 }}*/}
{/*  items={items}*/}
{/*  defaultIndex={2}*/}
{/*  chip={true}*/}
{/*  resetValue={false}*/}
{/*  textInputProps={*/}
{/*    {*/}
{/*      placeholder: "placeholder",*/}
{/*      underlineColorAndroid: "transparent",*/}
{/*      style: {*/}
{/*        padding: 12,*/}
{/*        borderWidth: 1,*/}
{/*        borderColor: '#ccc',*/}
{/*        borderRadius: 5,*/}
{/*      },*/}
{/*      onTextChange: text => alert(text)*/}
{/*    }*/}
{/*  }*/}
{/*  listProps={*/}
{/*    {*/}
{/*      nestedScrollEnabled: true,*/}
{/*    }*/}
{/*  }*/}
{/*/>*/}
