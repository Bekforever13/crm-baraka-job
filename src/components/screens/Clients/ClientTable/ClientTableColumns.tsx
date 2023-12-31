import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	DistrictFilter,
	RegionFilter,
	RoleFilter,
	ServiceFilter,
} from 'src/components/shared'
import { FilterDropdownProps } from 'antd/es/table/interface'
import type { ColumnsType } from 'antd/es/table'
import { BsClockHistory } from 'react-icons/bs'
import { useActions, useClientData, useSelectors } from 'src/hooks'
import { IClientTable } from 'src/store/users/Users.types'
import { Popconfirm, message } from 'antd'
import { useDeleteUserMutation } from 'src/store/index.endpoints'
import { BiSolidTrash } from 'react-icons/bi'

// this columns component for main table in /clients
const ClientTableColumns: () => ColumnsType<IClientTable> = () => {
	// hooks
	const navigate = useNavigate()
	// store actions and states
	const { setTableFilter } = useActions()
	const { tableFilter, filters } = useSelectors()
	// rtk hook
	const [deleteUser, { isSuccess }] = useDeleteUserMutation()
	// custom hook
	const { categoriesData, regionsData, districtsData } = useClientData()

	// here you can change value of service filter
	const serviceOptions = useMemo(() => {
		return (
			categoriesData?.data.map(item => ({
				value: String(item.id),
				label: item.category_name.ru,
			})) ?? []
		)
	}, [categoriesData])

	const clientsColumns: ColumnsType<IClientTable> = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
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
				// this is the custom component
				<RoleFilter
					setSelectedKeys={selectedKeys => setSelectedKeys(selectedKeys)}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={() => {
						/* eslint-disable-next-line   */
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
			filters: filters.categories,
			render: (_, rec) => rec.service,
			onFilter: (values, rec) => Number(rec?.service_id) === Number(values),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				clearFilters,
				confirm,
			}: FilterDropdownProps) => (
				// this is the custom component
				<ServiceFilter
					setSelectedKeys={setSelectedKeys}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={clearFilters}
					options={serviceOptions}
					data={categoriesData}
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
				// this is the custom component
				<RegionFilter
					setSelectedKeys={setSelectedKeys}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={() => {
						/* eslint-disable-next-line   */
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
				// this is the custom component
				<DistrictFilter
					setSelectedKeys={setSelectedKeys}
					selectedKeys={selectedKeys}
					confirm={confirm}
					clearFilters={() => {
						/* eslint-disable-next-line   */
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
					<div className='flex items-center gap-x-5'>
						<BsClockHistory
							onClick={() => navigate(`/client/${rec.id}`)}
							className='cursor-pointer'
							color='gray'
							size='22'
						/>
						<Popconfirm
							title='Удалить пользователя?'
							cancelText='Отмена'
							onConfirm={() => deleteUser(rec.id)}
							okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
						>
							<BiSolidTrash className='cursor-pointer' size='22' color='red' />
						</Popconfirm>
					</div>
				)
			},
		},
	]

	useEffect(() => {
		if (isSuccess) {
			message.success('Пользователь успешно удалён.')
		}
	}, [isSuccess])

	return clientsColumns
}

export { ClientTableColumns }
