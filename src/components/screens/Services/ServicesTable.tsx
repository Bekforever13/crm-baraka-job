import React from 'react'
import type { ColumnsType } from 'antd/es/table'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { Popconfirm } from 'antd/lib'
import Table from 'antd/es/table'
import {
	useDeleteServiceMutation,
	useGetServicesQuery,
} from 'src/store/index.endpoints'
import { message } from 'antd'
import { ITableProps } from 'src/components/shared/shared.types'

const ServicesTable: React.FC<ITableProps> = ({
	setIsDrawerOpen,
	setEditData,
}) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { data, isLoading, isError } = useGetServicesQuery(currentPage)
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
			render: (el: IRuKarUz) => el.uz,
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
						onConfirm={() => deleteService(rec.id)}
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
		if (isError) {
			message.error('Произошла ошибка, повторите попытку.')
		}
	}, [isSuccess, isError])

	return (
		<Table
			loading={isLoading}
			pagination={{
				total: data?.meta.total,
				current: currentPage,
				onChange: page => setCurrentPage(page),
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={columns}
		/>
	)
}

export { ServicesTable }
