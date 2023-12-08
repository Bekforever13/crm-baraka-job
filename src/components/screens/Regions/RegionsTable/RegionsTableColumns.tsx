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

type TProps = {
	data: IRegionDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

const RegionsTableColumns: (
	props: TProps
) => ColumnsType<TRegionWithDistricts> = ({ data, setCurrentPage }) => {
	// store actions
	const { setEditData, setShowDrawer } = useActions()
	// rtk hook
	const [deleteRegion, { isSuccess }] = useDeleteRegionMutation()

	// after click edit we will set editData to store and open drawer
	const handleClickEdit = (rec: TItemData) => {
		setEditData(rec)
		setShowDrawer(true)
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
			render: (_, rec) => {
				return (
					<div className='flex items-center gap-3'>
						<BiSolidPencil
							onClick={() => handleClickEdit(rec)}
							className='cursor-pointer'
							size='22'
							color='blue'
						/>
						<Popconfirm
							title='Удалить регион?'
							onConfirm={() => {
								if (data?.total && data?.total < 11) {
									setCurrentPage(1)
								}
								deleteRegion(rec.id)
							}}
							cancelText='Отмена'
							okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
						>
							<BiSolidTrash className='cursor-pointer' size='22' color='red' />
						</Popconfirm>
					</div>
				)
			},
		},
	]

	useEffect(() => {
		if (isSuccess) {
			message.success('Регион успешно удалён.')
			setShowDrawer(false)
		}
	}, [isSuccess])
	return columns
}

export { RegionsTableColumns }
