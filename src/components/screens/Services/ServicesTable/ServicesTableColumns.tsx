import React from 'react'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'
import type { ColumnsType } from 'antd/es/table'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { Popconfirm } from 'antd/lib'
import { IServiceDataResponse } from 'src/store/services/Services.types'
import { useDeleteServiceMutation } from 'src/store/index.endpoints'
import { message } from 'antd'

type TProps = {
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
	setEditData: (el: React.SetStateAction<TItemData | undefined>) => void
	data: IServiceDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

const ServicesTableColumns: (el: TProps) => ColumnsType<TItemData> = ({
	setEditData,
	setIsDrawerOpen,
	data,
	setCurrentPage,
}) => {
	const [deleteService, { isSuccess }] = useDeleteServiceMutation()

	const handleClickEdit = (rec: TItemData) => {
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
			title: 'Ozbekcha',
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
					<BiSolidPencil
						onClick={() => handleClickEdit(rec)}
						className='cursor-pointer'
						size='22'
						color='blue'
					/>
					<Popconfirm
						title='Удалить сервис?'
						onConfirm={() => {
							if (data?.meta.total && data?.meta.total < 11) {
								setCurrentPage(1)
							}
							deleteService(rec.id)
						}}
						okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
					>
						<BiSolidTrash className='cursor-pointer' size='22' color='red' />
					</Popconfirm>
				</div>
			),
		},
	]

	React.useEffect(() => {
		if (isSuccess) {
			message.success('Сервис успешно удалён.')
			setIsDrawerOpen(false)
		}
	}, [isSuccess])
	return columns
}

export { ServicesTableColumns }
