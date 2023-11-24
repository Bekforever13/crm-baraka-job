import React from 'react'
import { Input } from 'antd'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks/useSelectors'
import { useDebounce } from 'src/hooks/useDebounce'

const ClientsSearch: React.FC = () => {
	const [search, setSearch] = React.useState('')
	const debouncedSearch = useDebounce<string>(search, 300)
	const { tableFilter } = useSelectors()
	const { setTableFilter } = useActions()

	React.useEffect(() => {
		setTableFilter({ ...tableFilter, search: debouncedSearch })
	}, [debouncedSearch])

	React.useEffect(() => {
		if (!search.length) {
			const { search, ...rest } = tableFilter
			setTableFilter(rest)
		}
	}, [search])

	return (
		<Input.Search
			placeholder='Введите имя или телефон'
			value={search}
			style={{ width: '50%' }}
			onChange={e => setSearch(e.target.value)}
		/>
	)
}

export { ClientsSearch }
