import React from 'react';
import { useParams } from 'react-router-dom';

import { Calendar } from '../../components';

const today = new Date();

const Dates = () => {
	const { day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear() } = useParams();

	console.log(day, month, year)

	return (
		<main className="Page DatesPage">
			<Calendar 
				day={day}
				month={month}
				year={year}
			/>
		</main>
	)
}

export default Dates;
