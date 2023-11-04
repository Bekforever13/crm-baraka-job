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
}

export interface IClientDataResponse {
	data: IClientInfo
}

export interface IClientsParams {
	id?: string | void
	search?: string | void
	page?: number | void
}
