import React from 'react'
import { UsersTable } from './UsersTable'

const Users: React.FC = () => {
	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<UsersTable />
		</div>
	)
}

export { Users }
