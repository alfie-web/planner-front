import React, { useState } from 'react';

const Input = ({ value, onBlur }) => {
	const [val, setVal] = useState(value);

	const onChange = (e) => {
		setVal(e.target.value)
	}

	return (
		<textarea className="Task__input" autoFocus type="text" value={val} onChange={onChange} onBlur={() => onBlur(val)} ></textarea>
	)
}

export default Input;
