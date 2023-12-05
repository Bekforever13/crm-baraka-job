import { Popconfirm, message } from 'antd'
import { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import {
	IRegionDataResponse,
	IRuKarUz,
	TItemData,
} from 'src/store/shared/shared.types'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { useDeleteRegionMutation } from 'src/store/index.endpoints'

type TProps = {
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
	setEditData: (el: React.SetStateAction<TItemData | undefined>) => void
	data: IRegionDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

const RegionsTableColumns: (props: TProps) => ColumnsType<TItemData> = ({
	setIsDrawerOpen,
	setEditData,
	data,
	setCurrentPage,
}) => {
	const [deleteRegion, { isSuccess }] = useDeleteRegionMutation()

	const handleClickEdit = (rec: TItemData) => {
		setEditData(undefined)
		setEditData(rec)
		setIsDrawerOpen(true)
	}

	const columns: ColumnsType<TItemData> = [
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
			setIsDrawerOpen(false)
		}
	}, [isSuccess])
	return columns
}

export { RegionsTableColumns }
