import { useEffect } from 'react'
import {
	useGetDistrictsQuery,
	useGetRegionsQuery,
	useGetServicesQuery,
} from 'src/store/index.endpoints'
import { useActions } from '.'

const useClientData = () => {
	const { setFilters } = useActions()
	const { data: districtsData, isError: districtsError } = useGetDistrictsQuery(
		{ page: 1, search: '', limit: 100000 }
	)
	const { data: servicesData, isError: servicesError } = useGetServicesQuery({
		page: 1,
		search: '',
		limit: 100000,
	})
	const { data: regionsData, isError: regionsError } = useGetRegionsQuery({
		page: 1,
		search: '',
		limit: 100000,
	})

	useEffect(() => {
		if (regionsData && servicesData && districtsData) {
			setFilters({
				region: regionsData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
				service: servicesData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
				district: districtsData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
			})
		}
	}, [districtsData, servicesData, regionsData])

	return {
		districtsData,
		servicesData,
		regionsData,
		districtsError,
		servicesError,
		regionsError,
	}
}

export { useClientData }
