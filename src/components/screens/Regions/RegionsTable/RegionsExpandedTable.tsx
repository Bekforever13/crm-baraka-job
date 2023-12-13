import { Popconfirm, Table } from 'antd'
import { FC } from 'react'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi'
import { useDeleteDistrictsMutation } from 'src/store/index.endpoints'
import { TAddServiceData } from 'src/store/services/Services.types'
import { useActions } from 'src/hooks'

type TProps = {
	districts: TItemData[]
	regionsId: number
}

// ** This table will be show when clicked expand some category **
const RegionsExpandedTable: FC<TProps> = ({ districts, regionsId }) => {
	// store states and actions
	const { setRegionID, setDistrictEditData, setDistrictDrawer } = useActions()
	// rtk hooks
	const [deleteDistrict] = useDeleteDistrictsMutation()
	// columns for table
	const columns = [
		{
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.kar,
		},
		{
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.ru,
		},
		{
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.uz_kiril,
		},
		{
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.uz_latin,
		},
		{
			dataIndex: 'name',
			key: 'name',
			render: (el: IRuKarUz) => el.en,
		},
		{
			dataIndex: 'actions',
			key: 'actions',
			render: (_: unknown, rec: TAddServiceData) => (
				<div className='flex items-center gap-3'>
					<BiSolidPencil
						onClick={() => {
							setDistrictEditData(rec)
							setDistrictDrawer(true)
							setRegionID(regionsId)
						}}
						className='cursor-pointer'
						size='22'
						color='blue'
					/>
					<Popconfirm
						title='Удалить округ?'
						onConfirm={() => deleteDistrict(rec.id)}
						cancelText='Отмена'
						okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
					>
						<BiSolidTrash className='cursor-pointer' size='22' color='red' />
					</Popconfirm>
				</div>
			),
		},
	]

	return (
		<Table
			rowKey={e => e.id}
			dataSource={districts}
			columns={columns}
			style={{ margin: '0 50px 20px 0' }}
			scroll={{ x: true }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { RegionsExpandedTable }
