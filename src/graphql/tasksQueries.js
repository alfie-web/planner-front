import { gql } from '@apollo/client';

// TODO: Одинаковую логику переписать во фрагменты
const taskFragment = gql`
	fragment TaskFragment on Task {
		_id
		title
		completed
		timeMark {
			_id
		}
	}
`

export const GET_TASKS = gql`
	query Tasks($timemarkId: ID!) {
		tasks(timemarkId: $timemarkId) {
			...TaskFragment
			# _id
			# title
			# completed
			# timeMark {
			# 	_id
			# }
		}
	}
	${taskFragment}
`;

export const GET_TASK_BY_ID = gql`
	query TaskById($_id: ID!) {
		taskById(_id: $_id)  {
			...TaskFragment
			# _id
			# title
			# completed
			# timeMark {
			# 	_id
			# }
		}
	}
	${taskFragment}
`;


// export const completeTask = () => {
// 	return gql`
// 		# query CompleteTask($taskId: ID!, $completed: Boolean!) {
// 			# completeTask(taskId: $taskId, completed: $completed) {
// 		query CompleteTask($taskId: ID!) {
// 			completeTask(taskId: $taskId) {
// 				_id
// 				completed
// 			}
// 		}
// 	`;
// }