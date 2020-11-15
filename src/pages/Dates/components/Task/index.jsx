import React from 'react';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';

import { completeTask } from '../../../../graphql/tasksMutations';
import { Checkbox } from '../../../../components';

import './Task.sass';

const Task = ({ _id, title, completed, timeMarkId }) => {

	const [completeHandler] = useMutation(completeTask);

	return (
		<div className={classNames('Task', {
			'Task--completed': completed
		})}
		onClick={() => completeHandler({ variables: { taskId: _id } })}
		>
			<Checkbox
				checked={completed}
			/>
			<span className="Task__title">{title}</span>

		</div>
	)
}

export default Task;


















// import React, { useState, useEffect } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import classNames from 'classnames';

// import { completeTask } from '../../../../graphql/tasksQueries';
// import { Checkbox } from '../../../../components';
// import Input from './Input';

// import './Task.sass';

// const Task = ({ _id, title, completed, timeMarkId }) => {
// 	const [checked, setChecked] = useState(completed);
// 	const [isEdit, setIsEdit] = useState(false);

// 	const [changeTask, { loading, data }] = useLazyQuery(
// 	// const [changeTask] = useLazyQuery(
// 		completeTask(),
// 		{ variables: { taskId: _id, completed: checked } }
// 	);

// 	// const completeTaskHandler = () => {
// 	// 	changeTask()
// 	// 	// setChecked(!checked)
// 	// }
	
// 	useEffect(() => {
// 		data && setChecked(data.completeTask.completed)
// 	}, [data])

// 	// const editHandler = (isEdit) => {
// 	// 	setIsEdit(isEdit)
// 	// }
// 	// console.log('complete task', data)

// 	return (
// 		<div className={classNames('Task', {
// 			'Task--completed': checked
// 		})}>
// 			<Checkbox
// 				// onChange={completeTaskHandler}
// 				onChange={changeTask}
// 				checked={checked}
// 			/>
// 			<span className="Task__title">{title}</span>
// 			{/* { isEdit 
// 				? <Input 
// 					value={title}
// 					onBlur={() => editHandler(false)}
// 				/>
// 				: <span className="Task__title" onDoubleClick={() => editHandler(true)}>{title}</span>
// 			} */}
// 		</div>
// 	)
// }

// export default Task;
