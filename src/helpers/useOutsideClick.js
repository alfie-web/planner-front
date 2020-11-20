import { useEffect } from 'react';

// export default (ref, callback, permittedRef) => {
const useOutsideClick = (ref, callback, permittedSelector) => {
	// Вариан если бы был селектор
	const handleOutsideClick = e => {
		if ( ref.current && (!ref.current.contains(e.target) && !e.target.closest(permittedSelector) )) {
			callback();
		}
	};

	// const handleOutsideClick = e => {
	// 	if ( ref.current && (!ref.current.contains(e.target) && !permittedRef.current.contains(e.target) )) {
	// 		callback();
	// 	}
	// };

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	})
}

export default useOutsideClick