import { IRuKarUz } from "../shared/shared.types"

export type TServiceData = {
	id: number
	name: string
}

export type TAddServiceData = {
	id: number
	name: IRuKarUz
}

export interface IServiceDataResponse {
	data: TAddServiceData[]
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
