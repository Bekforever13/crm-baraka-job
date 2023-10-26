import React from 'react'
import { Table, Button, Input } from 'antd'
import { exportToExcel } from 'src/utils/export'
import { UiFilterDrawer } from 'src/components/ui'
import { useActions } from 'src/hooks/useActions'

const Customers: React.FC = () => {
	const { setShowDrawer } = useActions()
	const dataSource = [
		{ key: '1', name: 'John Doe', age: 30, address: 'New York' },
		{ key: '2', name: 'Jane Smith', age: 28, address: 'London' },
		{ key: '3', name: 'Bob Johnson', age: 35, address: 'Paris' },
	]

	const columns = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			sorter: (a: any, b: any) => a.age - b.age,
		},
		{ title: 'Address', dataIndex: 'address', key: 'address' },
	]

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<Input.Search />
				<div className='flex items-center gap-x-5'>
					<Button onClick={() => exportToExcel(dataSource)}>Скачать</Button>
					<Button onClick={() => setShowDrawer(true)}>Фильтр</Button>
					<UiFilterDrawer />
				</div>
			</div>
			<Table dataSource={dataSource} columns={columns} />
		</div>
	)
}

export { Customers }
