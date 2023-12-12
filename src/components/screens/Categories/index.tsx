import { FC } from 'react'
import { UiButton, UiCategoriesDrawer, UiServicesDrawer } from 'src/components/ui'
import { CategoriesTable } from './CategoriesTable/CategoriesTable'
import { Search } from 'src/components/shared'
import { Import } from 'src/utils/Import'
import { useActions } from 'src/hooks'

const Categories: FC = () => {
	// Store actions
	const { setShowDrawer, setEditData } = useActions()

	// after click add button we will clear editData state from store and open drawer
	const handleClickAdd = () => {
		setEditData(null)
		setShowDrawer(true)
	}

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<div className='w-[50%]'>
					<Search category='categories' />
				</div>
				<div className='flex items-center gap-10'>
					<Import url='categories' />
					<UiButton type='primary' onClick={handleClickAdd}>
						Добавить
					</UiButton>
				</div>
				<UiCategoriesDrawer />
				<UiServicesDrawer />
			</div>
			<CategoriesTable />
		</div>
	)
}

export { Categories }
