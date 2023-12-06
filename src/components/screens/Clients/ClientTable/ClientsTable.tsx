import { useEffect, FC } from 'react'
import { Table, message } from 'antd'
import { TableProps } from 'antd/lib'
import { ClientsTableProps } from '../ClientsTypes'
import { IClientTable } from 'src/store/users/Users.types'
import { useActions, useClientData, useSelectors } from 'src/hooks'
import ClientTableColumns from './ClientTableColumns'

const ClientsTable: FC<ClientsTableProps> = ({
	data,
	isLoading,
	total,
	clientsError,
}) => {
	const { servicesError, regionsError, districtsError } = useClientData()
	const { setTableFilter, setLimit, setPage } = useActions()
	const { tableFilter } = useSelectors()

<<<<<<< HEAD
	// here's the logic for OnChange when filter is activated or changed page size etc...
=======
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378
	const onChange: TableProps<IClientTable>['onChange'] = (
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

<<<<<<< HEAD
	// show error if something wrong
=======
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378
	useEffect(() => {
		if (clientsError || districtsError || servicesError || regionsError) {
			message.error('Произошла ошибка при загрузке данных')
		}
	}, [clientsError, districtsError, servicesError, regionsError])

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
<<<<<<< HEAD
			dataSource={data}
=======
			dataSource={data as IClientTable[]}
>>>>>>> 8db7b71ebb59d3a2c05d977e9fbf5f0a85f3a378
			columns={ClientTableColumns()}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { ClientsTable }
