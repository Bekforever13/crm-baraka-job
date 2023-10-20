import React from 'react'
import { Select } from 'antd'

const handleChange = (value: string) => {
	console.log(`selected ${value}`)
}

const UiSelect: React.FC = () => (
	<Select
		defaultValue='lucy'
		style={{ width: '100%' }}
		onChange={handleChange}
		options={[
			{ value: 'jack', label: 'Jack' },
			{ value: 'lucy', label: 'Lucy' },
			{ value: 'Yiminghe', label: 'yiminghe' },
			{ value: 'disabled', label: 'Disabled', disabled: true },
		]}
	/>
)

export { UiSelect }
