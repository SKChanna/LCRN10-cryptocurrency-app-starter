const roundNumber = (num, digits = 2) => {
	if (parseFloat(num))
		return parseFloat(parseFloat(num).toFixed(digits));
	else
		return 0;
}

export default roundNumber;
