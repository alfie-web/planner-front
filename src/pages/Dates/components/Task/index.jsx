import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';

import { completeTask, updateTask } from '../../../../graphql/tasksMutations';
import { Checkbox } from '../../../../components';
import Input from './Input';

import './Task.sass';

const Task = ({ _id, title, completed, timeMarkId }) => {
	const [isEdit, setIsEdit] = useState(false);

	const [completeHandler] = useMutation(completeTask);
	const [updateHandler] = useMutation(updateTask);

	const update = (newTitle) => {
		console.log('newTitle', newTitle)
		updateHandler({ variables: { taskId: _id, title: newTitle } })
		setIsEdit(false)
	}

	return (
		<div className={classNames('Task', {
			'Task--completed': completed
		})}
		>
			<Checkbox
				onChange={() => completeHandler({ variables: { taskId: _id } })}
				checked={completed}
			/>
			{ isEdit
				? <Input 
					value={title}
					onBlur={update}
				/>
				: <span className="Task__title" onDoubleClick={() => setIsEdit(true)}>{title}</span>
			}
			

		</div>
	)
}

export default Task;
