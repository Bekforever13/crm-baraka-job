export interface ISharedInitialState {
	showDrawer: boolean
	filter: {
		group: string[]
		region: string
		district: string
	}
}

export interface IRuKarUz {
	kar: string
	uz: string
	ru: string
	en: string
}

export type TItemData = {
	id: number
	name: IRuKarUz
	region_id?: number
}

export type TDistrictData = {
	region_id: number
	name: IRuKarUz
}

export type TAddNewItem = {
	name: IRuKarUz
}

export interface IItemDataResponse {
	data: TItemData[]
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
