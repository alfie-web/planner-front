import React from 'react';
import { useMutation, gql } from '@apollo/client';

import { NEW_TIME_MARK } from '../../../../graphql/timeMarksMutations';
import TimeMarkForm from '../TimeMarkForm';

const AddTimeMarkForm = ({ setAddTimeMarkVisible, day, month, year }) => {
	const [newTimeMarkHandler] = useMutation(NEW_TIME_MARK);
	

	const add = ({ time, title }) => {
		time && title && newTimeMarkHandler({
			variables: { day, month, year, time, title },
			update: (cache, { data: { addTimeMark } }) => {
				cache.modify({
					fields: {
						// Увеличиваю каунтер на календаре (логика похожа на reducer в redux)
						monthTimeMarks(existingMonthTimeMarks = []) {
							console.log('existingMonthTimeMarks', existingMonthTimeMarks)

							return existingMonthTimeMarks.map(tm => {
								if (tm.day === day) {
									return {
										...tm.day,
										count: tm.day + 1
									}
								}
								return tm.day
							})
						},
						// Добавляю новый итем в список
						timeMarks(existingTasks = []) {
							const newTimeMarkRef = cache.writeFragment({
								data: addTimeMark,
								fragment: gql`
									fragment NewTimeMark on TimeMark {
										_id
										title
										time
										day
										month
										year
										tasksCount
									}
								`
							});
							console.log('newTimeMarkRef', newTimeMarkRef)
							return [...existingTasks, newTimeMarkRef];
						}
					}
				});
			}
		})
			// .then(() => {

			// })
		console.log({ day, month, year, time, title })
	}

	

	return (
		<div className="EditForm TimeMarks__editForm">
			<div className="EditForm__cancel" onClick={() => setAddTimeMarkVisible(false)}></div>

			<TimeMarkForm 
				title={'Временная метка'}
				time={'00:00'}
				onClick={add}
			/>
		</div>
	)
}

export default AddTimeMarkForm
