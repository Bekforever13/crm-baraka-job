import { IRuKarUz } from '../shared/shared.types'

export type TUserRole = {
	userId: number
	roleId: string
}

export interface IUser {
	id: number
	first_name: string
	last_name: string
	phone: string
	language: string
	role: string
	district: IRuKarUz
}

export interface IUserDataResponse {
	data: IUser[]
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
