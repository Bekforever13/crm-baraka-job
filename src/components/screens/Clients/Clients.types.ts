import { IUser } from 'src/store/users/Users.types'

type TFilter = {
	text: string
	value: string
}

export interface SearchProps {
	value: string
	onChange: (value: string) => void
}

export interface ClientsTableProps {
	data: IUser[] | undefined
	isLoading: boolean
	currentPage: number
	total: number | undefined
	onChangePage: (page: number) => void
	clientsError: boolean
}

export type TFiltersState = {
	district: TFilter[]
	service: TFilter[]
	region: TFilter[]
}