import React from 'react'
import type { ColumnsType } from 'antd/es/table'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { Popconfirm } from 'antd/lib'
import Table from 'antd/es/table'
import {
	useDeleteServiceMutation,
	useGetServicesQuery,
} from 'src/store/index.endpoints'
import { message } from 'antd'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'
import { ITableProps } from 'src/components/shared/shared.types'
import { useSelectors } from 'src/hooks/useSelectors'

const ServicesTable: React.FC<ITableProps> = ({
	setIsDrawerOpen,
	setEditData,
}) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { search } = useSelectors()
	const { data, isLoading, isError } = useGetServicesQuery({
		page: currentPage,
		search: search,
	})
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
				showSizeChanger: false,
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={columns}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { ServicesTable }
