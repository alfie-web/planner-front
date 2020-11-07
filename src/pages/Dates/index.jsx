import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Calendar, YearSelect, Select } from '../../components';

import './Dates.sass';

import bgImg from '../../assets/images/bg.jpeg';

const today = new Date();

const Dates = () => {
	const history = useHistory();
	const { day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear() } = useParams();

	console.log(day, month, year)
	console.log('DATES_RERENDER')

	const onDaySelect = useCallback((val) => {
		console.log(val)
		history.push(`/${val}/${month}/${year}`)
	}, [month, year, history])

	const onMonthSelect = useCallback((val) => {
		console.log(val)
		history.push(`/${day}/${val}/${year}`)
	}, [day, year, history])

	const onYearSelect = useCallback((val) => {
		console.log(val)
		history.push(`/${day}/${month}/${val}`)
	}, [day, month, history])

	return (
		<main className="Page Dates">
			<div className="container">

				<aside className="Tasks">
					<div className="Tasks__bg-wrap">
						<div className="Tasks__bg" style={{ background: `url(${bgImg}) center no-repeat`, backgroundSize: 'cover' }}></div>
					</div>

					<div className="Tasks__top">
						<span>
							{ month &&
								<Select 
									optionsData={[
										{title: 'Январь', value: '1'},
										{title: 'Февраль', value: '2'},
										{title: 'Март', value: '3'},
										{title: 'Апрель', value: '4'},
										{title: 'Май', value: '5'},
										{title: 'Июнь', value: '6'},
										{title: 'Июль', value: '7'},
										{title: 'Август', value: '8'},
										{title: 'Сентябрь', value: '9'},
										{title: 'Октябрь', value: '10'},
										{title: 'Ноябрь', value: '11'},
										{title: 'Декабрь', value: '12'},
									]}
									defaultValue={+month}
									onSelect={onMonthSelect}
								/>
							}

							<YearSelect 
								year={+year}
								onSelect={onYearSelect}
							/>
						</span>
					</div>
				</aside>

				<Calendar 
					day={+day}
					month={+month}
					year={+year}
					onDaySelect={onDaySelect}
				/>

			</div>
		</main>
	)
}

export default Dates;
