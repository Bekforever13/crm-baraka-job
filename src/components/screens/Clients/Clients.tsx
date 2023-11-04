import React from 'react'
import { Table, Button, Input, Checkbox } from 'antd'
import {
	useGetClientsQuery,
	useGetDistrictsQuery,
	useGetGroupsQuery,
	useGetRegionsQuery,
} from 'src/store/index.endpoints'
import { BsClockHistory } from 'react-icons/bs'
import { IUser } from 'src/store/users/Users.types'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'src/hooks/useDebounce'
import { exportToExcel } from 'src/utils/Download'

type TFilter = {
	text: string
	value: string
}

const Clients: React.FC = () => {
	const [search, setSearch] = React.useState('')
	const debouncedSearch = useDebounce<string>(search, 300)
	const [currentPage, setCurrentPage] = React.useState(1)
	const [districtFilter, setDistrictFilters] = React.useState<TFilter[]>([])
	const [regionFilter, setRegionFilters] = React.useState<TFilter[]>([])
	const [groupFilter, setGroupFilters] = React.useState<TFilter[]>([])
	const { data, isLoading } = useGetClientsQuery({
		search: debouncedSearch,
		page: currentPage,
	})
	const { data: dDistricts } = useGetDistrictsQuery(1)
	const { data: dGroups } = useGetGroupsQuery(1)
	const { data: dRegions } = useGetRegionsQuery(1)
	const total = data?.meta.total

	const navigate = useNavigate()

	const clientsColumns = [
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
			render: (role: string) => <>{role === 'worker' ? 'Рабочий' : 'Клиент'}</>,
			sorter: (a: any, b: any) => {
				if (a.role === 'client' && b.role === 'worker') {
					return -1
				} else if (a.role === 'worker' && b.role === 'client') {
					return 1
				} else {
					return 0
				}
			},
			filters: [
				{ text: 'Рабочий', value: 'worker' },
				{ text: 'Клиент', value: 'client' },
			],
			onFilter: (value: any, rec: IUser) => rec.role === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<div className='p-2'>
					<Checkbox.Group
						options={[
							{ label: 'Рабочий', value: 'worker' },
							{ label: 'Клиент', value: 'client' },
						]}
						value={selectedKeys}
						onChange={values => setSelectedKeys(values)}
						className='flex flex-col gap-y-2'
					/>
					<div className='flex justify-between mt-2 gap-x-3'>
						<Button
							type='primary'
							onClick={() => confirm()}
							size='small'
							style={{ width: 90, backgroundColor: 'green' }}
						>
							ОК
						</Button>
						<Button
							onClick={() => clearFilters()}
							size='small'
							style={{ width: 90 }}
						>
							Сброс
						</Button>
					</div>
				</div>
			),
		},
		{
			title: 'Сервис',
			dataIndex: 'service',
			key: 'service',
			filters: groupFilter,
			onFilter: (value: any, rec: IUser) => rec?.service === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<div className='p-2'>
					<div>
						<Checkbox.Group
							options={dGroups?.data.map(item => {
								return { value: item.name.ru, label: item.name.ru }
							})}
							value={selectedKeys}
							onChange={values => setSelectedKeys(values)}
							className='flex flex-col gap-y-2'
						/>
					</div>
					<div className='flex justify-between mt-2 gap-x-3'>
						<Button
							type='primary'
							onClick={() => confirm()}
							size='small'
							style={{ width: 90, backgroundColor: 'green' }}
						>
							ОК
						</Button>
						<Button
							onClick={() => clearFilters()}
							size='small'
							style={{ width: 90 }}
						>
							Сброс
						</Button>
					</div>
				</div>
			),
		},
		{
			title: 'Регион',
			dataIndex: 'region',
			key: 'region',
			filters: regionFilter,
			onFilter: (value: any, rec: IUser) => rec?.region === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<div className='p-2'>
					<div>
						<Checkbox.Group
							options={dRegions?.data.map(item => {
								return { value: item.name.ru, label: item.name.ru }
							})}
							value={selectedKeys}
							onChange={values => setSelectedKeys(values)}
							className='flex flex-col gap-y-2'
						/>
					</div>
					<div className='flex justify-between mt-2 gap-x-3'>
						<Button
							type='primary'
							onClick={() => confirm()}
							size='small'
							style={{ width: 90, backgroundColor: 'green' }}
						>
							ОК
						</Button>
						<Button
							onClick={() => clearFilters()}
							size='small'
							style={{ width: 90 }}
						>
							Сброс
						</Button>
					</div>
				</div>
			),
		},
		{
			title: 'Округ',
			dataIndex: 'district',
			key: 'district',
			filters: districtFilter,
			onFilter: (value: any, rec: IUser) => rec?.district === value,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}: any) => (
				<div className='p-2'>
					<div>
						<Checkbox.Group
							options={dDistricts?.data.map(item => {
								return { value: item.name.ru, label: item.name.ru }
							})}
							value={selectedKeys}
							onChange={values => setSelectedKeys(values)}
							className='flex flex-col gap-y-2'
						/>
					</div>
					<div className='flex justify-between mt-2 gap-x-3'>
						<Button
							type='primary'
							onClick={() => confirm()}
							size='small'
							style={{ width: 90, backgroundColor: 'green' }}
						>
							ОК
						</Button>
						<Button
							onClick={() => clearFilters()}
							size='small'
							style={{ width: 90 }}
						>
							Сброс
						</Button>
					</div>
				</div>
			),
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_: unknown, rec: IUser) => {
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
		if (dRegions && dGroups && dDistricts) {
			dRegions.data.map(item => {
				setRegionFilters(prev => [
					...prev,
					{ text: item.name.ru, value: item.name.ru },
				])
			})
			dGroups.data.map(item => {
				setGroupFilters(prev => [
					...prev,
					{ text: item.name.ru, value: item.name.ru },
				])
			})
			dDistricts.data.map(item => {
				setDistrictFilters(prev => [
					...prev,
					{ text: item.name.ru, value: item.name.ru },
				])
			})
		}
	}, [dDistricts, dGroups, dRegions])

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<Input.Search
					placeholder='Введите имя или телефон'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<div className='flex items-center gap-x-5'>
					<Button onClick={() => exportToExcel(data?.data ?? [])}>
						Скачать
					</Button>
				</div>
			</div>
			<Table
				loading={isLoading}
				pagination={{
					total: total,
					current: currentPage,
					onChange: page => setCurrentPage(page),
				}}
				rowKey={e => e.id}
				dataSource={data?.data}
				columns={clientsColumns}
			/>
		</div>
	)
}

export { Clients }
