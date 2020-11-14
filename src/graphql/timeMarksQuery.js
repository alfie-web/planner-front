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
				title
				time
			}
		}
	`;
}

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