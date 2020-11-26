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

export const addTask =  gql`
	mutation AddNewTask($title: String!, $timeMark: ID!) {
		addTask(title: $title, timeMark: $timeMark) {
			_id
			title
			completed
			timeMark {
				_id
			}
		}
	}
`;

export const DELETE_TASK =  gql`
	mutation DeleteTask($taskId: ID!, $timeMarkId: ID!) {
		deleteTask(taskId: $taskId, timeMarkId: $timeMarkId) {
			_id
		}
	}
`;

