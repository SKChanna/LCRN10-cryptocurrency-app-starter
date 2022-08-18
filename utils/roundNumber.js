
export const thousandsSeperator = num => {
	num = num.toString();
	if (num.includes('.')) {
		num = num.split('.');
		num[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		num = num[0]+'.'+num[1];
	} else {
		num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return num;
}

const roundNumber = (num, digits = 2) => {
	if (parseFloat(num))
		return thousandsSeperator(parseFloat(parseFloat(num).toFixed(digits)));
	else
		return 0;
}

export default roundNumber;
