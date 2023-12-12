import { FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import { useActions } from 'src/hooks'

const ServiceSearch: FC = () => {
	// states
	const [searchValue, setSearchValue] = useState('')
	// store actions and states
	const { setCascaderSearch } = useActions()

	// ** search filter
	useEffect(() => {
		setCascaderSearch(searchValue)
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

export { ServiceSearch }
