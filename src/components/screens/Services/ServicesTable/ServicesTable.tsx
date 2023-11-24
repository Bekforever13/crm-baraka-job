import React from 'react'
import Table from 'antd/es/table'
import { useGetServicesQuery } from 'src/store/index.endpoints'
import { message } from 'antd'
import { ITableProps } from 'src/components/shared/shared.types'
import { useSelectors } from 'src/hooks/useSelectors'
import { ServicesTableColumns } from './ServicesTableColumns'

const ServicesTable: React.FC<ITableProps> = ({
	setIsDrawerOpen,
	setEditData,
}) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { search } = useSelectors()
	const { data, isLoading, isError } = useGetServicesQuery({
		page: currentPage,
		search: search,
	})

	React.useEffect(() => {
		if (isError) {
			message.error('Произошла ошибка, повторите попытку.')
		}
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
			columns={ServicesTableColumns({
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

export { ServicesTable }
