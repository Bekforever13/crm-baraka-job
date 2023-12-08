import { IClientTable } from 'src/store/users/Users.types'

type TFilter = {
	text: string
	value: string
}

export interface ClientsTableProps {
	data: IClientTable[] | undefined
	isLoading: boolean
	total: number | undefined
	clientsError: boolean
}

export type TFiltersState = {
	district: TFilter[]
	categories: TFilter[]
	region: TFilter[]
}
