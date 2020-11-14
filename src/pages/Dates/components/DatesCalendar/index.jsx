import React from 'react';
import { useQuery } from '@apollo/client';

import { getMonthTimeMarks } from '../../../../graphql/timeMarksQuery';
import { Calendar } from '../../../../components';

const DatesCalendar = ({ day, month, year, onDaySelect }) => {
	const { loading, error, data } = useQuery(
		getMonthTimeMarks(), 
		{ variables: { month: +month, year: +year } }
	)

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Calendar 
				day={+day}
				month={+month}
				year={+year}
				onDaySelect={onDaySelect}
				timeMarksCount={data.monthTimeMarks}
			/>
		</>
	)
}

export default DatesCalendar;
