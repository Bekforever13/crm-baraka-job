import React from 'react'
import Table from 'antd/es/table'
import { useGetRegionsQuery } from 'src/store/index.endpoints'
import { message } from 'antd'
import { ITableProps } from 'src/components/shared/shared.types'
import { useSelectors } from 'src/hooks/useSelectors'
import { RegionsTableColumns } from './RegionsTableColumns'

const RegionsTable: React.FC<ITableProps> = ({
	setIsDrawerOpen,
	setEditData,
}) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { search } = useSelectors()
	const { data, isLoading, isError } = useGetRegionsQuery({
		page: currentPage,
		search: search,
	})

	React.useEffect(() => {
		if (isError) message.error('Произошла ошибка, повторите попытку.')
	}, [isError])

	return (
		<Table
			loading={isLoading}
			pagination={{
				total: data?.total,
				current: currentPage,
				showSizeChanger: false,
				onChange: page => setCurrentPage(page),
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={RegionsTableColumns({
				setIsDrawerOpen,
				setEditData,
				data,
				setCurrentPage,
			})}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { RegionsTable }
