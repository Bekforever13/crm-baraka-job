import { FilterValue } from 'antd/es/table/interface'
import { IRuKarUz } from '../shared/shared.types'
import { TFiltersState } from 'src/components/screens/Clients/ClientsTypes'

type TCallHistory = {
	id: number
	name: string
	service: IRuKarUz
}

export interface IClientInfo {
	id: number
	first_name: string
	last_name: string
	phone: string
	call_history: TCallHistory[]
	region: {
		id: number
		name: IRuKarUz
	}
	district: {
		id: number
		name: IRuKarUz
	}
}

export interface IClientDataResponse {
	data: IClientInfo
}

export interface IClientsParams {
	limit: number
	search?: string
	page?: number
	role_id?: any
	service_id?: FilterValue
	region_id?: FilterValue
	district_id?: FilterValue
}

export interface IInitialState {
	tableFilter: IClientsParams
	filters: TFiltersState
}
