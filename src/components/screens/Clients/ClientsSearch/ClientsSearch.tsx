import { FC, useState, useEffect } from 'react'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks/useSelectors'
import { useDebounce } from 'src/hooks/useDebounce'
import { Input } from 'antd'

const ClientsSearch: FC = () => {
	// states
	const [search, setSearch] = useState('')
	// debounce
	const debouncedSearch = useDebounce<string>(search, 300)
	// store actions and states
	const { tableFilter } = useSelectors()
	const { setTableFilter } = useActions()

	useEffect(() => {
		// adding search value to our store state and this will make refetch data when search value > 0
		setTableFilter({ ...tableFilter, search: debouncedSearch, page: 1 })
	}, [debouncedSearch])

	useEffect(() => {
		// if search value is empty we delete search from table filter
		if (!search.length) {
			/* eslint-disable-next-line   */
			const { search, ...rest } = tableFilter
			setTableFilter(rest)
		}
	}, [search])

	return (
		<Input.Search
			allowClear
			placeholder='Введите имя или телефон'
			value={search}
			style={{ width: '50%' }}
			onChange={e => setSearch(e.target.value)}
		/>
	)
}

export { ClientsSearch }
