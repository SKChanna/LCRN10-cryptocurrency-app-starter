import {COLORS, FONTS, icons, SIZES} from "../constants";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import moment from "moment";

const TransactionHistory = ({ data, height }) => {
	return (
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

			<Text style={{...FONTS.h2 }}>Transaction History</Text>
			<FlatList
				contentContainerStyle={{ marginTop: SIZES.radius }}
				scrollEnabled={true}
				style={{
					height
				}}
				data={data}
				keyExtractor={item => `${item.invoiceNumber} ${item.description}`}
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
								tintColor: item.debit == 0 ? COLORS.green : COLORS.red
							}}
						/>
						<View style={{ flex: 1, marginLeft: SIZES.radius }}>
							<Text style={{ ...FONTS.h4,  }} >{item.description}</Text>
							<Text style={{ color: COLORS.gray, ...FONTS.body5 }} >{moment(item.date).format('MMMM Do YYYY')}</Text>
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								height: '100%'
							}}
						>
							<Text style={{ color: COLORS.black, ...FONTS.h4 }} >{item.debit || item.credit} </Text>
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
	);
}

const styles = StyleSheet.create({
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

export default TransactionHistory;
