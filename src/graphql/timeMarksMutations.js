import { gql } from '@apollo/client';

export const UPDATE_TIME_MARK =  gql`
	mutation UpdateTimeMark($timeMarkId: ID!, $title: String!, $time: String!) {
		updateTimeMark(timeMarkId: $timeMarkId, title: $title, time: $time) {
			_id
			title
			time
		}
	}
`;