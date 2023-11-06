import { Button, Checkbox } from 'antd'
import React from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'

const TableFilter: React.FC<FilterDropdownPropsWithOptions> = props => {
	const { setSelectedKeys, selectedKeys, confirm, clearFilters, options } =
		props
	return (
		<div className='p-2'>
			<div>
				<Checkbox.Group
					options={options}
					value={selectedKeys}
					onChange={values => setSelectedKeys(values)}
					className='flex flex-col gap-y-2'
				/>
			</div>
			<div className='flex justify-between mt-2 gap-x-3'>
				<Button
					type='primary'
					onClick={() => confirm()}
					size='small'
					style={{ width: 90, backgroundColor: 'green' }}
				>
					ОК
				</Button>
				<Button
					onClick={() => clearFilters()}
					size='small'
					style={{ width: 90 }}
				>
					Сброс
				</Button>
			</div>
		</div>
	)
}

export { TableFilter }
