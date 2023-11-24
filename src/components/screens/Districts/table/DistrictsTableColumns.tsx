import {useEffect} from 'react'
import { Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { useDeleteDistrictsMutation } from 'src/store/index.endpoints'
import {
	IItemDataResponse,
	IRegionDataResponse,
	IRuKarUz,
	TItemData,
} from 'src/store/shared/shared.types'

type TProps = {
	setEditData: (el: React.SetStateAction<TItemData | undefined>) => void
	regions: IRegionDataResponse | undefined
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
	data: IItemDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

const DistrictsTableColumns: (props: TProps) => ColumnsType<TItemData> = ({
	setEditData,
	regions,
	setIsDrawerOpen,
	setCurrentPage,
	data,
}) => {
	const [deleteRegion, { isSuccess }] = useDeleteDistrictsMutation()
	const handleClickEdit = (rec: TItemData) => {
		setEditData(undefined)
		setEditData(rec)
		setIsDrawerOpen(true)
	}

	const columns: ColumnsType<TItemData> = [
		{
			title: 'Регион',
			dataIndex: 'region_id',
			key: 'region_id',
			render: (el: number) =>
				regions?.data.find(item => item.id === el)?.name.ru,
		},
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
								if (data?.meta.total && data?.meta.total < 11) {
									setCurrentPage(1)
								}
								deleteRegion(rec.id)
							}}
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

export { DistrictsTableColumns }
