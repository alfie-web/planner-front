import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { TIME_MARK_BY_ID } from '../../../../graphql/timeMarksQuery';
import { UPDATE_TIME_MARK } from '../../../../graphql/timeMarksMutations';
import EditTextarea from '../EditTextarea';
import { Button, TimePicker } from '../../../../components';

const EditTimeMarkForm = ({ editedTimeMark, setEditedTimeMark }) => {
	const [timeMarkData, setTimeMarkData] = useState({
		title: '',
		time: '',
	})

	const changeTimeMarkData = (prop, val) => {
		setTimeMarkData({
			...timeMarkData,
			[prop]: val
		})
	}

	const { data, loading } = useQuery(TIME_MARK_BY_ID, {
		variables: { _id: editedTimeMark },
		onCompleted: (data) => setTimeMarkData({
			title: data.timeMarkById.title,
			time: data.timeMarkById.time,
		})
	})

	const [updateHandler] = useMutation(UPDATE_TIME_MARK);

	const update = () => {
		updateHandler({ variables: { timeMarkId: editedTimeMark, title: timeMarkData.title, time: timeMarkData.time } })
			.then(_ => setEditedTimeMark(null))
	}

	return (
		<div className="EditForm TimeMarks__editForm">
			<div className="EditForm__cancel" onClick={() => setEditedTimeMark(null)}></div>

			<form className="Form">
			{ timeMarkData.time && <TimePicker 
				onChange={(time) => changeTimeMarkData('time', time)}
				timeStr={timeMarkData.time}
			/> }

			{ timeMarkData.title && <EditTextarea 
				title={timeMarkData.title} 
				// title={data.taskById.title} 
				// onChange={() => {}} 
				setVal={(val) => changeTimeMarkData('title', val)}
			/> }

			{/* <Test /> */}

				<div className="Form__bottom">
					<Button 
						text="Сохранить"
						variant="blue"
						onClick={update}
						title="Редактировать"
					/>
				</div>
			</form>
		</div>
	)
}

export default EditTimeMarkForm;
