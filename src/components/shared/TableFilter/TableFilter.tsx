import { Button, Checkbox } from 'antd'
import React from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

const TableFilter: React.FC<FilterDropdownPropsWithOptions> = props => {
	const { setSelectedKeys, selectedKeys, confirm, clearFilters, options } =
		props
	return (
		<div className='p-2 w-[350px] h-[400px] flex flex-col'>
			<div className='h-[100%] overflow-y-auto'>
				<Checkbox.Group
					options={options}
					value={selectedKeys as CheckboxValueType[]}
					onChange={values => setSelectedKeys(values as React.Key[])}
					className='flex flex-col gap-y-2 w-full'
				/>
			</div>
			<div className='flex justify-between mt-2 gap-x-3 bg-white'>
				<Button
					type='primary'
					onClick={() => confirm()}
					size='small'
					style={{ width: 90, backgroundColor: 'green' }}
				>
					ОК
				</Button>
				<Button
					onClick={() => clearFilters && clearFilters()}
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
