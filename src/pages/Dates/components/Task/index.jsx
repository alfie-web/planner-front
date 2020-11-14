import React from 'react';

import { Checkbox } from '../../../../components';
import './Task.sass';

const Task = ({ _id, title, completed, timeMarkId }) => {
	return (
		<div className="Task">
			{/* <input type="checkbox"/> */}
			<Checkbox
				// label={title}
			/>
			<span className="Task__title">{title}</span>
		</div>
	)
}

export default Task;
