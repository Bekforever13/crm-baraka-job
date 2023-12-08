import { IRuKarUz } from '../shared/shared.types'

export type TCategoriesInitState = {
	categoriesData: TAddCategoriesData[]
}

export type TServiceData = {
	id: number
	name: IRuKarUz
}

export type TAddCategoriesData = {
	id: number
	category_name: IRuKarUz
	services: TServiceData[]
}

export interface ICategoriesDataResponse {
	data: TAddCategoriesData[]
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
