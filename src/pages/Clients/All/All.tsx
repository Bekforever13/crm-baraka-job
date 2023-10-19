import React from 'react'
import { Table, Button, Input } from 'antd'
import * as XLSX from 'xlsx'

const All: React.FC = () => {
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

	const exportToExcel = () => {
		const workbook = XLSX.utils.book_new()
		const worksheet = XLSX.utils.json_to_sheet(dataSource)
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
		XLSX.writeFile(workbook, 'data.xlsx')
	}

	return (
		<div className='flex flex-col gap-y-5'>
			<div className='flex gap-x-5'>
				<Button onClick={exportToExcel} className='w-40'>
					Export to Excel
				</Button>
				<Input.Search className='w-60' />
			</div>
			<Table dataSource={dataSource} columns={columns} />
		</div>
	)
}

export { All }
