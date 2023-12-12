import { FC } from 'react'
import { UiButton, UiAddRegionDrawer, UiDistrictDrawer } from 'src/components/ui'
import { RegionsTable } from './RegionsTable/RegionsTable'
import { Search } from 'src/components/shared'
import { Import } from 'src/utils/Import'
import { useActions } from 'src/hooks'

const Regions: FC = () => {
	// Store actions
	const { setShowDrawer, setEditData } = useActions()

	// after click add button we will clear editData state from store and open drawer
	const handleClickAdd = () => {
		setEditData(null)
		setShowDrawer(true)
	}

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between'>
				<div className='w-[50%]'>
					<Search category='region' />
				</div>
				<div className='flex items-center gap-10'>
					<Import url='region' />
					<UiButton type='primary' onClick={handleClickAdd}>
						Добавить
					</UiButton>
				</div>
				<UiAddRegionDrawer />
				<UiDistrictDrawer />
			</div>
			<RegionsTable />
		</div>
	)
}

export { Regions }
