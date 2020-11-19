import React from 'react'

const Test = () => {
	// Это чисто базы React при обновлении стейта перерисовываются все дочерние компоненты
	// И чтобы не перерисовывались те компоненты, пропсы которых не изменились, нужеь React.memo
	console.log('Test renders')
	return (
		<div>
			Test
		</div>
	)
}

export default React.memo(Test)
