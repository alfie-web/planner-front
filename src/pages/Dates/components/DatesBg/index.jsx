import React from 'react';

import fallbackBg from '../../../../assets/images/bg.jpeg';
const ENG_MONTHS_TITLES = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const DatesBg = ({ month }) => {
	return (
		<div className="Tasks__bg-wrap">
			{/* <div className="Tasks__bg" style={{ background: `url(${bgImg}) center no-repeat`, backgroundSize: 'cover' }}></div> */}
			{/* <div className="Tasks__bg" style={{ background: `url(https://source.unsplash.com/1600x900/?nature,${ENG_MONTHS_TITLES[month]}) center no-repeat`, backgroundSize: 'cover' }}></div> */}
		
			<img 
				className="Tasks__bg"
				// src={`https://source.unsplash.com/1600x900/?nature,${ENG_MONTHS_TITLES[month]}`} 
				src={`https://source.unsplash.com/1600x900/?${ENG_MONTHS_TITLES[month]}`} 
				alt="Month img"
				onError={(e) => e.target.src = fallbackBg}
			/>
		</div>
	)
}

export default DatesBg;
