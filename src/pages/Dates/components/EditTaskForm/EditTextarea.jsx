import React, { useState } from 'react';

const EditTextarea = ({ title = '', setVal }) => {
	// const [val, setVal] = useState(title);
	return (
		<textarea 
			className="EditForm__textarea"
			autoFocus 
			placeholder="Текст задачи" 
			value={title} 
			onChange={({target}) => setVal(target.value)}
		></textarea>
		// <textarea autoFocus placeholder="Текст задачи" value={val} onChange={({target}) => setVal(target.value)}></textarea>
	)
}

export default EditTextarea;
