import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	DistrictFilter,
	ServiceFilter,
	TableFilter,
} from 'src/components/shared'
import { FilterDropdownProps } from 'antd/es/table/interface'
import type { ColumnsType } from 'antd/es/table'
import { BsClockHistory } from 'react-icons/bs'
import { useActions, useClientData, useSelectors } from 'src/hooks'
import { IClientTable } from 'src/store/users/Users.types'

const ClientTableColumns: () => ColumnsType<IClientTable> = () => {
	const { servicesData, regionsData, districtsData } = useClientData()
	const navigate = useNavigate()
	const { setTableFilter } = useActions()
	const { tableFilter, filters } = useSelectors()

	// here you can change value of service filter
	const serviceOptions = useMemo(() => {
		return (
			servicesData?.data.map(item => ({
				value: String(item.id),
				label: item.name.ru,
			})) ?? []
		)
	}, [servicesData])

	const clientsColumns: ColumnsType<IClientTable> = [
		{
			title: 'Имя',
			dataIndex: 'first_name',
			key: 'first_name',
		},
		{
			title: 'Фамилия',
			dataIndex: 'last_name',
			key: 'last_name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Язык',
			dataIndex: 'language',
			key: 'language',
		},
		{
			title: 'Роль',
			dataIndex: 'role',
			key: 'role',
			render: (role: string) => (role === 'worker' ? 'Рабочий' : 'Клиент'),
			filters: [
				{ text: 'Рабочий', value: 3 },
				{ text: 'Клиент', value: 4 },
			],
			onFilter: (value, rec) => rec.role_id === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				clearFilters,
				confirm,
			}: FilterDropdownProps) => (
				// TableFilter is the custom component you can change it
				<TableFilter
					setSelectedKeys={selectedKeys => {
						if (selectedKeys.length > 0) {
							setSelectedKeys([selectedKeys[selectedKeys.length - 1]])
						} else {
							setSelectedKeys(selectedKeys)
						}
					}}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={() => {
						const { role_id, ...rest } = tableFilter
						clearFilters && clearFilters()
						setTableFilter(rest)
					}}
					options={[
						{ label: 'Рабочий', value: String(3) },
						{ label: 'Клиент', value: String(4) },
					]}
				/>
			),
		},
		{
			title: 'Сервис',
			dataIndex: 'service',
			key: 'service',
			filters: filters.service,
			render: (_, rec) => rec.service,
			onFilter: (values, rec) => Number(rec?.service_id) === Number(values),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				clearFilters,
				confirm,
			}: FilterDropdownProps) => (
				<ServiceFilter
					setSelectedKeys={setSelectedKeys}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={clearFilters}
					options={serviceOptions}
				/>
			),
		},
		{
			title: 'Регион',
			dataIndex: 'region',
			key: 'region',
			filters: filters.region,
			render: (_, rec) => rec.region?.name.ru,
			onFilter: (value, rec) => rec?.region?.id.toString() === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				clearFilters,
				confirm,
			}: FilterDropdownProps) => (
				<TableFilter
					setSelectedKeys={setSelectedKeys}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={() => {
						const { region_id, ...rest } = tableFilter
						clearFilters && clearFilters()
						setTableFilter(rest)
					}}
					options={
						regionsData?.data.map(item => {
							return { value: String(item.id), label: item.name.ru }
						}) ?? []
					}
				/>
			),
		},
		{
			title: 'Округ',
			dataIndex: 'district',
			key: 'district',
			render: (_, rec) => rec.district?.name.ru,
			filters: filters.district,
			onFilter: (value, rec) => rec.district?.id.toString() === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				clearFilters,
				confirm,
			}: FilterDropdownProps) => (
				<DistrictFilter
					setSelectedKeys={setSelectedKeys}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={() => {
						const { district_id, ...rest } = tableFilter
						clearFilters && clearFilters()
						setTableFilter(rest)
					}}
					options={
						districtsData?.data.map(item => {
							return { value: String(item.id), label: item.name.ru }
						}) ?? []
					}
				/>
			),
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, rec) => {
				return (
					<BsClockHistory
						onClick={() => navigate(`/client/${rec.id}`)}
						className='cursor-pointer'
						color='gray'
						size='22'
					/>
				)
			},
		},
	]

	return clientsColumns
}

export { ClientTableColumns }
