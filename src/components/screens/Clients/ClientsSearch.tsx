import React from 'react'
import { Input } from 'antd'
import { SearchProps } from './Clients.types'

const ClientsSearch: React.FC<SearchProps> = ({ value, onChange }) => {
	return (
		<Input.Search
			placeholder='Введите имя или телефон'
			value={value}
			onChange={e => onChange(e.target.value)}
		/>
	)
}

export { ClientsSearch }
