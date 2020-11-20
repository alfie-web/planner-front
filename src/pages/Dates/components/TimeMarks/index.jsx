import React from 'react';
import { useQuery } from '@apollo/client';

import { getDayTimeMarks } from '../../../../graphql/timeMarksQuery';
import { TimeMark } from '../';

import './TimeMarks.sass';

const TimeMarks = ({ day, month, year, setEditedTask, setEditedTimeMark }) => {
	const { data } = useQuery(
		getDayTimeMarks(),
		{ variables: { day: +day, month: +month, year: +year } }
	)

	return (
		<div className="TimeMarks">
			{ data && <div className="TimeMarks__items">
				{ data.timeMarks.length ?
					data.timeMarks.map((timeMark, i) => (
						<TimeMark 
							key={timeMark._id}
							_id={timeMark._id}
							title={timeMark.title}
							tasksCount={timeMark.tasksCount}
							time={timeMark.time}
							setEditedTask={setEditedTask}
							setEditedTimeMark={setEditedTimeMark}
						/>
					))
					: <span className="Dates__message">Событий не запланировано</span>
				}
			</div> }
		</div>
	)
}

export default TimeMarks;
