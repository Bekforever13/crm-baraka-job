import React from 'react'
import { Table, message, Popconfirm } from 'antd'
import { UiButton } from 'src/components/ui'
import {
	useDeleteDistrictsMutation,
	useGetDistrictsQuery,
	useGetRegionsQuery,
} from 'src/store/index.endpoints'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { UiAddDistrictDrawer } from 'src/components/ui/Drawer/UiAddDistrictDrawer'

const Districts: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { data, isLoading, isError } = useGetDistrictsQuery(currentPage)
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
	const [editData, setEditData] = React.useState<TItemData>()
	const [deleteRegion, { isSuccess }] = useDeleteDistrictsMutation()
	const { data: regions } = useGetRegionsQuery(1)
	const total = data?.meta.total

	const handleClickEdit = (rec: TItemData) => {
		setEditData(undefined)
		setEditData(rec)
		setIsDrawerOpen(true)
	}

	const handleClickAdd = () => {
		setEditData(undefined)
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
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-end gap-20'>
				<div className='flex items-center gap-x-5'>
					<UiButton type='primary' onClick={handleClickAdd}>
						Добавить
					</UiButton>
					<UiAddDistrictDrawer
						isDrawerOpen={isDrawerOpen}
						setIsDrawerOpen={setIsDrawerOpen}
						editData={editData}
					/>
				</div>
			</div>
			<Table
				loading={isLoading}
				pagination={{
					total: total,
					current: currentPage,
					onChange: page => setCurrentPage(page),
				}}
				rowKey={e => e.id}
				dataSource={data?.data}
				columns={columns}
			/>
		</div>
	)
}

export { Districts }
