import React, { useState } from 'react';

const Input = ({ value, onBlur }) => {
	const [val, setVal] = useState(value);

	const onChange = (val) => {
		setVal(val)
	}

	return (
		<input type="text" value={val} onChange={onChange} onBlur={onBlur} />
	)
}

export default Input;
