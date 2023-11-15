import React from 'react'
import { Table, message } from 'antd'
import { INewUserType } from 'src/store/users/Users.types'
import { BsClockHistory } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { TableFilter } from 'src/components/shared'
import { ClientsTableProps, TFiltersState } from './Clients.types'
import {
	useGetDistrictsQuery,
	useGetRegionsQuery,
	useGetServicesQuery,
} from 'src/store/index.endpoints'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { TablePaginationConfig } from 'antd/lib'
import { useActions } from 'src/hooks/useActions'
import { useSelectors } from 'src/hooks/useSelectors'

const ClientsTable: React.FC<ClientsTableProps> = ({
	data,
	isLoading,
	currentPage,
	total,
	onChangePage,
	clientsError,
}) => {
	const { setLimit } = useActions()
	const { limit } = useSelectors()
	const [filters, setFilters] = React.useState<TFiltersState>({
		district: [],
		service: [],
		region: [],
	})
	const navigate = useNavigate()

	const { data: districtsData, isError: districtsError } =
		useGetDistrictsQuery(1)
	const { data: servicesData, isError: servicesError } = useGetServicesQuery(1)
	const { data: regionsData, isError: regionsError } = useGetRegionsQuery(1)

	const handleTableChange = (pagination: TablePaginationConfig) => {
		if (pagination.pageSize) {
			setLimit(pagination.pageSize)
		}
		onChangePage(1)
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
			sorter: (a, b) => {
				a.role === 'client' && b.role === 'worker' && -1
				a.role === 'worker' && b.role === 'client' && 1
				return 0
			},
			filters: [
				{ text: 'Рабочий', value: 'worker' },
				{ text: 'Клиент', value: 'client' },
			],
			onFilter: (value, rec) => rec.role === value,
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
					clearFilters={clearFilters}
					options={[
						{ label: 'Рабочий', value: 'worker' },
						{ label: 'Клиент', value: 'client' },
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
			onFilter: (value, rec) => rec?.service?.name.ru === value,

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
					clearFilters={clearFilters}
					options={
						servicesData?.data.map(item => {
							return { value: item.name.ru, label: item.name.ru }
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
			onFilter: (value, rec) => rec?.region?.name.ru === value,
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
					clearFilters={clearFilters}
					options={
						regionsData?.data.map(item => {
							return { value: item.name.ru, label: item.name.ru }
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
			onFilter: (value, rec) => rec.district?.name.ru === value,
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
					clearFilters={clearFilters}
					options={
						districtsData?.data.map(item => {
							return { value: item.name.ru, label: item.name.ru }
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

	React.useEffect(() => {
		if (clientsError || districtsError || servicesError || regionsError) {
			message.error('Произошла ошибка при загрузке данных')
		}
	}, [clientsError, districtsError, servicesError, regionsError])

	React.useEffect(() => {
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
			pagination={{
				total,
				current: currentPage,
				onChange: onChangePage,
				showSizeChanger: true,
				pageSize: limit,
			}}
			rowKey={e => e.id}
			onChange={handleTableChange}
			dataSource={data as INewUserType[]}
			columns={clientsColumns}
			scroll={{ x: true }}
			style={{ width: '100%' }}
		/>
	)
}

export { ClientsTable }
