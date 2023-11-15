import React from 'react'
import { Button } from 'antd'
import { useGetClientsQuery } from 'src/store/index.endpoints'
import { useDebounce } from 'src/hooks/useDebounce'
import { exportToExcel } from 'src/utils/Download'
import { ClientsTable } from './ClientsTable'
import { ClientsSearch } from './ClientsSearch'
import { useSelectors } from 'src/hooks/useSelectors'

const Clients: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const [search, setSearch] = React.useState('')
	const debouncedSearch = useDebounce<string>(search, 300)
	const { limit } = useSelectors()
	const {
		data,
		isLoading,
		isError: clientsError,
	} = useGetClientsQuery({
		search: debouncedSearch,
		limit: limit,
		page: currentPage,
	})

	const handleSearchChange = (value: string) => {
		setSearch(value)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div className='flex flex-col gap-y-5 bg-white m-5 p-5 rounded-2xl'>
			<div className='flex items-center justify-between gap-20'>
				<ClientsSearch value={search} onChange={handleSearchChange} />
				<div className='flex items-center gap-x-5'>
					<Button onClick={() => exportToExcel(data?.data ?? [])}>
						Скачать
					</Button>
				</div>
			</div>
			<ClientsTable
				data={data?.data}
				isLoading={isLoading}
				currentPage={currentPage}
				total={data?.meta.total}
				onChangePage={handlePageChange}
				clientsError={clientsError}
			/>
		</div>
	)
}

export { Clients }
