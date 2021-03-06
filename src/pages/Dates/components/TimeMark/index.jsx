import React, { useState, memo } from 'react';
import classNames from 'classnames';
import { useLazyQuery, useMutation, useApolloClient, gql } from '@apollo/client';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { TIME_MARK_BY_ID } from '../../../../graphql/timeMarksQuery';
import { GET_TASKS } from '../../../../graphql/tasksQueries';
import { addTask } from '../../../../graphql/tasksMutations';
import { Task, NewTaskInput } from '../';


const TimeMark = ({ _id, title, tasksCount, time, setEditedTask, setEditedTimeMark }) => {
	const [tasksVisible, setTasksVisible] = useState(false);

	const [newTask] = useMutation(addTask);

	const [loadTasks, { loading, data }] = useLazyQuery(
		GET_TASKS,
		{ variables: { timemarkId: _id } }
	);

	const loadTasksHandler = () => {
		// !tasksVisible && loadTasks()
		!data && loadTasks()
		setTasksVisible(!tasksVisible)
	}

	const newTaskHandler = (newTaskText) => {
		newTask({
			variables: { title: newTaskText, timeMark: _id },
			// options: {
			// TODO: Заюзать ещё refetchQueries  на получения обновлённой информации об временной метки
			// для того, чтобы увидеть обновлённое количество задач
			refetchQueries: [{
				query: TIME_MARK_BY_ID,
				variables: { _id }
			}],
				update: (cache, { data: { addTask } }) => {
					cache.modify({
						fields: {
							// 	// TODO: МОЖЕТ МОЖНО ОБОЙТИСЬ БЕЗ refetchQueries
							// timeMarks(exsistingTimeMarks = []) {
							// 	console.log('exsistingTimeMarks', exsistingTimeMarks)
							// 	return [...exsistingTimeMarks]
							// },
							tasks(existingTasks = []) {
								const newTaskRef = cache.writeFragment({
									data: addTask,
									fragment: gql`
										fragment NewTask on Task {
											_id
											title
											completed
											timeMark {
												_id
											}
										}
									`
								});
								console.log('newTaskRef', newTaskRef)
								return [...existingTasks, newTaskRef];
							}
						}
					});




					// console.log('client', client)
					// let tasksData = cache.readQuery({ 
					// 	query: GET_TASKS, 
					// 	variables: { timemarkId: _id } 
					// });
	
					// console.log('addTask', addTask)
					// console.log('tasksData', tasksData)

					// tasksData = {
					// 	...tasksData,
					// 	tasks: [...tasksData.tasks, addTask]
					// }

					// console.log(tasksData)

					// cache.writeQuery({
					// 	query: GET_TASKS,
					// 	data: tasksData
					// 	// data: {
					// 	// 	...tasksData,
					// 	// 	tasks: [...tasksData.tasks, data.addTask],
					// 	// 	// tasks: tasksData
					// 	// },
					// });

					// client.mutate({
					// 	mutation: localMutation,
					// 	variables: { result }
					// })
	
				}
			// }
		})
		// refetch()
	}

	return (
		<>
			<div 
				className={classNames('TimeMarks__item', {
					'TimeMarks__item--active': tasksVisible
					// 'TimeMarks__item--selected': tasksVisible
				})} 
				onClick={loadTasksHandler}
			>
				<span className="TimeMarks__item-title">
					{title}
					<span className="TimeMarks__item-tasksCount">({tasksCount})</span>
				</span>
				<span className="TimeMarks__item-time">{time}</span>
			</div>

			{ tasksVisible && 
				<div className="TimeMarks__item-tasks">
					<div className="TimeMark__tasks">
					<TransitionGroup>
						{ data && data.tasks.length ?
							data.tasks.map(t => (
								<CSSTransition
									key={t._id}
									timeout={500}
									classNames="Task"
								>
									<Task
										_id={t._id}
										title={t.title}
										completed={t.completed}
										timeMarkId={t.timeMark._id}
										setEditedTask={setEditedTask}
									/>
								</CSSTransition>
							))
							// // : <div className="Task__message">Список задач пуст</div>
							: null
						}
						</TransitionGroup>
					</div>

					{/* <Button
						text="Добавить задачу"
					/> */}
					<NewTaskInput 
						newTaskHandler={newTaskHandler}
						_id={_id}
						setEditedTimeMark={setEditedTimeMark}
					/>
				</div>
			}
		</>
	)
}

export default memo(TimeMark);

























// import React, { useState, memo } from 'react';
// import classNames from 'classnames';
// import { useLazyQuery, useMutation } from '@apollo/client';

// import { getTasks } from '../../../../graphql/tasksQueries';
// import { addTask } from '../../../../graphql/tasksMutations';
// import { Task, NewTaskInput } from '../';

// const TimeMark = ({ _id, title, tasksCount, time }) => {
// 	const [tasksVisible, setTasksVisible] = useState(false);

// 	const [newTask] = useMutation(addTask);

// 	const [loadTasks, { loading, data, refetch }] = useLazyQuery(
// 		getTasks(),
// 		{ variables: { timemarkId: _id } }
// 	);

// 	const loadTasksHandler = () => {
// 		// !tasksVisible && loadTasks()
// 		!data && loadTasks()
// 		setTasksVisible(!tasksVisible)
// 	}

// 	const newTaskHandler = (newTaskText) => {
// 		newTask({variables: { title: newTaskText, timeMark: _id }})
// 		refetch()
// 	}

// 	return (
// 		<>
// 			<div 
// 				className={classNames('TimeMarks__item', {
// 					'TimeMarks__item--active': tasksVisible
// 					// 'TimeMarks__item--selected': tasksVisible
// 				})} 
// 				onClick={loadTasksHandler}>
// 				<span className="TimeMarks__item-title">
// 					{title}
// 					<span className="TimeMarks__item-tasksCount">({tasksCount})</span>
// 				</span>
// 				<span className="TimeMarks__item-time">{time}</span>
// 			</div>

// 			{ tasksVisible && 
// 				<div className="TimeMarks__item-tasks">
// 					<div className="TimeMark__tasks">
// 						{ data && data.tasks.length ?
// 							data.tasks.map(t => (
// 								<Task
// 									key={t._id}
// 									_id={t._id}
// 									title={t.title}
// 									completed={t.completed}
// 									timeMarkId={t.timeMark._id}
// 								/>
// 							))
// 							// // : <div className="Task__message">Список задач пуст</div>
// 							: null
// 						}
// 					</div>

// 					{/* <Button
// 						text="Добавить задачу"
// 					/> */}
// 					<NewTaskInput 
// 						newTaskHandler={newTaskHandler}
// 					/>
// 				</div>
// 			}
// 		</>
// 	)
// }

// export default memo(TimeMark);
