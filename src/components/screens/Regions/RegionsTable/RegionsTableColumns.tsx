import { Popconfirm, message } from 'antd'
import { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import {
	IRegionDataResponse,
	IRuKarUz,
	TItemData,
	TRegionWithDistricts,
} from 'src/store/shared/shared.types'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { useDeleteRegionMutation } from 'src/store/index.endpoints'
import { useActions } from 'src/hooks'
import { FaRegPlusSquare } from 'react-icons/fa'

type TProps = {
	data: IRegionDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

const RegionsTableColumns: (
	props: TProps
) => ColumnsType<TRegionWithDistricts> = () => {
	// store actions
	const { setEditData, setRegionDrawer, setDistrictDrawer, setRegionID } =
		useActions()
	// rtk hook
	const [deleteRegion, { isSuccess }] = useDeleteRegionMutation()

	// after click edit we will set editData to store and open drawer
	const handleClickEdit = (rec: TItemData) => {
		setEditData(rec)
		setRegionDrawer(true)
	}

	const columns: ColumnsType<TRegionWithDistricts> = [
		{
			title: 'Каракалпакский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.kar,
		},
		{
			title: 'Русский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.ru,
		},
		{
			title: 'Узбекский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.uz_kiril,
		},
		{
			title: 'O‘zbekcha',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.uz_latin,
		},
		{
			title: 'Английский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.en,
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
							setDistrictDrawer(true)
							setRegionID(rec.id)
						}}
					/>
					<BiSolidPencil
						onClick={() => handleClickEdit(rec)}
						className='cursor-pointer'
						size='22'
						color='blue'
					/>
					<Popconfirm
						title='Удалить регион?'
						onConfirm={() => deleteRegion(rec.id)}
						cancelText='Отмена'
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
			message.success('Регион успешно удалён.')
			setRegionDrawer(false)
		}
	}, [isSuccess])

	return columns
}

export { RegionsTableColumns }
