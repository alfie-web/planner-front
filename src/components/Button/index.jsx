// import React from 'react';
// import classNames from 'classnames';

// import './Button.sass';

// export default function Button({ text, type, disabled, icon, onClick, className, active }) {
// 	return (
// 		<button 
// 			className={classNames('Button', {
// 				'Button--active': active,
// 				'Button--icon': icon,
// 				'Button--disabled': disabled,
// 			}, className)}
// 			type={type}
// 			disabled={disabled}
// 			onClick={!disabled ? onClick : () => {}}
// 		>
// 			{
// 				icon ?
// 					<div className="Button__icon">
// 						{icon}
// 					</div>
// 				: text
// 			}
// 		</button>
// 	)
// }

import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import './Button.sass';

export default function Button({ 
	className, 
	text = '', 
	onClick = () => {}, 
	type = 'button',
	variant,
	icon,
	active = false,
	disabled,
	urlRedirect,	// если хотим использовать как ссылку
	title = ''
}) {
	const history = useHistory();

	return (
		<button 
			className={classNames('Button', {
				'Button--gray': variant && variant === 'gray',
				'Button--red': variant && variant === 'red',
				'Button--blue': variant && variant === 'blue',
				'Button--icon': icon,
				'Button--active': active,
				'Button--disabled': disabled,
			}, className)}
			onClick={
				// !disabled ? onClick : () => {}
				urlRedirect && !disabled ? () => history.push(urlRedirect)
				: !disabled ? onClick : () => {}
			}
			type={type}
			disabled={disabled}
			title={title}
		>
			{
				icon ?
					<div className="Button__icon">
						{icon}
					</div>
				: text
			}
		</button>
	)
}

