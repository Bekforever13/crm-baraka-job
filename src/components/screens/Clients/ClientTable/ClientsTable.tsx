import { useEffect, FC } from 'react'
import { Table, message } from 'antd'
import { TableProps } from 'antd/lib'
import { ClientsTableProps } from '../ClientsTypes'
import { IClientTable } from 'src/store/users/Users.types'
import { useActions, useClientData, useSelectors } from 'src/hooks'
import { ClientTableColumns } from './ClientTableColumns'

// this is main table for /clients
const ClientsTable: FC<ClientsTableProps> = ({
	data,
	isLoading,
	total,
	clientsError,
}) => {
	// custom hook
	const { categoriesError, regionsError, districtsError } = useClientData()
	// store hooks
	const { setTableFilter, setLimit, setPage } = useActions()
	const { tableFilter } = useSelectors()

	// here's the logic for OnChange when filter is activated or changed page size etc...
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

	// show error if something data's not fetched from our custom hook
	useEffect(() => {
		if (clientsError || districtsError || categoriesError || regionsError) {
			message.error('Произошла ошибка при загрузке данных')
		}
	}, [clientsError, districtsError, categoriesError, regionsError])

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
			dataSource={data}
			columns={ClientTableColumns()}
			scroll={{ x: true }}
			style={{ width: '100%' }}
			locale={{ emptyText: 'Нет данных' }}
		/>
	)
}

export { ClientsTable }
