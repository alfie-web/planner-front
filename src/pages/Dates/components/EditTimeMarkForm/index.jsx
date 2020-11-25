import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { TIME_MARK_BY_ID } from '../../../../graphql/timeMarksQuery';
import { UPDATE_TIME_MARK } from '../../../../graphql/timeMarksMutations';
import TimeMarkForm from '../TimeMarkForm';
// import { Button, TimePicker } from '../../../../components';

const EditTimeMarkForm = ({ editedTimeMark, setEditedTimeMark }) => {

	const { data, loading } = useQuery(TIME_MARK_BY_ID, {
		variables: { _id: editedTimeMark }
	})

	const [updateHandler] = useMutation(UPDATE_TIME_MARK);

	const update = (newData) => {
		console.log('newData', newData)
		updateHandler({ variables: { timeMarkId: editedTimeMark, title: newData.title, time: newData.time } })
			.then(_ => setEditedTimeMark(null))
	}

	return (
		<div className="EditForm TimeMarks__editForm">
			<div className="EditForm__cancel" onClick={() => setEditedTimeMark(null)}></div>

			{ data && <TimeMarkForm 
				title={data.timeMarkById.title}
				time={data.timeMarkById.time}
				onClick={update}
			/> }
		</div>
	)
}

export default EditTimeMarkForm;
