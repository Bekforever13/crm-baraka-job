import React from 'react'
import { Select, SelectProps } from 'antd'

const UiSelect: React.FC<SelectProps> = props => {
	return <Select {...props} style={{ width: '100%' }} />
}

export { UiSelect }
