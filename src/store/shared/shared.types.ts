export interface ISharedInitialState {
	showDrawer: boolean
}

export interface IRuKarUz {
	kar: string
	uz: string
	ru: string
}

export type TItemData = {
	id: number
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
