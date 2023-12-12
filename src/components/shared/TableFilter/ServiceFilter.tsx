import { Button, Cascader } from 'antd'
import { useEffect, useState, FC } from 'react'
import { FilterDropdownPropsWithOptions } from './TableFilter.types'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { useActions, useSelectors } from 'src/hooks'

const ServiceFilter: FC<FilterDropdownPropsWithOptions> = props => {
	// destructurize props
	const { setSelectedKeys, confirm, clearFilters, data } = props
	// store actions and states
	const { tableFilter, cascaderOptions, cascaderSearch } = useSelectors()
	const { setTableFilter, addToCascaderOptions, setCascaderOptions } =
		useActions()
	// states
	const [activeFilters, setActiveFilters] = useState<CheckboxValueType[]>([])

	useEffect(() => {
		// here we set cascaderOptions from backend to our store
		data?.data.map(item => {
			addToCascaderOptions({
				label: item.category_name.ru,
				value: item.id,
				children: item.services.map(el => ({
					label: el.name.ru,
					value: el.id,
				})),
			})
		})
	}, [data])

	// ** search filter
	useEffect(() => {
		// when start search this logic will start work
		if (cascaderOptions) {
			setCascaderOptions(
				cascaderOptions.filter(el => {
					// if we searching category
					const isCategoryNameMatch = Object.values(el.label).some(val =>
						val.toLowerCase().includes(cascaderSearch.toLowerCase())
					)

					if (isCategoryNameMatch) {
						return true
					}

					// if we searching service
					const isServiceNameMatch = el.children
						?.map(item => item.label)
						.some(name =>
							Object.values(name).some(val =>
								val.toLowerCase().includes(cascaderSearch.toLowerCase())
							)
						)

					return isServiceNameMatch
				})
			)
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
	}, [cascaderSearch])

	useEffect(() => {
		// clear filters from store
		if (!activeFilters.length && clearFilters) {
			const { service_id, ...rest } = tableFilter
			clearFilters()
			setTableFilter(rest)
		}
	}, [activeFilters])

	return (
		<div className='p-2 w-fit h-[300px] flex flex-col'>
			<Cascader.Panel
				style={{ width: '100%' }}
				options={cascaderOptions}
				value={activeFilters as any}
				onChange={(values: any) => {
					setActiveFilters(values)
					values.map((item: number[]) => {
						if (item.length === 2) {
							setSelectedKeys([item[1]])
						} else if (item.length === 1) {
							setSelectedKeys(data?.data[item[0]]?.services.map(el => el.id)!)
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
