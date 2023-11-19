import React from 'react'
import { Button } from 'antd'
import { useGetClientsQuery } from 'src/store/index.endpoints'
import { exportToExcel } from 'src/utils/Export'
import { ClientsTable } from './ClientsTable'
import { ClientsSearch } from './ClientsSearch'
import { useSelectors } from 'src/hooks/useSelectors'

const Clients: React.FC = () => {
	const { tableFilter } = useSelectors()
	const {
		data,
		isLoading,
		isError: clientsError,
	} = useGetClientsQuery(tableFilter)

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<ClientsSearch />
				<div className='flex items-center gap-x-5'>
					<Button onClick={() => exportToExcel(data?.data ?? [])}>
						Скачать
					</Button>
				</div>
			</div>
			<ClientsTable
				data={data?.data}
				isLoading={isLoading}
				total={data?.meta.total}
				clientsError={clientsError}
			/>
		</div>
	)
}

export { Clients }
