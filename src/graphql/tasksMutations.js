import { gql } from '@apollo/client';

export const completeTask =  gql`
	mutation CompleteTask($taskId: ID!) {
		completeTask(taskId: $taskId) {
			_id
			completed
		}
	}
`;

export const updateTask =  gql`
	mutation UpdateTask($taskId: ID!, $title: String!) {
		updateTask(taskId: $taskId, title: $title) {
			_id
			title
		}
	}
`;