import React, { useCallback, memo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import { getMonthTimeMarks } from '../../graphql/timeMarksQuery';
import { YearSelect, Select, Button } from '../../components';

import { TimeMarks, DatesCalendar, DatesBg, EditTaskForm, EditTimeMarkForm } from './components';

import './Dates.sass';

// import bgImg from '../../assets/images/bg.jpeg';
// const bgImg = 'https://source.unsplash.com/1600x900/?nature,water';	// Можно вместо water вставить текущий месяц
// const bgImg = 'https://source.unsplash.com/1600x900/?nature';



const today = new Date();

const Dates = () => {
	const history = useHistory();
	let { day = today.getDate(), month = today.getMonth() + 1, year = today.getFullYear() } = useParams();

	const [editedTask, setEditedTask] = useState(null);
	const [editedTimeMark, setEditedTimeMark] = useState(null);

	// const { loading, error, data } = useQuery(
	// 	getMonthTimeMarks(), 
	// 	{ variables: { month: +month, year: +year } }
	// )

	console.log(day, month, year)
	console.log('DATES_RERENDER')

	// const onEdit = useCallback((title) => {
	// 	console.log(title)
	// }, [])

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

	const setPrevNextMonth = (way) => {
		year = +year
		month = +month

		if (month + way < 1) {
			month = 12;
			year -= 1; 
		} else if (month + way > 12) {
			month = 1;
			year += 1; 
		} else {
			month += way
		}

		history.push(`/${day}/${month}/${year}`)
	}

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error :(</p>;

	return (
		<main className="Page Dates">
			<div className="container">

				<aside className="Tasks">
					{/* <div className="Tasks__bg-wrap">
						<div samesite="None" className="Tasks__bg" style={{ background: `url(https://source.unsplash.com/1600x900/?nature,${ENG_MONTHS_TITLES[+month]}) center no-repeat`, backgroundSize: 'cover' }}></div>
					</div> */}
					<DatesBg 
						month={+month - 1}
					/>

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
									defaultValue={month}
									onSelect={onMonthSelect}
								/>
							}

							<YearSelect 
								year={+year}
								onSelect={onYearSelect}
							/>
						</span>

						<span>
							<button className="Calendar__btn" onClick={() => setPrevNextMonth(-1)}>
								<svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M11 3L3 11L11 19" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
								</svg>
							</button>
							<button className="Calendar__btn" onClick={() => setPrevNextMonth(1)}>
								<svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M3 3L11 11L3 19" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
								</svg>
							</button>
						</span>
					</div>

					<TimeMarks 
						day={day}
						month={month}
						year={year}

						setEditedTask={setEditedTask}
						setEditedTimeMark={setEditedTimeMark}
					/>

					<div className="Tasks__bottom">
						<Button 
							text="Добавить временную метку"
						/>
					</div>
				</aside>

				<DatesCalendar 
					day={+day}
					month={+month}
					year={+year}
					onDaySelect={onDaySelect}
				/>

				{ editedTask && <EditTaskForm 
					editedTask={editedTask}
					setEditedTask={setEditedTask}
				/> }

				{ editedTimeMark && <EditTimeMarkForm
					editedTimeMark={editedTimeMark}
					setEditedTimeMark={setEditedTimeMark}
				/> }

			</div>
		</main>
	)
}

export default memo(Dates);
