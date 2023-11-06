import React from 'react'
import {
	useDeleteDistrictsMutation,
	useGetDistrictsQuery,
	useGetRegionsQuery,
} from 'src/store/index.endpoints'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'
import { Table, message, Popconfirm } from 'antd'
import { ITableProps } from 'src/components/shared/shared.types'

const DistrictsTable: React.FC<ITableProps> = ({
	setIsDrawerOpen,
	setEditData,
}) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { data, isLoading, isError } = useGetDistrictsQuery(currentPage)
	const [deleteRegion, { isSuccess }] = useDeleteDistrictsMutation()
	const { data: regions } = useGetRegionsQuery(1)

	const handleClickEdit = (rec: TItemData) => {
		setEditData(undefined)
		setEditData(rec)
		setIsDrawerOpen(true)
	}

	const columns = [
		{
			title: 'Регион',
			dataIndex: 'region_id',
			key: 'region_id',
			render: (el: number) => (
				<>{regions?.data.find(item => item.id === el)?.name.ru}</>
			),
		},
		{
			title: 'Каракалпакский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => <>{el.kar}</>,
		},
		{
			title: 'Русский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => <>{el.ru}</>,
		},
		{
			title: 'Узбекский',
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => <>{el.uz}</>,
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_: unknown, rec: TItemData) => {
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
							onConfirm={() => deleteRegion(rec.id)}
							okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
						>
							<BiSolidTrash className='cursor-pointer' size='22' color='red' />
						</Popconfirm>
					</div>
				)
			},
		},
	]

	React.useEffect(() => {
		if (isSuccess) {
			message.success('Регион успешно удалён.')
			setIsDrawerOpen(false)
		}
		if (isError) message.error('Произошла ошибка, повторите попытку.')
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

export { DistrictsTable }
