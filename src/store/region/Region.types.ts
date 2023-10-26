import { IRuKarUz } from '../shared/shared.types'

export type TRegion = {
	id: number
	name: IRuKarUz
}

export type TAddNewRegion = {
	name: IRuKarUz
}

export interface IRegionDataResponse {
	data: TRegion[]
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
