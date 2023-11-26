import React, { useState } from 'react'
import { UsersTable } from './UsersTable/UsersTable'
import { UiAddAdminDrawer, UiButton } from 'src/components/ui'

const Users: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='w-full flex justify-end'>
				<UiButton onClick={() => setIsDrawerOpen(true)} style={{ width: 'fit-content' }}>Добавить</UiButton>
				<UiAddAdminDrawer
					isDrawerOpen={isDrawerOpen}
					setIsDrawerOpen={setIsDrawerOpen}
				/>
			</div>
			<UsersTable />
		</div>
	)
}

export { Users }
