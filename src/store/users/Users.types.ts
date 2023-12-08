import { IRuKarUz } from '../shared/shared.types'

export type TUserRole = {
	userId: number
	roleId: string
}

export type TService = {
	id: number
	name: IRuKarUz
}

export type TNewAdminTypes = {
	first_name: string
	last_name: string
	phone: string
	password: string
}

export interface IAdminTypes {
	id: number
	name: string
	phone: string
	role: string
}

export interface IUser {
	id: number
	name: string
	phone: string
	language: string
	role: string
	district: string
	region?: string
	service?: string
}

export interface INewUserType {
	id: number
	name: string
	phone: string
	language: string
	role: string
	role_id?: number
	district?: {
		id: number
		name: IRuKarUz
	}
	region?: {
		id: number
		name: IRuKarUz
	}
	service?: {
		id: number
		name: IRuKarUz
	}
}

export interface IClientTable {
	id: number
	name: string
	phone: string
	language: string
	role: string
	role_id?: number
	district?: {
		id: number
		name: IRuKarUz
	}
	region?: {
		id: number
		name: IRuKarUz
	}
	service?: string
	service_id?: boolean | React.Key
}

export interface IDataResponseClient {
	data: IClientTable[]
	links: {
		first: string
		last: string
		next: string
	}
	meta: {
		current_page: number
		from: number
		last_page: number
		links: { active: boolean; label: string; url: string | null }[]
		path: string
		per_page: number
		to: number
		total: number
	}
}

export interface IUserDataResponse {
	data: IAdminTypes[]
	links: {
		first: string
		last: string
		next: string
	}
	meta: {
		current_page: number
		from: number
		last_page: number
		links: { active: boolean; label: string; url: string | null }[]
		path: string
		per_page: number
		to: number
		total: number
	}
}
