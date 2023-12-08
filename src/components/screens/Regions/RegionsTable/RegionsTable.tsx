import { FC, useState, useEffect } from 'react'
import Table from 'antd/es/table'
import { useGetRegionsQuery } from 'src/store/index.endpoints'
import { message } from 'antd'
import { useSelectors } from 'src/hooks/useSelectors'
import { RegionsTableColumns } from './RegionsTableColumns'
import { RegionsExpandedTable } from './RegionsExpandedTable'

const RegionsTable: FC = () => {
	// State
	const [currentPage, setCurrentPage] = useState(1)
	// store states
	const { regionSearch } = useSelectors()
	// rtk hook
	const { data, isLoading, isError } = useGetRegionsQuery({
		page: currentPage,
		search: regionSearch,
	})

	// hook will check page after deleting item and if currentPage > last page then currentpage will be = last page
	// useCheckLastPage({
	// 	currentPage,
	// 	lastPage: data?.meta.last_page!,
	// 	setCurrentPage,
	// })

	// error message
	useEffect(() => {
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
			columns={RegionsTableColumns({ data, setCurrentPage })}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
			expandable={{
				expandedRowRender: record => (
					// our custom table will show when clicked expand category
					<RegionsExpandedTable districts={record.districts} />
				),
				rowExpandable: record => !!record.name.ru,
			}}
		/>
	)
}

export { RegionsTable }
