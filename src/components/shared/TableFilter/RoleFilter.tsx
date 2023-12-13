import { Button, Radio } from 'antd'
import { useState, useEffect, FC } from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { useActions, useSelectors } from 'src/hooks'

const RoleFilter: FC<FilterDropdownPropsWithOptions> = props => {
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
			const { role_id, region_id, ...rest } = tableFilter
			clearFilters()
			setTableFilter(rest)
		}
	}, [activeFilters])
	return (
		<div className='p-2 max-h-[400px] flex flex-col'>
			<div className='h-[100%] w-fit overflow-y-auto'>
				<Radio.Group
					options={options}
					value={selectedKeys[0]}
					onChange={e => {
						setActiveFilters([e.target.value])
						setSelectedKeys([e.target.value])
					}}
					className='flex flex-col gap-y-2'
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

export { RoleFilter }
