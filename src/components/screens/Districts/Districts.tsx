import React from 'react'
import { UiButton } from 'src/components/ui'
import { TItemData } from 'src/store/shared/shared.types'
import { UiAddDistrictDrawer } from 'src/components/ui/Drawer/UiAddDistrictDrawer'
import { DistrictsTable } from './DistrictsTable'
import { Search } from 'src/components/shared'
import { Import } from 'src/utils/Import'

const Districts: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
	const [editData, setEditData] = React.useState<TItemData>()

	const handleClickAdd = () => {
		setEditData(undefined)
		setIsDrawerOpen(true)
	}

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between'>
				<Search />

				<div className='flex items-center gap-10'>
					<Import url='district' />
					<UiButton type='primary' onClick={handleClickAdd}>
						Добавить
					</UiButton>
				</div>
				<UiAddDistrictDrawer
					isDrawerOpen={isDrawerOpen}
					setIsDrawerOpen={setIsDrawerOpen}
					editData={editData}
				/>
			</div>
			<DistrictsTable
				setEditData={setEditData}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
		</div>
	)
}

export { Districts }
