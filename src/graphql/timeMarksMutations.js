import { gql } from '@apollo/client';

export const NEW_TIME_MARK =  gql`
	mutation AddTimeMark($title: String!, $time: String!, $day: Int!, $month: Int!, $year: Int) {
		addTimeMark(title: $title, time: $time, day: $day, month: $month, year: $year) {
			_id
			title
			time
			tasksCount
			day
			month
			year
		}
	}
`;

export const UPDATE_TIME_MARK =  gql`
	mutation UpdateTimeMark($timeMarkId: ID!, $title: String!, $time: String!) {
		updateTimeMark(timeMarkId: $timeMarkId, title: $title, time: $time) {
			_id
			title
			time
		}
	}
`;