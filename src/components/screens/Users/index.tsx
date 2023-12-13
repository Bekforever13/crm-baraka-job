import { FC } from 'react'
import { UsersTable } from './UsersTable/UsersTable'
import { UiAddAdminDrawer, UiButton } from 'src/components/ui'
import { useActions } from 'src/hooks'

const Users: FC = () => {
	// store actions
	const { setUsersDrawer } = useActions()

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='w-full flex justify-end'>
				<UiButton
					onClick={() => setUsersDrawer(true)}
					style={{ width: 'fit-content' }}
				>
					Добавить
				</UiButton>
				<UiAddAdminDrawer />
			</div>
			<UsersTable />
		</div>
	)
}

export { Users }
