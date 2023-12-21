import { FC, useState, useEffect } from 'react'
import Table from 'antd/es/table'
import { useGetAllRegionsQuery, useGetRegionsQuery } from 'src/store/index.endpoints'
import { message } from 'antd'
import { useSelectors } from 'src/hooks/useSelectors'
import { RegionsTableColumns } from './RegionsTableColumns'
import { RegionsExpandedTable } from './RegionsExpandedTable'
import { useActions, useCheckLastPage } from 'src/hooks'

const RegionsTable: FC = () => {
	// State
	const [currentPage, setCurrentPage] = useState(1)
	// store states and actions
	const { setRegionsData } = useActions()
	const { regionSearch, regionsData } = useSelectors()
	// rtk hook
	const {data: allRegionsData} = useGetAllRegionsQuery()
	const { data, isLoading, isError } = useGetRegionsQuery({
		page: currentPage,
	})

	// hook will check page after deleting item and if currentPage > last page then currentpage will be = last page
	useCheckLastPage({
		currentPage,
		lastPage: data?.meta.last_page ?? 1,
		setCurrentPage,
	})

	// error message
	useEffect(() => {
		if (isError) message.error('Произошла ошибка, повторите попытку.')
	}, [isError])

	// ** search filter
	useEffect(() => {
		// when start search this logic will start work
		if (regionsData && regionSearch.length) {
			setRegionsData(
				regionsData.filter(el => {
					// if we searching category
					const isCategoryNameMatch = Object.values(el.name).some(val =>
						val.toLowerCase().includes(regionSearch.toLowerCase())
					)

					if (isCategoryNameMatch) {
						return true
					}

					// if we searching service
					const isServiceNameMatch = el.districts
						.map(item => item.name)
						.some(name =>
							Object.values(name).some(val =>
								val.toLowerCase().includes(regionSearch.toLowerCase())
							)
						)

					return isServiceNameMatch
				})
			)
		}
	}, [regionSearch])

	useEffect(() => {
		// if search value empty data will be restored from { data }
		if (!regionSearch.length && allRegionsData) {
			setRegionsData(allRegionsData.data)
		}
	}, [allRegionsData, regionSearch])

	return (
		<Table
			loading={isLoading}
			pagination={
				regionSearch.length
					? false
					: {
							total: data?.meta.total,
							current: currentPage,
							showSizeChanger: false,
							onChange: page => setCurrentPage(page),
					}
			}
			rowKey={e => e.id}
			dataSource={regionsData}
			columns={RegionsTableColumns({ data, setCurrentPage })}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
			expandable={{
				expandedRowRender: record => (
					// our custom table will show when clicked expand category
					<RegionsExpandedTable
						regionsId={record.id}
						districts={record.districts}
					/>
				),
				rowExpandable: record => record.districts.length > 0,
			}}
		/>
	)
}

export { RegionsTable }
