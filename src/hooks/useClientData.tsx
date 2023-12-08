import { useEffect } from 'react'
import {
	useGetDistrictsQuery,
	useGetRegionsQuery,
	useGetCategoriesQuery,
} from 'src/store/index.endpoints'
import { useActions, useSelectors } from '.'

const useClientData = () => {
	// store states and actions
	const { regionSearch, districtSearch, categoriesSearch } = useSelectors()
	const { setFilters } = useActions()

	// rtk hooks
	const { data: districtsData, isError: districtsError } = useGetDistrictsQuery(
		{ page: 1, search: districtSearch, limit: 100000 }
	)
	const { data: categoriesData, isError: categoriesError } = useGetCategoriesQuery({
		page: 1,
		search: categoriesSearch,
		limit: 100000,
	})
	const { data: regionsData, isError: regionsError } = useGetRegionsQuery({
		page: 1,
		search: regionSearch,
		limit: 100000,
	})

	// set store state with filters
	useEffect(() => {
		if (regionsData && categoriesData && districtsData) {
			setFilters({
				region: regionsData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
				categories: categoriesData.data.map(item => ({
					text: item.category_name.ru,
					value: item.category_name.ru,
				})),
				district: districtsData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
			})
		}
	}, [districtsData, categoriesData, regionsData])

	return {
		districtsData,
		categoriesData,
		regionsData,
		districtsError,
		categoriesError,
		regionsError,
	}
}

export { useClientData }
