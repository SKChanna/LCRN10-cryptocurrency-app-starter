import {Text, View} from "react-native";
import {COLORS, FONTS, SIZES} from "../constants";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import React from "react";
import moment from "moment";

const ListItem = ({name, value, color}) => {
	return (
		<>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingVertical: SIZES.base
				}}
			>
				<IoniconsIcon name="caret-forward-circle" size={20} color={color} />
				<View style={{ flex: 1, marginLeft: SIZES.radius }}>
					<Text style={{ ...FONTS.body3,  }} >{name}</Text>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: 'flex-end',
					}}
				>
					<Text style={{ color: COLORS.black, ...FONTS.body4 }} >{
						name == 'date' ? moment(value).format('MMMM Do YYYY') : value
					}</Text>
				</View>

			</View>
			<View style={{ width: "100%", height: 0.5, backgroundColor: COLORS.lightGray }} />
		</>
	);
}

export default ListItem;
