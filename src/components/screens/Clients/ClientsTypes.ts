import { INewUserType } from 'src/store/users/Users.types'

type TFilter = {
	text: string
	value: string
}

export interface ClientsTableProps {
	data: INewUserType[] | undefined
	isLoading: boolean
	total: number | undefined
	clientsError: boolean
}

export type TFiltersState = {
	district: TFilter[]
	service: TFilter[]
	region: TFilter[]
}
