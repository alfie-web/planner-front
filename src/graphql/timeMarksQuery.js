import { gql } from '@apollo/client';

export const getMonthTimeMarks = () => {
	return gql`
		query MonthTimeMarks($month: Int!, $year: Int) {
			monthTimeMarks(month: $month, year: $year) {
				day
				count
			}
		}
	`;
}

export const getDayTimeMarks = () => {
	return gql`
		query timeMarks($day: Int!, $month: Int!, $year: Int) {
			timeMarks(day: $day, month: $month, year: $year) {
				_id
				title
				time
				tasksCount
			}
		}
	`;
}

export const TIME_MARK_BY_ID = gql`
	query timeMarkById($_id: ID) {
		timeMarkById(_id: $_id) {
			_id
			title
			tasksCount
			time
		}
	}
`;


// Можно сделать даже так
// export const getDates = () => {
// 	return gql`
// 		query getDates($day: Int!, $month: Int!, $year: Int) {
// 			monthTimeMarks(month: $month, year: $year) {
// 				day
// 				count
// 			}
// 			timeMarks(day: $day, month: $month, year: $year) {
// 				title
// 				time
// 			}
// 		}
// 	`;
// }