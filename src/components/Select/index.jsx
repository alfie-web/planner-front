import React, { useState, useRef, useEffect, memo } from 'react';
import classNames from 'classnames';

// import { useOutsideClick } from '../../hooks';
import './Select.sass';

export default memo(function Select({ className, optionsData, onSelect = () => {}, defaultValue, name = '' }) {
	const [value, setValue] = useState(optionsData[0].value || '');
	const [isDropped, setIsDropped] = useState(false);
	const selectRef = useRef();

	// console.log('MONTH_SELECT_RENDER')

	useEffect(() => {
		if (defaultValue) setValue(defaultValue)
	}, [defaultValue])
	
	// useOutsideClick(selectRef, () => setIsDropped(false), '.Select__dropdown');

	const handleSelect = (val) => {
		setValue(val);
		setIsDropped(false);
		onSelect(val, name)
	}

	// console.log(optionsData.find(o => o.value === value))

	return (
		<div className={classNames('Select', className)}>

			<div 
				ref={selectRef} 
				className={classNames('Select__current', {
					'Select__current--active': isDropped
				})} 
				onClick={() => setIsDropped(!isDropped)}
			>
				{/* <div className="Select__current-icon">
					<svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.292893 0.314524C-0.0976311 0.705048 -0.0976311 1.33821 0.292893 1.72874L3.96987 5.40572C4.36039 5.79624 4.99356 5.79624 5.38408 5.40572C5.77461 5.01519 5.77461 4.38203 5.38408 3.9915L1.70711 0.314525C1.31658 -0.0759997 0.683418 -0.0760002 0.292893 0.314524Z"/>
						<path d="M9.22101 0.292894C8.83049 -0.0976307 8.19732 -0.0976307 7.8068 0.292894L4.05424 4.04545C3.66372 4.43597 3.66372 5.06914 4.05424 5.45966C4.44477 5.85019 5.07793 5.85019 5.46846 5.45966L9.22101 1.70711C9.61154 1.31658 9.61154 0.683418 9.22101 0.292894Z"/>
					</svg>
				</div> */}
				
					<span>{optionsData.find(o => String(o.value) === String(value)).title}</span>
				
			</div>

			{
				isDropped &&
					<div className="Select__dropdown">
						{
							optionsData.map((option) => (
								<div key={option.value}
									className={classNames('Select__option', {
										'Select__option--selected': value === option.value,
										'Select__option--disabled': option.disabled,
									})}
									onClick={() => handleSelect(option.value)}
								>
									{option.title}
								</div>
							))
						}
					</div>
			}
			
		</div>
	)
})
