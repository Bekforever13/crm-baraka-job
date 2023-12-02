import React from 'react'
import { Input } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useDebounce } from 'src/hooks/useDebounce'

const Search: React.FC = () => {
	const [searchValue, setSearchValue] = React.useState('')
	const debouncedSearch = useDebounce<string>(searchValue, 300)
	const { setSearch } = useActions()

	React.useEffect(() => {
		setSearch(debouncedSearch)
	}, [debouncedSearch])

	React.useEffect(() => {
		if (!searchValue.length) setSearch('')
	}, [searchValue])

	return (
		<Input.Search
			allowClear
			placeholder='Поиск...'
			value={searchValue}
			style={{ width: '50%' }}
			onChange={e => setSearchValue(e.target.value)}
		/>
	)
}

export { Search }
