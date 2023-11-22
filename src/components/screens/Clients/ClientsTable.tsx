import { useState, useEffect, FC } from 'react'
import { Table, message } from 'antd'
import { INewUserType } from 'src/store/users/Users.types'
import { BsClockHistory } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { TableFilter } from 'src/components/shared'
import { ClientsTableProps, TFiltersState } from './ClientsTypes'
import {
	useGetDistrictsQuery,
	useGetRegionsQuery,
	useGetServicesQuery,
} from 'src/store/index.endpoints'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { TableProps } from 'antd/lib'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks/useSelectors'

const ClientsTable: FC<ClientsTableProps> = ({
	data,
	isLoading,
	total,
	clientsError,
}) => {
	const { setTableFilter, setLimit, setPage } = useActions()
	const { tableFilter } = useSelectors()
	const [filters, setFilters] = useState<TFiltersState>({
		district: [],
		service: [],
		region: [],
	})
	const navigate = useNavigate()

	const { data: districtsData, isError: districtsError } = useGetDistrictsQuery(
		{ page: 1, search: '' }
	)
	const { data: servicesData, isError: servicesError } = useGetServicesQuery({
		page: 1,
		search: '',
	})
	const { data: regionsData, isError: regionsError } = useGetRegionsQuery({
		page: 1,
		search: '',
	})

	const onChange: TableProps<INewUserType>['onChange'] = (
		pagination,
		{ service, role, region, district }
	) => {
		if (
			pagination.pageSize ||
			service?.length ||
			region?.length ||
			district?.length ||
			role?.length
		) {
			setTableFilter({
				...tableFilter,
				...(service?.length && { service_id: service }),
				...{ page: pagination.current },
				...(region?.length && { region_id: region }),
				...(district?.length && { district_id: district }),
				...(role?.length && { role_id: role[role.length - 1] }),
				...(pagination.pageSize && { limit: pagination.pageSize }),
			})
		}
	}

	const clientsColumns: ColumnsType<INewUserType> = [
		{
			title: 'Имя',
			dataIndex: 'full_name',
			key: 'full_name',
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
			render: (_, rec) => rec.service?.name.ru,
			onFilter: (value, rec) => rec?.service?.id.toString() === value,
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
						const { service_id, ...rest } = tableFilter
						clearFilters && clearFilters()
						setTableFilter(rest)
					}}
					options={
						servicesData?.data.map(item => {
							return { value: String(item.id), label: item.name.ru }
						}) ?? []
					}
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
				<TableFilter
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

	useEffect(() => {
		if (clientsError || districtsError || servicesError || regionsError) {
			message.error('Произошла ошибка при загрузке данных')
		}
	}, [clientsError, districtsError, servicesError, regionsError])

	useEffect(() => {
		if (regionsData && servicesData && districtsData) {
			setFilters(prev => ({
				...prev,
				region: regionsData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
				service: servicesData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
				district: districtsData.data.map(item => ({
					text: item.name.ru,
					value: item.name.ru,
				})),
			}))
		}
	}, [districtsData, servicesData, regionsData])

	return (
		<Table
			loading={isLoading}
			id='clientsTable'
			rowKey={e => e.id}
			pagination={{
				total,
				showSizeChanger: true,
				current: tableFilter.page,
				pageSize: tableFilter.limit,
				onChange: (page, pageSize) => {
					setPage(page)
					setLimit(pageSize)
				},
			}}
			onChange={onChange}
			dataSource={data as INewUserType[]}
			columns={clientsColumns}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { ClientsTable }
