import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { TIME_MARK_BY_ID } from '../../../../graphql/timeMarksQuery';
import { UPDATE_TIME_MARK, DELETE_TIME_MARK } from '../../../../graphql/timeMarksMutations';
import TimeMarkForm from '../TimeMarkForm';
// import { Button, TimePicker } from '../../../../components';

const EditTimeMarkForm = ({ editedTimeMark, setEditedTimeMark }) => {

	const { data, loading } = useQuery(TIME_MARK_BY_ID, {
		variables: { _id: editedTimeMark }
	})

	const [updateHandler] = useMutation(UPDATE_TIME_MARK);
	const [deleteHandler] = useMutation(DELETE_TIME_MARK);

	const update = (newData) => {
		console.log('newData', newData)
		updateHandler({ variables: { timeMarkId: editedTimeMark, title: newData.title, time: newData.time } })
			.then(_ => setEditedTimeMark(null))
	}

	const deleteTM = () => {
		deleteHandler({
			variables: { timeMarkId: data.timeMarkById._id },
			update: (cache, { data: { deleteTimeMark } }) => {
				// console.log('deleteTask', deleteTimeMark)
				cache.modify({
					fields: {
						monthTimeMarks(existingMonthTimeMarks = []) {
							console.log('existingMonthTimeMarks', existingMonthTimeMarks)

							return existingMonthTimeMarks.map(tm => {
								if (tm.day === deleteTimeMark.day) {
									return {
										...tm.day,
										count: tm.day - 1
									}
								}
								return tm.day
							})
						},
						timeMarks(existingTimeMarks = [], { readField }) {
							// console.log(existingTasks)
							return existingTimeMarks.filter(t => readField('_id', t) !== deleteTimeMark._id)
						}
					}
				}) 
			}
		}).then(_ => setEditedTimeMark(null))
	}

	return (
		<div className="EditForm TimeMarks__editForm">
			<div className="EditForm__cancel" onClick={() => setEditedTimeMark(null)}></div>

			{ data && <TimeMarkForm 
				_id={data.timeMarkById._id}
				title={data.timeMarkById.title}
				time={data.timeMarkById.time}
				onClick={update}
				deleteTM={deleteTM}
			/> }
		</div>
	)
}

export default EditTimeMarkForm;
