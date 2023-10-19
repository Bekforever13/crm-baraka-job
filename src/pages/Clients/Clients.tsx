import React from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import { All } from './All/All'
import { Customers } from './Customers/Customers'
import { Workers } from './Workers/Workers'

const Clients: React.FC = () => {
	const { activeSubmenu } = useSelectors()
	return (
		<div className='m-5 bg-white p-5 rounded-2xl min-h-[83vh]'>
			{activeSubmenu.toLowerCase() === 'все' && <All />}
			{activeSubmenu.toLowerCase() === 'рабочие' && <Workers />}
			{activeSubmenu.toLowerCase() === 'заказчики' && <Customers />}
		</div>
	)
}

export { Clients }
