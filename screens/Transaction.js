import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS, FONTS, icons, SIZES} from "../constants";
import {TouchableOpacity} from "react-native-gesture-handler";

const Transaction = ({ navigation }) => {

    return (
        <SafeAreaView>
            {/* The Header */}
            <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row' }} >
                <View style={{ flex: 1, alignItems: 'flex-start' }} >
                    <TouchableOpacity
                      style={{
                          flexDirection: 'row',
                          alignItems: 'center'
                      }}
                      onPress={() => navigation.goBack()}
                    >
                        <Image
                          source={icons.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 25,
                              height: 25,
                              tintColor: COLORS.gray
                          }}
                        />
                        <Text style={{ marginLeft: SIZES.base, ...FONTS.h2 }}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View
                  style={{ flex: 1, alignItems: 'flex-end' }}
                >
                    <TouchableOpacity>
                        <Image
                          source={icons.star}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30
                          }}
                        />
                    </TouchableOpacity>
                </View>
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
