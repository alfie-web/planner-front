import React, { useState } from 'react';

import { Select } from '../';

import './TimePicker.sass';

const addZero = (num) => {
	return num >= 0 && num <= 9 
		? '0' + num
		: num
}

const toOptionFormat = (val) => {
	const format = String(addZero(1 + val))
	return {value: format, title: format}
}

const prepareOptions = (count) => {
	let arr = new Array(count).fill(0).map((_, i) => (toOptionFormat(i)))
	return [
		{title: '00', value: 0},
		...arr,
	]
}

const TimePicker = ({ onChange = () => {}, timeStr = '' }) => {
	const [time, setTime] = useState({
		hours: timeStr.split(':')[0],
		minutes: timeStr.split(':')[1],
	})

	const changeTime = (prop, val) => {
		setTime({
			...time,
			[prop]: val
		})
	}

	const onChangehandler = (prop, val) => {
		changeTime(prop, val)

		const resTimeStr = prop === 'hours' 
			? val + ':' + time.minutes
			: time.hours + ':' + val

		onChange(resTimeStr)
	}

	return (
		<div className="TimePicker">
			<Select 
				className="TimePicker__hour"
				optionsData={prepareOptions(23)}
				defaultValue={time.hours}
				onSelect={(val) => onChangehandler('hours', val)}
			/>
			<span className="TimePicker__delimiter">:</span>
			<Select 
				className="TimePicker__minutes"
				optionsData={prepareOptions(59)}
				defaultValue={time.minutes}
				onSelect={(val) => onChangehandler('minutes', val)}
			/>
		</div>
	)
}

export default TimePicker;
