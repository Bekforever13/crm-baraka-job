import { Table, TableProps } from 'antd'
import React from 'react'
import type { ColumnsType } from 'antd/es/table'
import { TCallHistory } from 'src/store/clients/Client.types'

const ClientInfoTable: React.FC<TableProps<TCallHistory>> = props => {
	const columns: ColumnsType<TCallHistory> = [
		{
			title: 'Имя',
			dataIndex: 'first_name',
			key: 'first_name',
		},
		{
			title: 'Фамилия',
			dataIndex: 'last_name',
			key: 'last_name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
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
