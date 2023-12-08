import { FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useDebounce } from 'src/hooks/useDebounce'

const Search: FC<{ category: string }> = ({ category }) => {
	// states
	const [searchValue, setSearchValue] = useState('')
	// hooks
	const debouncedSearch = useDebounce<string>(searchValue, 300)
	// store actions
	const { setRegionSearch, setDistrictSearch, setCategoriesSearch } =
		useActions()

		useEffect(() => {
		// after check category we will change correct search state in store
		if (category === 'region') setRegionSearch(debouncedSearch)
		if (category === 'district') setDistrictSearch(debouncedSearch)
		if (category === 'categories') setCategoriesSearch(debouncedSearch)
	}, [debouncedSearch, category])


	useEffect(() => {
		// if search value is empty we clear all search values from store
		if (!searchValue.length) {
			setRegionSearch('')
			setDistrictSearch('')
			setCategoriesSearch('')
		}
	}, [searchValue])

	return (
		<Input.Search
			allowClear
			placeholder='Поиск...'
			value={searchValue}
			style={{ width: '100%' }}
			onChange={e => setSearchValue(e.target.value)}
		/>
	)
}

export { Search }
