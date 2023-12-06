import { Button, Checkbox } from 'antd'
<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { useActions, useSelectors } from 'src/hooks'
=======
import React from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378

const TableFilter: React.FC<FilterDropdownPropsWithOptions> = props => {
	const { setSelectedKeys, selectedKeys, confirm, clearFilters, options } =
		props
<<<<<<< HEAD
	const { tableFilter } = useSelectors()
	const { setTableFilter } = useActions()
	const [activeFilters, setActiveFilters] = useState<CheckboxValueType[]>([])

	useEffect(() => {
		if (!activeFilters.length && clearFilters) {
			const { role_id, region_id, ...rest } = tableFilter
			clearFilters()
			setTableFilter(rest)
		}
	}, [activeFilters])
=======
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378
	return (
		<div className='p-2 w-[350px] max-h-[400px] flex flex-col'>
			<div className='h-[100%] overflow-y-auto'>
				<Checkbox.Group
					options={options}
					value={selectedKeys as CheckboxValueType[]}
<<<<<<< HEAD
					onChange={values => {
						setActiveFilters(values)
						setSelectedKeys(values as React.Key[])
					}}
=======
					onChange={values => setSelectedKeys(values as React.Key[])}
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378
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
<<<<<<< HEAD
					onClick={() => setActiveFilters([])}
=======
					onClick={() => clearFilters && clearFilters()}
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378
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
