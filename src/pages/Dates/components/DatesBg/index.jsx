import React from 'react';

const ENG_MONTHS_TITLES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DatesBg = ({ month }) => {
	return (
		<div className="Tasks__bg-wrap">
			{/* <div className="Tasks__bg" style={{ background: `url(${bgImg}) center no-repeat`, backgroundSize: 'cover' }}></div> */}
			{/* <div className="Tasks__bg" style={{ background: `url(https://source.unsplash.com/1600x900/?nature,${ENG_MONTHS_TITLES[month]}) center no-repeat`, backgroundSize: 'cover' }}></div> */}
		
			<img 
				className="Tasks__bg"
				src={`https://source.unsplash.com/1600x900/?nature,${ENG_MONTHS_TITLES[month]}`} 
				alt="Month img"
			/>
		</div>
	)
}

export default DatesBg;
