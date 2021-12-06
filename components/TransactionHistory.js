import {COLORS, FONTS, icons, SIZES} from "../constants";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import React, {useState} from "react";
import moment from "moment";
import Modal from "react-native-modal";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import ListItem from "./ListItem";

const TransactionHistory = ({ data, height }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedEntry, setSelectedEntry] = useState({});
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

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
						onPress={() => {
							setSelectedEntry(item);
							toggleModal();
						}}
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
			<Modal
				isVisible={isModalVisible}
				coverScreen={true}
				animationIn="fadeIn"
				animationOut="fadeOut"
				onModalHide={() => setSelectedEntry({})}
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
						{Object.entries(selectedEntry).map(([key, value]) => (
							value != 0 && value != '' ? <ListItem name={key} color={selectedEntry.debit == 0 ? COLORS.green : COLORS.red } value={value} /> : null
						))}
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
