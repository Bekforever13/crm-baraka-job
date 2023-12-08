import { Table } from 'antd'
import React from 'react'
import { IRuKarUz, TItemData } from 'src/store/shared/shared.types'

type TProps = {
	districts: TItemData[]
}

// ** This table will be show when clicked expand some category **

const RegionsExpandedTable: React.FC<TProps> = ({ districts }) => {
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
