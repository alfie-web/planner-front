import { gql } from '@apollo/client';

export const GET_TASKS = gql`
	query Tasks($timemarkId: ID!) {
		tasks(timemarkId: $timemarkId) {
			_id
			title
			completed
			timeMark {
				_id
			}
		}
	}
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