import { FC, useState, useEffect } from 'react'
import Table from 'antd/es/table'
import {
	useGetAllCategoriesQuery,
	useGetCategoriesQuery,
} from 'src/store/index.endpoints'
import { message } from 'antd'
import { CategoriesTableColumns } from './CategoriesTableColumns'
import { CategoriesExpandedTable } from './CategoriesExpandedTable'
import { useActions, useCheckLastPage, useSelectors } from 'src/hooks'

const findInObject = (object: any, key: any, value: any) => {
	if (object === null || object === undefined) {
		return false
	}

	if (object[key] === value) {
		return true
	}

	for (const property in object) {
		if (typeof object[property] === 'object') {
			if (findInObject(object[property], key, value)) {
				return true
			}
		}
	}

	return false
}

const CategoriesTable: FC = () => {
	// State
	const [currentPage, setCurrentPage] = useState(1)
	// Store actions and states
	const { setCategoriesData } = useActions()
	const { categoriesData, categoriesSearch } = useSelectors()
	const { data: allCategoriesData } = useGetAllCategoriesQuery()
	// RTK hooks
	const { data, isLoading, isError } = useGetCategoriesQuery({
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
		if (isError) {
			message.error('Произошла ошибка, повторите попытку.')
		}
	}, [isError])

	useEffect(() => {
		// after data fetched, data will be stored in our slice
		setCategoriesData(data?.data ?? [])
	}, [data])

	// ** search filter
	useEffect(() => {
		if (categoriesData && categoriesSearch.length) {
			const filter = categoriesData.filter(el => {
				// if we searching category
				const isCategoryNameMatch = Object.values(el.category_name).some(val =>
					val.toLowerCase().includes(categoriesSearch.toLowerCase())
				)

				if (isCategoryNameMatch) {
					return true
				}

				// if we searching service
				const isServiceNameMatch = el.services
					.map(item => item.name)
					.some(name =>
						Object.values(name).some(val =>
							val.toLowerCase().includes(categoriesSearch.toLowerCase())
						)
					)
				return isServiceNameMatch
			})

			setCategoriesData(filter)
		}
		// if search value empty data will be restored from { data }
		if (!categoriesSearch && allCategoriesData) {
			setCategoriesData(allCategoriesData?.data)
		}
	}, [categoriesSearch, categoriesSearch.length])

	return (
		<Table
			loading={isLoading}
			pagination={
				// if search is active we will hide pagination because search is in frontend not backend and total will be incorrect if we search
				categoriesSearch.length
					? false
					: {
							total: data?.meta.total,
							current: currentPage,
							onChange: page => setCurrentPage(page),
							showSizeChanger: false,
					  }
			}
			rowKey={e => e.id}
			dataSource={categoriesData}
			columns={CategoriesTableColumns({ data, setCurrentPage })}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
			expandable={{
				expandedRowRender: record => (
					// our custom table will show when clicked expand category
					<CategoriesExpandedTable
						categoryID={record.id}
						districts={record.services}
					/>
				),
				rowExpandable: record => record.services.length > 0,
			}}
		/>
	)
}

export { CategoriesTable }
