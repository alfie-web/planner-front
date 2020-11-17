import React, { useState } from 'react';

import { Button } from '../../../../components';

const NewTaskInput = ({ newTaskHandler }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [newTaskText, setNewTaskText] = useState('');

	const newTask = () => {
		newTaskText && newTaskHandler(newTaskText)

		console.log(newTaskText)
		setIsVisible(false)
		setNewTaskText('')
	}

	return (
		<>
			{ !isVisible 
				? <Button
					onClick={() => setIsVisible(true)}
					text="Добавить задачу"
				/>
				: <input 
					type="text" 
					value={newTaskText} 
					placeholder="Введите текст"
					autoFocus
					onChange={e => setNewTaskText(e.target.value)} 
					onBlur={newTask} 
				 />
			}
		</>
	)
}

export default NewTaskInput;
