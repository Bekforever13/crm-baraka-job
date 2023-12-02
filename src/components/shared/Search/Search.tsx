import React from 'react'
import { Input } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useDebounce } from 'src/hooks/useDebounce'

const Search: React.FC<{ category: string }> = ({ category }) => {
	const [searchValue, setSearchValue] = React.useState('')
	const debouncedSearch = useDebounce<string>(searchValue, 300)
	const { setRegionSearch, setDistrictSearch, setServiceSearch } = useActions()

	React.useEffect(() => {
		if (category === 'region') setRegionSearch(debouncedSearch)
		if (category === 'district') setDistrictSearch(debouncedSearch)
		if (category === 'service') setServiceSearch(debouncedSearch)
	}, [debouncedSearch])

	React.useEffect(() => {
		if (!searchValue.length) {
			setRegionSearch('')
			setDistrictSearch('')
			setServiceSearch('')
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
