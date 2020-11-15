import { gql } from '@apollo/client';

export const completeTask =  gql`
	mutation CompleteTask($taskId: ID!) {
		completeTask(taskId: $taskId) {
			_id
			completed
		}
	}
`;
