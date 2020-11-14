import React from 'react';
import { useQuery } from '@apollo/client';

import { getDayTimeMarks } from '../../../../graphql/timeMarksQuery';

import './TimeMarks.sass';

const TimeMarks = ({ day, month, year }) => {
	const { data } = useQuery(
		getDayTimeMarks(),
		{ variables: { day: +day, month: +month, year: +year } }
	)

	return (
		<div className="TimeMarks">
			{ data && <div className="TimeMarks__items">
				{ data.timeMarks.length ?
					data.timeMarks.map((timeMark, i) => (
						<div className="TimeMarks__item" key={i}>
							<span className="TimeMarks__item-title">{timeMark.title}</span>
							<span className="TimeMarks__item-time">{timeMark.time}</span>
						</div>
					))
					: <span className="Dates__message">Событий не запланировано</span>
				}
			</div> }
		</div>
	)
}

export default TimeMarks;
