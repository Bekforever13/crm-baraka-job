import React from 'react'
import { UiButton, UiServicesDrawer } from 'src/components/ui'
import { ServicesTable } from './ServicesTable/ServicesTable'
import { TItemData } from 'src/store/shared/shared.types'
import { Search } from 'src/components/shared'
import { Import } from 'src/utils/Import'

const Services: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
	const [editData, setEditData] = React.useState<TItemData | undefined>(
		undefined
	)

	const handleClickAdd = () => {
		setEditData(undefined)
		setIsDrawerOpen(true)
	}

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<Search />
				<div className='flex items-center gap-10'>
					<Import url='service' />
					<UiButton type='primary' onClick={handleClickAdd}>
						Добавить
					</UiButton>
				</div>
				<UiServicesDrawer
					isDrawerOpen={isDrawerOpen}
					setIsDrawerOpen={setIsDrawerOpen}
					editData={editData}
					setEditData={setEditData}
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
