import { FC, useState, useEffect } from 'react'
import { Table, message } from 'antd'
import { useGetUsersQuery } from 'src/store/index.endpoints'
import { useSelectors } from 'src/hooks/useSelectors'
import { UsersTableColumns } from './UsersTableColumns'

const UsersTable: FC = () => {
	// states
	const [currentPage, setCurrentPage] = useState(1)
	// store states
	const { search } = useSelectors()
	// rtk hooks
	const { data, isLoading, isError } = useGetUsersQuery({
		page: currentPage,
		search: search,
	})

	// error message
	useEffect(() => {
		if (isError) message.error('Произошла ошибка, повторите попытку.')
	}, [isError])

	return (
		<Table
			loading={isLoading}
			pagination={{
				total: data?.meta.total,
				current: currentPage,
				onChange: page => setCurrentPage(page),
				showSizeChanger: false,
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={UsersTableColumns({
				data,
				setCurrentPage,
			})}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { UsersTable }
