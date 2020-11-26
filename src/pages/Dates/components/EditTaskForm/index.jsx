import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client'; 

import { Button } from '../../../../components';
import EditTextarea from '../EditTextarea';
// import Test from './Test';

import { GET_TASK_BY_ID } from '../../../../graphql/tasksQueries';
import { updateTask, DELETE_TASK } from '../../../../graphql/tasksMutations';

import './EditForm.sass';

const EditTaskForm = ({ editedTask, setEditedTask }) => {
	const [val, setVal] = useState('')

	const { data, loading } = useQuery(GET_TASK_BY_ID, {
		variables: { _id: editedTask },
		onCompleted: (data) => setVal(data.taskById.title)
	})

	const [updateHandler] = useMutation(updateTask);
	const [deleteHandler] = useMutation(DELETE_TASK);

	const update = () => {
		updateHandler({ variables: { taskId: editedTask, title: val } })
			.then(_ => setEditedTask(null))
	}

	// const delete = () => {}

	console.log('GET_TASK_BY_ID', data)

	return (
		<div className="EditForm">
			<div className="EditForm__cancel" onClick={() => setEditedTask(null)}></div>

			<form className="Form">
			{ data && <EditTextarea 
				title={val} 
				setVal={setVal}
			/> }

			{/* <Test /> */}

				<div className="Form__bottom">
					<Button 
						text="Сохранить"
						variant="blue"
						onClick={update}
					/>
					<Button 
						text="Удалить"
						variant="gray"
						onClick={() => deleteHandler({
							variables: { taskId: data.taskById._id, timeMarkId: data.taskById.timeMark._id },
							update: (cache, { data: { deleteTask } }) => {
								console.log('deleteTask', deleteTask)
								cache.modify({
									fields: {
										// TODO: Менять tasksCount
										tasks(existingTasks = [], { readField }) {
											console.log(existingTasks)
											return existingTasks.filter(t => readField('_id', t) !== deleteTask._id)
										}
									}
								}) 
							},
							
						}).then(_ => setEditedTask(null))}
					/>
				</div>
			</form>
		</div>
	)
}

export default EditTaskForm;
