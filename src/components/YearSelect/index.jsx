import React, { useState, useEffect } from 'react';

import { Select } from '../';

const YearSelect = ({ year, onSelect }) => {
	const [state, setState] = useState([])

	useEffect(() => {
		const res = year + 10
		let arr = new Array(20).fill(0).map((_, i) => ({value: res - i, title: res - i}))

		setState(arr)
	}, [year])

	return year && state.length && (
		<Select 
			optionsData={state}
			defaultValue={year}
			onSelect={onSelect}
		/>
	)
}

export default YearSelect;
