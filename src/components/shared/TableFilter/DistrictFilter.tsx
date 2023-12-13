import { Button, Checkbox } from 'antd'
import { useState, useEffect, FC, Key } from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Search } from 'src/components/shared'
import { useActions, useSelectors } from 'src/hooks'

const DistrictFilter: FC<FilterDropdownPropsWithOptions> = props => {
	// destructurize props
	const { setSelectedKeys, selectedKeys, confirm, clearFilters, options } =
		props
	// store actions and states
	const { tableFilter } = useSelectors()
	const { setTableFilter } = useActions()
	// states
	const [activeFilters, setActiveFilters] = useState<CheckboxValueType[]>([])

	useEffect(() => {
		// clear filters from store
		if (!activeFilters.length && clearFilters) {
			/* eslint-disable-next-line   */
			const { district_id, ...rest } = tableFilter
			clearFilters()
			setTableFilter(rest)
		}
	}, [activeFilters])

	return (
		<div className='p-2 w-[350px] h-[400px] flex flex-col'>
			<Search category='district' />
			<div className='h-[100%] overflow-y-auto'>
				<Checkbox.Group
					options={options}
					value={selectedKeys as CheckboxValueType[]}
					onChange={values => {
						setActiveFilters(values)
						setSelectedKeys(values as Key[])
					}}
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
					onClick={() => setActiveFilters([])}
					size='small'
					style={{ width: 90 }}
				>
					Сброс
				</Button>
			</div>
		</div>
	)
}

export { DistrictFilter }
