import { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { Popconfirm, message } from 'antd'
import { useDeleteCategoriesMutation } from 'src/store/index.endpoints'
import {
	ICategoriesDataResponse,
	TAddCategoriesData,
} from 'src/store/categories/Categories.types'
import { useActions } from 'src/hooks'
import { TItemData } from 'src/store/shared/shared.types'
import { FaRegPlusSquare } from 'react-icons/fa'

// props type
type Props = {
	data: ICategoriesDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

const CategoriesTableColumns: (
	el: Props
) => ColumnsType<TAddCategoriesData> = () => {
	// Store actions
	const { setEditData, setShowDrawer, setSecondDrawer, setCategoryID } =
		useActions()
	// RTK hooks
	const [deleteService, { isSuccess }] = useDeleteCategoriesMutation()

	// after click edit we will set editData to store and open drawer
	const handleClickEdit = (rec: TItemData) => {
		setEditData(rec)
		setShowDrawer(true)
	}

	const columns: ColumnsType<TAddCategoriesData> = [
		{
			title: 'Каракалпакский',
			dataIndex: 'name',
			key: 'name',
			render: (_, rec) => rec.category_name.kar,
		},
		{
			title: 'Русский',
			dataIndex: 'name',
			key: 'name',
			render: (_, rec) => rec.category_name.ru,
		},
		{
			title: 'Узбекский',
			dataIndex: 'name',
			key: 'name',
			render: (_, rec) => rec.category_name.uz_kiril,
		},
		{
			title: 'O‘zbekcha',
			dataIndex: 'name',
			key: 'name',
			render: (_, rec) => rec.category_name.uz_latin,
		},
		{
			title: 'Английский',
			dataIndex: 'name',
			key: 'name',
			render: (_, rec) => rec.category_name.en,
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, rec) => (
				<div className='flex items-center gap-3'>
					<FaRegPlusSquare
						color='green'
						size='22'
						className='cursor-pointer'
						onClick={() => {
							setSecondDrawer(true)
							setCategoryID(rec.id)
						}}
					/>

					<BiSolidPencil
						onClick={() =>
							handleClickEdit({
								id: rec.id,
								name: rec.category_name,
							})
						}
						className='cursor-pointer'
						size='22'
						color='blue'
					/>
					<Popconfirm
						title='Удалить Категорию?'
						cancelText='Отмена'
						onConfirm={() => deleteService(rec.id)}
						okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
					>
						<BiSolidTrash className='cursor-pointer' size='22' color='red' />
					</Popconfirm>
				</div>
			),
		},
	]

	useEffect(() => {
		if (isSuccess) {
			message.success('Категория успешно удалена.')
			setShowDrawer(false)
		}
	}, [isSuccess])
	return columns
}

export { CategoriesTableColumns }
