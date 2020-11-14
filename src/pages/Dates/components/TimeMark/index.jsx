import React, { useState, memo } from 'react';
import classNames from 'classnames';
import { useLazyQuery } from '@apollo/client';

import { getTasks } from '../../../../graphql/tasksQueries';
import { Button } from '../../../../components';
import { Task } from '../';

const TimeMark = ({ _id, title, tasksCount, time }) => {
	const [tasksVisible, setTasksVisible] = useState(false);

	const [loadTasks, { loading, data }] = useLazyQuery(
		getTasks(),
		{ variables: { timemarkId: _id } }
	);

	const loadTasksHandler = () => {
		// !tasksVisible && loadTasks()
		!data && loadTasks()
		setTasksVisible(!tasksVisible)
	}

	// console.log('tasks', data)

	return (
		<>
			<div 
				className={classNames('TimeMarks__item', {
					'TimeMarks__item--active': tasksVisible
					// 'TimeMarks__item--selected': tasksVisible
				})} 
				onClick={loadTasksHandler}>
				<span className="TimeMarks__item-title">
					{title}
					<span className="TimeMarks__item-tasksCount">({tasksCount})</span>
				</span>
				<span className="TimeMarks__item-time">{time}</span>
			</div>

			{ tasksVisible && 
				<div className="TimeMarks__item-tasks">
					<div className="TimeMark__tasks">
						{ data && data.tasks.length ?
							data.tasks.map(t => (
								<Task
									key={t._id}
									_id={t._id}
									title={t.title}
									completed={t.completed}
									timeMarkId={t.timeMark._id}
								/>
							))
							// // : <div className="Task__message">Список задач пуст</div>
							: null
						}
					</div>

					<Button
						text="Добавить задачу"
					/>
				</div>
			}
		</>
	)
}

export default memo(TimeMark);
