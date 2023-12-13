import { Button, Cascader } from 'antd'
import { useEffect, useState, FC } from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { useActions, useSelectors } from 'src/hooks'
import { Search } from '..'

const ServiceFilter: FC<FilterDropdownPropsWithOptions> = props => {
	// destructurize props
	const { setSelectedKeys, confirm, clearFilters, data } = props
	// store actions and states
	const { tableFilter, cascaderOptions, cascaderSearch } = useSelectors()
	const { setTableFilter, setCascaderOptions } = useActions()
	// states
	const [activeFilters, setActiveFilters] = useState<CheckboxValueType[]>([])

	// ** search filter
	useEffect(() => {
		// when start search this logic will start work
		if (cascaderOptions && cascaderSearch) {
			const find = cascaderOptions.filter(el =>
				el.children
					?.map(item => item.label)
					.some(name =>
						name.toLowerCase().includes(cascaderSearch.toLowerCase())
					)
			)
			setCascaderOptions(find)
		}
		// if search value empty data will be restored from { data }
		if (!cascaderSearch.length && data) {
			setCascaderOptions(
				data?.data.map(item => ({
					label: item.category_name.ru,
					value: item.id,
					children: item.services.map(el => ({
						label: el.name.ru,
						value: el.id,
					})),
				}))
			)
		}
	}, [cascaderSearch, data])

	useEffect(() => {
		// clear filters from store
		if (!activeFilters.length && clearFilters) {
			/* eslint-disable-next-line   */
			const { service_id, ...rest } = tableFilter
			clearFilters()
			setTableFilter(rest)
		}
	}, [activeFilters])

	return (
		<div className='p-2 w-fit h-[300px] flex flex-col'>
			<Search category='service' />
			<Cascader.Panel
				style={{ width: '100%' }}
				options={cascaderOptions}
				/* eslint-disable-next-line   */
				value={activeFilters as any}
				onChange={(values: CheckboxValueType[]) => {
					setActiveFilters(values)
					values.forEach((item: CheckboxValueType) => {
						console.log('item', item)
						if (Array.isArray(item) && item.length === 2) {
							setSelectedKeys([item[1]])
						} else if (Array.isArray(item) && item.length === 1) {
							setSelectedKeys(
								data?.data[item[0]]?.services.map(el => el.id) || []
							)
						}
					})
				}}
				multiple
			/>
			<div className='flex justify-between mt-2 bg-white'>
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

export { ServiceFilter }
