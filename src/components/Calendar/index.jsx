import React, { useRef, useState, useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import './Calendar.sass';

// TODO: 
	// Отображать текущую дату
	// Выделять выбранную дату
	// Стилизовать

	// Отдельно от календаря создать селекты выбора месяца и года (так как будет глобальный стейт)


const Calendar = ({ day, month, year, onDaySelect }) => {
	const DAYS_IN_MONTH = useRef([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
	const DAYS_IN_WEEK = useRef(7);
	// const MONTH_TITLES = useRef(['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']);
	const DAY_TITLES = useRef(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']);

	const [selectedDate, setSelectedDate] = useState();

	const history = useHistory();

	console.log('RENDER')

	useEffect(() => {
		setSelectedDate({
			day, month: month - 1, year
		})
	}, [day, month, year])

	const onSelectDate = (e) => {		// Паттерн - делегирование событий
		const target = e.target.closest('td.day');
		if (!target) return;

		const { day, month, year } = target.dataset;
		console.log({ day, month, year })
		onDaySelect(day)
		// делаем запрос на сервак, меняем глобальный стейт (или не тут)
	}



	const isLeapYear = (year) => !((year % 4) || (!(year % 100) && (year % 400)));

	const getDaysOfMonthNumber = (year, month) => {
		const isLeap = isLeapYear(year);
			if (isLeap && month === 1) {       // Если февраль
			return DAYS_IN_MONTH.current[month] + 1
		} 
		return DAYS_IN_MONTH.current[month];
	}

	const getFirstDayOfMonth = (year, month) => {                                    
		const day = new Date(year, month).getDay();       // По умолчанию если 3-й параметр не указан вернёт день недели 1-го числа
		if (day === 0) return 6;            // Особенности того что в америке первый день недели воскресенье
		return day - 1;
	}

	const isToday = (day, month, year) => {
		const curDate = new Date()

		return curDate.getDate() === day && curDate.getMonth() === month && curDate.getFullYear() === year
	}

	const getMonthInfo = () => {
		const daysOfMonth = getDaysOfMonthNumber(selectedDate.year, selectedDate.month);
		const firstDayInFirstWeek = getFirstDayOfMonth(selectedDate.year, selectedDate.month); // а можно просто переназначить все числа в getFirstDayOfMonth

		let rows = [];
		let day = 1;

		for(let i = 0; i < (daysOfMonth + firstDayInFirstWeek) / DAYS_IN_WEEK.current; i++) {
			rows[i] = [];

			for(let j = 0; j < DAYS_IN_WEEK.current; j++) {
				if ((i === 0 && j < firstDayInFirstWeek) || day > daysOfMonth) {
					rows[i][j] = null;
				} else {
					rows[i][j] = {
						year: selectedDate.year,
						month: selectedDate.month,
						day,
						// isToday: this.isToday(day)
					};
					day++;
				}
			}
		}

		return rows;
	}


	const setPrevNextMonth = (way) => {
		let month = selectedDate.month;
		let year = selectedDate.year;

		if (month + way < 0) {
			month = 11;
			year -= 1; 
		} else if (month + way > 11) {
			month = 0;
			year += 1; 
		} else {
			month += way;
		}

		history.push(`/${selectedDate.day}/${month + 1}/${year}`)

		// В нём  теперь нет надобности, так как при смене url, useHistory перерисует компоненту с новым стейтом
		// setSelectedDate({
		// 	day: selectedDate.day,
		// 	month: month,
		// 	year: year
		// });
	}
	    
	return (
		<div className="Calendar">
			{/* <button onClick={() => setPrevNextMonth(-1)}>{'<'}</button>
			<button onClick={() => setPrevNextMonth(1)}>{'>'}</button> */}

			{ 
				selectedDate && 
				<>
					{/* <span>{MONTH_TITLES.current[+selectedDate.month]}</span>
					<span>{selectedDate.year}</span> */}

					<table className="Calendar__view" onClick={onSelectDate}>
						<thead>
							<tr>
								{ DAY_TITLES.current.map((t, i) => (
									<th key={i}>{t}</th>
								)) }
							</tr>
						</thead>
						<tbody>
							{ 
								getMonthInfo().map((row, i) => (
									<tr key={i}>
										{
											row.map((date, j) => date ? (
												<td 
													key={j} 
													data-day={date.day} 
													data-month={date.month + 1} 
													data-year={date.year}
													className={classNames('day', {
														'today': isToday(date.day, date.month, date.year),
														'selected': date.day === day
													})}
												>
													<span className="dayNumber">{date.day}</span>
													{isToday(date.day, date.month, date.year) && 
														<span className="taskCount">2</span>
													}
												</td>
											)
											: <td key={j}></td>)
										}
									</tr>
								))
							}
						</tbody>
					</table>
				</>
			}
		</div>
	)
}

export default memo(Calendar);
