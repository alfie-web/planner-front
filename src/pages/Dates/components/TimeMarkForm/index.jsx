import React, { useState, useEffect } from 'react';
import { Button, TimePicker } from '../../../../components';
import EditTextarea from '../EditTextarea';

const TimeMarkForm = ({ _id, title, time, onClick, deleteTM }) => {
	const [timeMarkData, setTimeMarkData] = useState({
		title: '',
		time: '',
	})

	useEffect(() => {
		setTimeMarkData({
			title, time
		})
	}, [title, time])

	const onClickHandler = () => {
		onClick(timeMarkData)
		setTimeMarkData({
			title: 'Временная метка',
			time: '00:00'
		})
	}

	const changeTimeMarkData = (prop, val) => {
		setTimeMarkData({
			...timeMarkData,
			[prop]: val
		})
	}

	return (
		<form className="Form">
			{ time && <TimePicker 
				onChange={(t) => changeTimeMarkData('time', t)}
				timeStr={time}
			/> }

			{ timeMarkData.title && <EditTextarea 
				title={timeMarkData.title}
				setVal={(val) => changeTimeMarkData('title', val)}
			/> }

		{/* <Test /> */}

			<div className="Form__bottom">
				<Button 
					text="Сохранить"
					variant="blue"
					onClick={() => onClickHandler(timeMarkData)}
					title="Редактировать"
				/>
				{ _id && <Button 
					text="Удалить"
					variant="gray"
					onClick={deleteTM}
					title="Удалить"
				/> }
			</div>
		</form>
	)
}

export default TimeMarkForm;
