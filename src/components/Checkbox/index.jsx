import React from 'react';
import classNames from 'classnames';

import './Checkbox.sass';

const Checkbox = ({ className, label, checked, onChange }) => {
	return (
		<div className={classNames('Checkbox', className)}>
			<label className="Checkbox__label">
				<div className={classNames('Checkbox__checkbox', {
					'Checkbox__checkbox--checked': checked
				})}>
					<input type="checkbox" value={checked} onChange={onChange}></input>
					<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22 2L8 18L2 12" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
					</svg>

				</div>
				{label}
			</label>
		</div>
	)
}

export default Checkbox;
