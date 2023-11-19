import React from 'react'
import { UiButton, UiServicesDrawer } from 'src/components/ui'
import { ServicesTable } from './ServicesTable'
import { TItemData } from 'src/store/shared/shared.types'
import { Search } from 'src/components/shared'

const Services: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
	const [editData, setEditData] = React.useState<TItemData>()

	const handleClickAdd = () => {
		setEditData(undefined)
		setIsDrawerOpen(true)
	}

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<Search />
				<UiButton type='primary' onClick={handleClickAdd}>
					Добавить
				</UiButton>
				<UiServicesDrawer
					isDrawerOpen={isDrawerOpen}
					setIsDrawerOpen={setIsDrawerOpen}
					editData={editData}
				/>
			</div>
			<ServicesTable
				setEditData={setEditData}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
		</div>
	)
}

export { Services }
