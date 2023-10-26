import React from 'react'
import { Table, Button, Input, message, Popconfirm } from 'antd'
import { exportToExcel } from 'src/utils/export'
import { UiFilterDrawer, UiButton, UiAddRegionDrawer } from 'src/components/ui'
import { useActions } from 'src/hooks/useActions'
import {
	useDeleteRegionMutation,
	useGetRegionsQuery,
} from 'src/store/index.endpoints'
import { TRegion } from 'src/store/region/Region.types'
import { IRuKarUz } from 'src/store/shared/shared.types'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'

const Regions: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { data, isLoading, isError } = useGetRegionsQuery(currentPage)
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
	const [editData, setEditData] = React.useState<TRegion>()
	const { setShowDrawer } = useActions()
	const [deleteRegion, { isSuccess }] = useDeleteRegionMutation()
	const total = data?.meta.total

	console.log(data)
	const handleClickEdit = (rec: TRegion) => {
		setEditData(rec)
		setIsDrawerOpen(true)
	}

	const handleClickAdd = () => {
		setEditData(undefined)
		setIsDrawerOpen(true)
	}

	const columns = [
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
			render: (_: unknown, rec: TRegion) => {
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
			<div className='flex items-center justify-between gap-20'>
				<Input.Search />
				<div className='flex items-center gap-x-5'>
					<Button onClick={() => exportToExcel<TRegion>(data?.data ?? [])}>
						Скачать
					</Button>
					<Button onClick={() => setShowDrawer(true)}>Фильтр</Button>
					<UiButton type='primary' onClick={handleClickAdd}>
						Добавить
					</UiButton>
					<UiAddRegionDrawer
						isDrawerOpen={isDrawerOpen}
						setIsDrawerOpen={setIsDrawerOpen}
						editData={editData}
					/>
					<UiFilterDrawer />
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

export { Regions }
