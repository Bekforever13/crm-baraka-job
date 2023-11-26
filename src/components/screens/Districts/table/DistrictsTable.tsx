import React from 'react'
import { Table, message } from 'antd'
import { ITableProps } from 'src/components/shared/shared.types'
import { useSelectors } from 'src/hooks/useSelectors'
import { DistrictsTableColumns } from './DistrictsTableColumns'
import {
	useGetDistrictsQuery,
	useGetRegionsQuery,
} from 'src/store/index.endpoints'

const DistrictsTable: React.FC<ITableProps> = ({
	setIsDrawerOpen,
	setEditData,
}) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { search } = useSelectors()
	const { data, isLoading, isError } = useGetDistrictsQuery({
		page: currentPage,
		search: search,
	})
	const { data: regions } = useGetRegionsQuery({
		page: currentPage,
		search: '',
	})

	React.useEffect(() => {
		if (isError) message.error('Произошла ошибка, повторите попытку.')
	}, [isError])

	return (
		<Table
			loading={isLoading}
			pagination={{
				total: data?.meta.total,
				current: currentPage,
				pageSize: 10,
				onChange: page => setCurrentPage(page),
			}}
			rowKey={e => e.id}
			dataSource={data?.data}
			columns={DistrictsTableColumns({
				setEditData,
				regions,
				setIsDrawerOpen,
				setCurrentPage,
			})}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { DistrictsTable }
