import { gql } from '@apollo/client';

export const getTasks = () => {
	return gql`
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
}
