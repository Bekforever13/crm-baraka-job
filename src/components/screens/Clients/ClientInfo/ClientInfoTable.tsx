import { FC } from 'react'
import { Table, TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TCallHistory } from 'src/store/clients/Client.types'

// table for ClientInfo
const ClientInfoTable: FC<TableProps<TCallHistory>> = props => {
	// columns for our table
	const columns: ColumnsType<TCallHistory> = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: () => 'outgoing' ? 'Входящий' : 'Исходящий'
		},
		{
			title: 'Сервис',
			dataIndex: 'service',
			key: 'service',
			render: (_, rec) => rec.service.ru,
		},
		{
			title: 'Дата',
			dataIndex: 'date',
			key: 'date',
		},
	]
	return (
		<Table
			{...props}
			rowKey={e => e.id}
			columns={columns}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет истории звонков' }}
		/>
	)
}

export { ClientInfoTable }
