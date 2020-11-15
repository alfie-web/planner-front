import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import classNames from 'classnames';

import { Checkbox } from '../../../../components';
import { completeTask } from '../../../../graphql/tasksQueries';
import './Task.sass';

const Task = ({ _id, title, completed, timeMarkId }) => {
	const [checked, setChecked] = useState(completed);

	const [changeTask, { loading, data }] = useLazyQuery(
		completeTask(),
		{ variables: { taskId: _id, completed: !checked } }
	);

	const completeTaskHandler = () => {
		changeTask()
		setChecked(!checked)
	}
	
	// console.log('complete task', data)

	return (
		<div className={classNames('Task', {
			'Task--completed': checked
		})}>
			{/* <input type="checkbox"/> */}
			<Checkbox
				onChange={completeTaskHandler}
				checked={checked}
			/>
			<span className="Task__title">{title}</span>
		</div>
	)
}

export default Task;
