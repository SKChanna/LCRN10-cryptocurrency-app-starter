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
import IoniconsIcon from "react-native-vector-icons/Ionicons";

const Transaction = ({ navigation }) => {

    return (
        <SafeAreaView>
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
                        <IoniconsIcon name="chevron-back" size={20} color={COLORS.gray} />
                        <Text style={{ marginLeft: SIZES.base - 8, ...FONTS.h3 }}>Back</Text>
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
                      <IoniconsIcon name="cloud-download" size={25} color={COLORS.gray} />
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
