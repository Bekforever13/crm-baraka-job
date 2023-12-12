import { FilterValue } from 'antd/es/table/interface'
import { IRuKarUz } from '../shared/shared.types'
import { TFiltersState } from 'src/components/screens/Clients/ClientsTypes'


export interface Option {
	value: string | number
	label: string
	children?: Option[]
	disableCheckbox?: boolean
}

export type TCallHistory = {
	id: number
	first_name: string
	last_name: string
	date: string
	phone: string
	service: IRuKarUz
}

export interface IClientInfo {
	id: number
	name: string
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
	cascaderOptions: Option[]
	cascaderSearch: string
}
