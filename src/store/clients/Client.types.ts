import { FilterValue } from 'antd/es/table/interface'
import { IRuKarUz } from '../shared/shared.types'

type TCallHistory = {
	id: number
	name: string
	service: IRuKarUz
}

export interface IClientInfo {
	id: number
	name: string
	phone: string
	call_history: TCallHistory[]
	region: IRuKarUz
	district: IRuKarUz
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
}
